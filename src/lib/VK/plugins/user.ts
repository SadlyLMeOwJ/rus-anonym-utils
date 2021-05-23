/* eslint-disable jsdoc/require-example */

import moment from "moment";
import { VK } from "vk-io";

import UtilsError from "../../../utils/error";
import VKUtils from "../types";


/**
 * @category VK
 * @description Класс для работы с методами требующими токена польщователя
 * @hideconstructor
 */
export class VK_User {
	// eslint-disable-next-line require-jsdoc
	private async __parseUserGifts(
		token: string,
		user_id: number,
	): Promise<VKUtils.IGiftsGetCatalogResponse[]> {
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

	public async getStickerKeywords(
		token: string,
	): Promise<VKUtils.IStoreGetStickersKeywords>;
	public async getStickerKeywords(
		token: string,
		word: string,
	): Promise<VKUtils.IStoreGetStickersKeywordsWord>;
	public async getStickerKeywords(
		token: string,
		sticker_id: number | number[],
	): Promise<VKUtils.IStoreGetStickersKeywordsNumber>;
	// eslint-disable-next-line require-jsdoc
	public async getStickerKeywords(
		token: string,
		wordOrSticker?: string | number | number[],
	): Promise<unknown> {
		const vk = new VK({ token: token, apiVersion: "5.103" });
		const StickersKeywords = (await vk.api.call(
			"store.getStickersKeywords",
			{},
		)) as VKUtils.IStoreGetStickersKeywords;
		if (!wordOrSticker) {
			return StickersKeywords;
		}
		if (typeof wordOrSticker === "string") {
			const OutputData: VKUtils.IStoreGetStickersKeywordsWord = {
				word: wordOrSticker,
				stickers: [],
			};
			for (const dictionary of StickersKeywords.dictionary) {
				if (dictionary.words.includes(wordOrSticker)) {
					for (const sticker of dictionary.user_stickers) {
						OutputData.stickers.push(sticker);
					}
					if (dictionary.promoted_stickers) {
						for (const sticker of dictionary.promoted_stickers) {
							OutputData.stickers.push(sticker);
						}
					}
				}
			}
			return OutputData;
		}
		const OutputData: VKUtils.IStoreGetStickersKeywordsNumber = {
			sticker_id: wordOrSticker,
			words: [],
		};
		if (typeof wordOrSticker === "number") {
			wordOrSticker = [wordOrSticker];
		}
		for (const dictionary of StickersKeywords.dictionary) {
			for (const userSticker of dictionary.user_stickers) {
				if (wordOrSticker.includes(userSticker.sticker_id)) {
					OutputData.words = OutputData.words.concat(dictionary.words);
				}
			}

			if (dictionary.promoted_stickers) {
				for (const promotedSticker of dictionary.promoted_stickers) {
					if (wordOrSticker.includes(promotedSticker.sticker_id)) {
						OutputData.words = OutputData.words.concat(dictionary.words);
					}
				}
			}
		}
		return OutputData;
	}

	/**
	 * @description Позволяет узнать стикеры ВКонтакте
	 * @param {string} token - Токен пользователя
	 * @returns {Array.<VKUtils.IUserStickerPack[]>} - Массив со всеми стикерами ВКонтакте
	 */
	public async getAllStickers(token: string): Promise<VKUtils.IUserStickerPack[]> {
		const UserGifts = await this.__parseUserGifts(token, 0);
		const ParseStickers: VKUtils.IUserStickerPack[] = [];

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
	 * @description Получить стикеры пользователя
	 * @param {string} token Токен от аккаунта пользователя
	 * @param {number} user_id Идентификатор пользователя чьи стикеры требуется получить
	 * @returns {Promise} Массив со стикерами пользователя
	 */
	public async getUserStickerPacks(
		token: string,
		user_id: number,
	): Promise<VKUtils.IGetUserStickerPacks> {
		const UserGifts = await this.__parseUserGifts(token, user_id);
		const ParseStickers: VKUtils.IUserStickerPack[] = [];
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

	/**
	 * @description Устанавливает шаги в приложении Шаги
	 * @param {Object} token Параметры
	 * @param {string} token.token Токен от аккаунта пользователя
	 * @param {number} token.steps Количество шагов
	 * @param {number} token.distance Пройденная дистанция
	 * @param {string|Date} token.date Дата в формате YYYY-MM-DD
	 * @returns {Promise} обьект с полями steps и distance
	 */
	public async setSteps({
		token,
		steps,
		distance,
		date,
	}: {
		token: string;
		steps: number;
		distance: number;
		date: string | Date;
	}): Promise<{
		steps: number;
		distance: number;
	}> {
		const vk = new VK({ token });
		return await vk.api.call("vkRun.setSteps", {
			date: moment(date).format("YYYY-MM-DD"),
			steps,
			distance,
		});
	}
}

export const user = new VK_User();
