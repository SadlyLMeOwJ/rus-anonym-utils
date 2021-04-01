import axios from "axios";

export class VK_User {
	/**
	 * Получить стикеры пользователя
	 * @param token - Токен от аккаунта пользователя
	 * @param user_id - Идентификатор пользователя чьи стикеры требуется получить
	 * @return Массив со стикерами пользователя
	 */
	public async getUserStickers(
		token: string,
		user_id: number,
	): Promise<
		Array<{
			id: number;
			name: string;
			description: string;
		}>
	> {
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
	}
}

export const user = new VK_User();
