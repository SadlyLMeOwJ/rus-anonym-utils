import { array } from "./../../array/core";
/* eslint-disable jsdoc/require-example */

import axios from "axios";
import moment from "moment";
import { API } from "vk-io";

import types from "../types";

/**
 * @category VK
 * @description Класс для работы с методами требующими токена польщователя
 * @hideconstructor
 */
export class VK_User {
    /**
     * @description Позволяет узнать информацию о стикерах
     * @param {string} token - токен
     * @param {number[]} stickerPacks_ids - Массив идентификаторов стикерпаков
     * @returns {types.IStickerPackInfo[]} - Массив с информацией о стикерпаках
     */
    public async getStickerPacksInfo(
        token: string,
        stickerPacks_ids: number[]
    ): Promise<types.IStickerPackInfo[]> {
        const api = new API({
            token,
            apiVersion: "5.157",
        });

        const data = await api.call(`store.getStockItems`, {
            type: "stickers",
            product_ids: stickerPacks_ids,
            lang: "ru",
        });

        return data.items.map(
            (x: {
                product: {
                    style_sticker_ids: number[];
                    has_animation: boolean;
                    id: number;
                    title: string;
                    copyright: string;
                    url: string;
                };
                old_price: number;
                price: number;
                author: string;
                description: string;
            }) => {
                const isStyle = !!x.product.style_sticker_ids;
                const isAnimation = !!x.product.has_animation;
                const price = x.old_price || x.price || 0;
                return {
                    id: x.product.id,
                    price,
                    title: x.product.title,
                    author: x.author,
                    description: x.description,
                    copyright: x.product.copyright,
                    url: x.product.url,
                    isFree: price === 0,
                    isStyle,
                    isAnimation,
                };
            }
        );
    }

    public async getUserStickerPacks(
        token: string,
        user_id: number
    ): Promise<types.IUserStickerPack[]>;
    public async getUserStickerPacks(
        token: string,
        user_id: number,
        extend: true
    ): Promise<types.IGetUserStickerPacksResponse>;
    /**
     * @description Узнать стикеры пользователя
     * @param {string} token - токен
     * @param {number} user_id - ID пользователя
     * @param {true=} extend - Расширенная информация о стикерпаках
     * @returns {types.IUserStickerPack[] | types.IGetUserStickerPacksResponse} - массив с информацией о стикерах
     */
    public async getUserStickerPacks(
        token: string,
        user_id: number,
        extend?: true
    ): Promise<types.IUserStickerPack[] | types.IGetUserStickerPacksResponse> {
        const api = new API({ token, apiVersion: "5.157" });

        const userStickerPacks = await api.call(`store.getProducts`, {
            type: "stickers",
            filters: "purchased",
            user_id,
        });

        const parsedUserStickerPacks = userStickerPacks.items.map(
            (x: {
                id: number;
                base_id: number;
                active: number;
                purchase_date: number;
            }) => {
                return {
                    id: x.id,
                    isStyle: !!x.base_id,
                    isActive: Boolean(x.active),
                    purchaseDate: new Date(x.purchase_date * 1000),
                };
            }
        ) as types.IUserStickerPack[];

        if (!extend) {
            return parsedUserStickerPacks;
        } else {
            const extendsStickerPackInfo = await this.getStickerPacksInfo(
                token,
                parsedUserStickerPacks.map((x) => x.id)
            );

            const output: types.IUserStickerPackExtend[] = [];

            for (const stickerPack of extendsStickerPackInfo) {
                const userStickerPackInfo = parsedUserStickerPacks.find(
                    (x) => x.id === stickerPack.id
                ) as types.IUserStickerPack;
                output.push(Object.assign(stickerPack, userStickerPackInfo));
            }

            const freeStickerPacks = output.filter((x) => x.isFree).length;
            const animatedStickerPacks = output.filter(
                (x) => x.isAnimation
            ).length;
            const stylesStickerPacks = output.filter((x) => x.isStyle).length;

            return {
                items: output,
                totalPrice: array.number.total(output.map((x) => x.price)),
                stats: {
                    free: freeStickerPacks,
                    paid: freeStickerPacks - output.length,
                    animated: animatedStickerPacks,
                    notAnimated: animatedStickerPacks - output.length,
                    styles: stylesStickerPacks,
                    notStyles: stylesStickerPacks - output.length,
                },
            };
        }
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
