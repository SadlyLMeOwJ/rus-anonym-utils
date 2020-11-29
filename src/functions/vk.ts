import { VK } from "vk-io";
import { regular } from "../main";
import axios from "axios";

/**
 * Секция для работы с методами требующими авторизацию от токена группы
 */
const group = {
	/**
	 * Получить идентификатор последней беседы в группе.
	 * @param token - Токен группы
	 * @return Идентификатор беседы.
	 */
	getLastConversation: async (token: string): Promise<number> => {
		const instanceVK = new VK({ token: token });
		return new Promise(async (resolve) => {
			let maxConversationID: number = 2147483647;
			let minConversationID: number = 2000000001;
			let currentConversationID: number = maxConversationID;
			let status = false;
			while (!status) {
				if (!(await checkConversationID(instanceVK, currentConversationID))) {
					maxConversationID = currentConversationID;
					currentConversationID = Math.round(
						(currentConversationID + minConversationID) / 2,
					);
				} else {
					if (maxConversationID !== currentConversationID) {
						while (!status) {
							if (minConversationID + 10 > maxConversationID) {
								for (let i = minConversationID; i < maxConversationID; i++) {
									if (!(await checkConversationID(instanceVK, i))) {
										status = true;
										currentConversationID = i - 1;
										resolve(currentConversationID);
									}
								}
							}
							currentConversationID = Math.round(
								(minConversationID + maxConversationID) / 2,
							);

							if (
								!(await checkConversationID(instanceVK, currentConversationID))
							) {
								maxConversationID = currentConversationID;
								currentConversationID = Math.round(
									(currentConversationID + minConversationID) / 2,
								);
							} else {
								minConversationID = currentConversationID;
							}
						}
					} else {
						status = true;
						resolve(currentConversationID);
					}
				}
			}
			resolve(currentConversationID);
		});
	},
};

/**
 * Секция для работы с методами требующими авторизацию от токена группы
 */
const user = {
	/**
	 * Получить идентификатор последней беседы в группе.
	 * @param token - Токен от аккаунта пользователя
	 * @param user_id - Идентификатор пользователя чьи стикеры требуется получить
	 * @return Идентификатор беседы.
	 */
	getUserStickers: async (
		token: string,
		user_id: number,
	): Promise<
		Array<{
			id: number;
			name: string;
			description: string;
		}>
	> => {
		let userGifts = await axios.get(
			`https://api.vk.com/method/gifts.getCatalog`,
			{
				params: { access_token: token, user_id: user_id, v: "5.103" },
			},
		);
		let parseStickers: Array<{
			id: number;
			name: string;
			description: string;
		}> = [];
		if (userGifts.data.error) {
			if (userGifts.data.error.error_code === 3) {
				throw new Error(`Need token from VK Me\nApp ID: 6146827`);
			} else {
				throw new Error(userGifts.data.error.error_msg);
			}
		} else {
			userGifts.data.response.map(async function (currentStickersSet: {
				items: any[];
			}) {
				currentStickersSet.items.map(async function (currentStickerPack: {
					disabled: number;
					gift: { stickers_product_id: any };
					sticker_pack: { title: any; description: any };
				}) {
					if (
						currentStickerPack.disabled === 1 &&
						!parseStickers.find(
							(x) => x.id === currentStickerPack.gift.stickers_product_id,
						)
					) {
						parseStickers.push({
							id: currentStickerPack.gift.stickers_product_id,
							name: currentStickerPack.sticker_pack.title,
							description: currentStickerPack.sticker_pack.description,
						});
					}
				});
			});
		}
		return parseStickers;
	},
};

const api = {
	/**
	 * Получить текущее состоянии API VK
	 * @return Текущее состоянии API VK
	 */
	status: async (): Promise<
		Array<{
			section: string;
			performance: number;
			uptime: number;
		}>
	> => {
		let data = await (await axios.get(`https://vk.com/dev/health`)).data;
		data = data.toString();
		let position1 = await data.indexOf(`var content = {`);
		let position2 = await data.indexOf(`'header': ['`);
		let newData = data.substring(position1, position2);
		position1 = newData.indexOf(`[[`);
		position2 = newData.indexOf(`]]`);
		let arrayWithSections = JSON.parse(
			newData.substring(position1, position2 + 2),
		);
		let outputArray = [];
		for (let i in arrayWithSections) {
			outputArray.push({
				section: arrayWithSections[i][0],
				performance: arrayWithSections[i][2],
				uptime: arrayWithSections[i][3],
			});
		}
		return outputArray;
	},
};

const article = {
	/**
	 * Получить данные о статье по ссылке
	 * @param articleLink - Ссылка на статью
	 * @return данные статьи
	 */
	getByURL: async (
		articleLink: string,
	): Promise<{
		id: number;
		owner_id: number;
		access_hash: string;
		title: string;
		subtitle: string;
		published: Date;
		views: number;
		shares: number;
	}> => {
		articleLink = articleLink.replace("https://m.", "https://");
		if (regular.isURL(articleLink) === false) {
			throw new Error(`Invalid article link`);
		} else {
			try {
				let data = await (await axios.get(articleLink)).data;
				let position1 = await data.indexOf(`Article.init({"id":`);
				let position2 = await data.indexOf(`</script></div>`, position1);
				data = data.substring(position1, position2);
				position1 = 13;
				position2 = await data.indexOf(`, {`);
				data = data.substring(position1, position2);
				let articleData = JSON.parse(data);
				return {
					id: articleData.id,
					owner_id: articleData.owner_id,
					access_hash: articleData.access_hash,
					title: articleData.title,
					subtitle: articleData.subtitle,
					published: new Date(articleData.published_date * 1000),
					views: articleData.views,
					shares: articleData.shares,
				};
			} catch (error) {
				throw new Error(`Invalid article`);
			}
		}
	},
};

async function checkConversationID(
	instanceVK: VK,
	peerID: number,
): Promise<boolean> {
	return instanceVK.api.messages
		.getConversationsById({
			peer_ids: peerID,
		})
		.then(({ items }) => {
			const [data] = items;
			return !!data.peer.id;
		})
		.catch((error) => {
			// @ts-ignore
			return !error.code === 927;
		});
}

/**
 * Создать класс для работы с методами группы
 * @param VK - экземпляр VK из vk-io
 * @return класс с методами группы
 */

export { group, user, api, article };
