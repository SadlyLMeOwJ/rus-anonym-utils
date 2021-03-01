/**
 * @module VK
 */

import { VK } from "vk-io";
import { regular } from "../main";
import axios from "axios";

type accessRight =
	| "notify"
	| "friends"
	| "photos"
	| "audio"
	| "video"
	| "stories"
	| "pages"
	| "leftLink"
	| "status"
	| "notes"
	| "messages"
	| "wall"
	| "ads"
	| "offline"
	| "docs"
	| "groups"
	| "notifications"
	| "stats"
	| "email"
	| "market"
	| "app_widget"
	| "manage";

const accessRights: {
	user: Array<{
		right: accessRight;
		mask: number;
	}>;
	group: Array<{
		right: accessRight;
		mask: number;
	}>;
} = {
	user: [
		{
			right: "notify",
			mask: 1 << 0,
		},
		{
			right: "friends",
			mask: 1 << 1,
		},
		{
			right: "photos",
			mask: 1 << 2,
		},
		{
			right: "audio",
			mask: 1 << 3,
		},
		{
			right: "video",
			mask: 1 << 4,
		},
		{
			right: "stories",
			mask: 1 << 6,
		},
		{
			right: "pages",
			mask: 1 << 7,
		},
		{
			right: "leftLink",
			mask: 1 << 8,
		},
		{
			right: "status",
			mask: 1 << 10,
		},
		{
			right: "notes",
			mask: 1 << 11,
		},
		{
			right: "messages",
			mask: 1 << 12,
		},
		{
			right: "wall",
			mask: 1 << 13,
		},
		{
			right: "ads",
			mask: 1 << 15,
		},
		{
			right: "offline",
			mask: 1 << 16,
		},
		{
			right: "docs",
			mask: 1 << 17,
		},
		{
			right: "groups",
			mask: 1 << 18,
		},
		{
			right: "notifications",
			mask: 1 << 19,
		},
		{
			right: "stats",
			mask: 1 << 20,
		},
		{
			right: "email",
			mask: 1 << 22,
		},
		{
			right: "market",
			mask: 1 << 27,
		},
	],
	group: [
		{
			right: "stories",
			mask: 1 << 0,
		},
		{
			right: "photos",
			mask: 1 << 2,
		},
		{
			right: "app_widget",
			mask: 1 << 6,
		},
		{
			right: "messages",
			mask: 1 << 12,
		},
		{
			right: "docs",
			mask: 1 << 17,
		},
		{
			right: "manage",
			mask: 1 << 18,
		},
	],
};

/**
 * Секция для работы с методами требующими авторизацию от токена группы
 * @namespace
 */
const group = {
	/**
	 * Получить идентификатор последней беседы в группе.
	 * @param token - Токен группы
	 * @return Идентификатор беседы.
	 */
	getLastConversation: async (token: string): Promise<number> => {
		const instanceVK = new VK({ token: token });
		let maxConversationID = 2147483647;
		let minConversationID = 2000000001;
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
									return currentConversationID;
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
					return currentConversationID;
				}
			}
		}
		return currentConversationID;
	},
};

/**
 * Секция для работы с методами требующими авторизацию от токена пользователя
 * @namespace
 */
const user = {
	/**
	 * Получить стикеры пользователя
	 * @param token - Токен от аккаунта пользователя
	 * @param user_id - Идентификатор пользователя чьи стикеры требуется получить
	 * @return Массив со стикерами пользователя
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
		const userGifts = await axios.get(
			`https://api.vk.com/method/gifts.getCatalog`,
			{
				params: { access_token: token, user_id: user_id, v: "5.103" },
			},
		);
		const parseStickers: Array<{
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
				items: Array<{
					disabled: number;
					gift: { stickers_product_id: number };
					sticker_pack: { title: string; description: string };
				}>;
			}) {
				currentStickersSet.items.map(async function (currentStickerPack) {
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

/**
 * Секция для работы с API VK
 * @namespace
 */
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
		const newData = data.substring(position1, position2);
		position1 = newData.indexOf(`[[`);
		position2 = newData.indexOf(`]]`);
		const arrayWithSections = JSON.parse(
			newData.substring(position1, position2 + 2),
		);
		const outputArray = [];
		for (const i in arrayWithSections) {
			outputArray.push({
				section: arrayWithSections[i][0],
				performance: arrayWithSections[i][2],
				uptime: arrayWithSections[i][3],
			});
		}
		return outputArray;
	},
};

/**
 * Секция для работы с методами которые работает с статьями VK
 * @namespace
 */
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
				const articleData = JSON.parse(data);
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

/**
 * Проверка токена
 * @param token {string} - Проверяемый токен
 * @return данные токена
 */
async function checkToken(
	token: string,
): Promise<{
	type: "user" | "group";
	id: number;
	accessRights: accessRight[];
}> {
	if (token.length !== 85) {
		throw new Error("Invalid token length");
	}

	const splitToken = token.split("");
	const allowedWord = [
		"d",
		"e",
		"f",
		"b",
		"c",
		"a",
		"0",
		"1",
		"2",
		"3",
		"4",
		"5",
		"6",
		"7",
		"8",
		"9",
	];
	for (const tempWord of splitToken) {
		if (!allowedWord.find((x) => x === tempWord)) {
			throw new Error("Invalid token symbols");
		}
	}

	const tempVK = new VK({ token: token });
	const tokenData = await tempVK.api.users.get({}).catch(() => {
		throw new Error("Invalid token");
	});

	const outputData: {
		type: "user" | "group";
		id: number;
		accessRights: accessRight[];
	} = {
		type: "user",
		id: 0,
		accessRights: [],
	};

	if (tokenData.length === 0) {
		const [secondTokenData] = await tempVK.api.groups.getById({});
		outputData.type = "group";
		outputData.id = secondTokenData.id;
		const currentPermissions = await tempVK.api.groups.getTokenPermissions({});
		for (const i in accessRights.group) {
			if (
				Boolean(currentPermissions.mask & accessRights.group[i].mask) === true
			) {
				outputData.accessRights.push(accessRights.group[i].right);
			}
		}
	} else {
		outputData.id = tokenData[0].id;
		const currentPermissions = await tempVK.api.account.getAppPermissions({
			user_id: outputData.id,
		});
		for (const i in accessRights.user) {
			if (Boolean(currentPermissions & accessRights.user[i].mask) === true) {
				outputData.accessRights.push(accessRights.user[i].right);
			}
		}
	}

	return outputData;
}

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
		.catch(() => {
			return false;
		});
}

export { group, user, api, article, checkToken, accessRights };
