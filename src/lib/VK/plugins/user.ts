/* eslint-disable jsdoc/require-example */

import axios from "axios";
import moment from "moment";
import { VK } from "vk-io";
import { StoreGetProductsResponse } from "vk-io/lib/api/schemas/responses";

import UtilsError from "../../../utils/error";
import { array } from "../../array/core";
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
        user_id: number
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

    /**
     * @description Метод позволяющий получить информацию о стикерпаках
     * @param {string} token - Токен пользователя
     * @param {number[]} stickerPackIDs - Массив с идентификаторами стикерпаков
     * @returns {Array.<VKUtils.IStickerPackInfo>} - Массив с данными о стикерах
     */
    public async getStickersInfo(
        token: string,
        stickerPackIDs: number[]
    ): Promise<VKUtils.IStickerPackInfo[]> {
        const vk = new VK({ token, apiVersion: "5.103" });
        const StickersInfo: VKUtils.IStickerPackInfo[] = [];
        const SplittedStickerPacks = array.splitTo(stickerPackIDs, 400);
        for (const chunk of SplittedStickerPacks) {
            const Info = await vk.api.call(`store.getStockItems`, {
                type: "stickers",
                product_ids: chunk.join(),
            });
            console.log(Info.items[0]);
            Info.items.map(
                (x: {
                    product: { id: number; title: string; url: string };
                    description: string;
                    author: string;
                    free?: number;
                    price?: number;
                    old_price?: number;
                }) => {
                    const stickerPackPrice = x.old_price || x.price || 0;
                    StickersInfo.push({
                        id: x.product.id,
                        name: x.product.title,
                        url: x.product.url,
                        description: x.description,
                        author: x.author,
                        isFree: stickerPackPrice === 0,
                        price: stickerPackPrice,
                    });
                }
            );
        }
        return StickersInfo;
    }

    // eslint-disable-next-line require-jsdoc
    private async __getStoreStockItems(
        token: string,
        user_id: number
    ): Promise<StoreGetProductsResponse> {
        const vk = new VK({ token: token, apiVersion: "5.103" });
        try {
            const StoreStockItems = (await vk.api.store.getProducts({
                type: "stickers",
                filters: "purchased",
                user_id,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            })) as any;
            if (StoreStockItems.error_code) {
                throw new Error(StoreStockItems.error_msg);
            }
            return StoreStockItems.items as StoreGetProductsResponse;
        } catch (error) {
            if (error.code === 3) {
                throw new UtilsError("Need token from VK Me\nApp ID: 6146827");
            } else {
                throw new UtilsError(error.message);
            }
        }
    }

    public async getStickerKeywords(
        token: string
    ): Promise<VKUtils.IStoreGetStickersKeywords>;
    public async getStickerKeywords(
        token: string,
        word: string
    ): Promise<VKUtils.IStoreGetStickersKeywordsWord>;
    public async getStickerKeywords(
        token: string,
        sticker_id: number | number[]
    ): Promise<VKUtils.IStoreGetStickersKeywordsNumber>;
    // eslint-disable-next-line require-jsdoc
    public async getStickerKeywords(
        token: string,
        wordOrSticker?: string | number | number[]
    ): Promise<unknown> {
        const vk = new VK({ token: token, apiVersion: "5.103" });
        const StickersKeywords = (await vk.api.call(
            "store.getStickersKeywords",
            {}
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
                    OutputData.words = OutputData.words.concat(
                        dictionary.words
                    );
                }
            }

            if (dictionary.promoted_stickers) {
                for (const promotedSticker of dictionary.promoted_stickers) {
                    if (wordOrSticker.includes(promotedSticker.sticker_id)) {
                        OutputData.words = OutputData.words.concat(
                            dictionary.words
                        );
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
    public async getAllStickers(
        token: string
    ): Promise<VKUtils.IUserStickerPack[]> {
        const UserGifts = await this.__parseUserGifts(token, 0);
        const ParseStickers: VKUtils.IUserStickerPack[] = [];

        for (const category of UserGifts) {
            for (const gift of category.items) {
                if (
                    gift.gift.stickers_product_id &&
                    gift.sticker_pack &&
                    !ParseStickers.find(
                        (stickerPack) =>
                            stickerPack.id === gift.gift.stickers_product_id
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
        user_id: number
    ): Promise<VKUtils.IGetUserStickerPacks> {
        const ParseStickers: VKUtils.IUserStickerPack[] = [];
        const UserStickerPacks = await this.__getStoreStockItems(
            token,
            user_id
        );
        const StickersInfo = await this.getStickersInfo(
            token,
            UserStickerPacks.map((x) => x.id)
        );
        for (const stickerPack of UserStickerPacks) {
            const StickerPackInfo = StickersInfo.find(
                (x) => x.id === stickerPack.id
            );
            ParseStickers.push({
                id: stickerPack.id,
                name:
                    stickerPack.title ||
                    StickerPackInfo?.name ||
                    "Не определено",
                author: StickerPackInfo?.author || "Не определён",
                description: StickerPackInfo?.description || "Не определено",
                price: StickerPackInfo?.price || 0,
                thumb_48: `https://vk.com/sticker/4-${stickerPack.id}-48`,
                thumb_96: `https://vk.com/sticker/4-${stickerPack.id}-96`,
                thumb_256: `https://vk.com/sticker/4-${stickerPack.id}-256w`,
            });
        }
        const PaidStickersCount = ParseStickers.filter(
            (x) => x.price > 0
        ).length;

        return {
            id: user_id,
            total_price: ParseStickers.map((x) => {
                return x.price;
            }).reduce((total, temp) => total + temp, 0),
            items: ParseStickers,
            paid: PaidStickersCount,
            free: ParseStickers.length - PaidStickersCount,
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

    /**
     * @description Позволяет узнать дату регистрации пользователя
     * @param {number} id - ID пользователя
     * @returns {Date} - Дата регистрации пользователя
     */
    public async getUserRegDate(id: number): Promise<Date> {
        const data = (await axios.get(`http://vk.com/foaf.php?id=${id}`)).data;
        const firstIndex = data.indexOf(`<ya:created dc:date="`) + 21;
        const secondIndex = data.indexOf(`"/>`, firstIndex);
        return moment(data.substring(firstIndex, secondIndex)).toDate();
    }

    /**
     * @description Позволяет узнать дату изменения информации пользователя
     * @param {number} id - ID пользователя
     * @returns {Date} - Дата изменения страницы пользователя
     */
    public async getUserModifiedDate(id: number): Promise<Date> {
        const data = (await axios.get(`http://vk.com/foaf.php?id=${id}`)).data;
        const firstIndex = data.indexOf(`<ya:modified dc:date="`) + 22;
        const secondIndex = data.indexOf(`"/>`, firstIndex);
        return moment(data.substring(firstIndex, secondIndex)).toDate();
    }
}

export const user = new VK_User();
