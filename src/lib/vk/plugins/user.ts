import { IGetUserStickerPacks, IUserStickerPack } from "./../types";
import { VK } from "vk-io";

import UtilsError from "../../../utils/error";
import { IGiftsGetCatalogResponse } from "../types";

export class VK_User {
	private async __parseUserGifts(
		token: string,
		user_id: number,
	): Promise<IGiftsGetCatalogResponse[]> {
		const vk = new VK({ token: token, apiVersion: "5.103" });
		try {
			const GiftsCatalog = await vk.api.call("gifts.getCatalog", {
				user_id: user_id,
			});
			return GiftsCatalog;
		} catch (error) {
			if (error.code === 3) {
				throw new UtilsError("Need token from VK Me\nApp ID: 6146827");
			} else {
				throw new UtilsError(error.message);
			}
		}
	}

	public async getAllStickers(token: string): Promise<IUserStickerPack[]> {
		const UserGifts = await this.__parseUserGifts(token, 0);
		const ParseStickers: IUserStickerPack[] = [];

		for (const category of UserGifts) {
			for (const gift of category.items) {
				if (
					gift.gift.stickers_product_id &&
					gift.sticker_pack &&
					!ParseStickers.find(
						(stickerPack) => stickerPack.id === gift.gift.stickers_product_id,
					)
				) {
					ParseStickers.push({
						id: gift.gift.stickers_product_id,
						name: gift.sticker_pack.title,
						description: gift.sticker_pack.description,
						author: gift.sticker_pack.author,
						price: gift.price,
						thumb_256: gift.gift.thumb_256,
						thumb_48: gift.gift.thumb_48,
						thumb_96: gift.gift.thumb_96,
					});
				}
			}
		}

		return ParseStickers;
	}

	/**
	 * Получить стикеры пользователя
	 * @param token - Токен от аккаунта пользователя
	 * @param user_id - Идентификатор пользователя чьи стикеры требуется получить
	 * @return Массив со стикерами пользователя
	 */
	public async getUserStickerPacks(
		token: string,
		user_id: number,
	): Promise<IGetUserStickerPacks> {
		const UserGifts = await this.__parseUserGifts(token, user_id);
		const ParseStickers: IUserStickerPack[] = [];
		const AllStickers = await this.getAllStickers(token);
		for (const category of UserGifts) {
			for (const gift of category.items) {
				if (
					gift.gift.stickers_product_id &&
					gift.sticker_pack &&
					gift.disabled &&
					!ParseStickers.find(
						(stickerPack) => stickerPack.id === gift.gift.stickers_product_id,
					)
				) {
					ParseStickers.push({
						id: gift.gift.stickers_product_id,
						name: gift.sticker_pack.title,
						description: gift.sticker_pack.description,
						author: gift.sticker_pack.author,
						price:
							AllStickers.find(
								(stickerPack) =>
									stickerPack.id === gift.gift.stickers_product_id,
							)?.price || 0,
						thumb_256: gift.gift.thumb_256,
						thumb_48: gift.gift.thumb_48,
						thumb_96: gift.gift.thumb_96,
					});
				}
			}
		}
		return {
			id: user_id,
			total_price: ParseStickers.map((stickerPack) => {
				return stickerPack.price;
			}).reduce((totalPrice, tempPrice) => totalPrice + tempPrice, 0),
			items: ParseStickers,
		};
	}
}

export const user = new VK_User();
