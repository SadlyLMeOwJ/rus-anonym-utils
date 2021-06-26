/* eslint-disable jsdoc/require-example */

import VKUtils from "../types";
import axios from "axios";
import { regular } from "./../../regular/core";
import UtilsError from "../../../utils/error";

/**
 * @category VK
 * @description Класс для работы с статьями
 * @hideconstructor
 */
export class VK_Article {
    /**
     * @description Получить данные о статье по ссылке
     * @param {string} articleLink Ссылка на статью
     * @returns {Promise} Данные статьи
     */
    public async getByURL(
        articleLink: string
    ): Promise<VKUtils.IArticleGetByUrl> {
        articleLink = articleLink.trim().replace("https://m.", "https://");
        if (regular.isURL(articleLink) === false) {
            throw new UtilsError(`Invalid article link`);
        } else {
            try {
                let data: string = (await axios.get(articleLink)).data;
                let position1 = data.indexOf(`Article.init({"id":`);
                let position2 = data.indexOf(`</script></div>`, position1);
                data = data.substring(position1, position2);
                position1 = 13;
                position2 = data.indexOf(`, {`);
                data = data.substring(position1, position2);
                const articleData = JSON.parse(data);
                return {
                    id: articleData.id,
                    owner_id: articleData.owner_id,
                    raw_id: articleData.raw_id,
                    access_hash: articleData.access_hash,
                    title: articleData.title,
                    subtitle: articleData.subtitle,
                    published: new Date(articleData.published_date * 1000),
                    views: articleData.views,
                    views_formatted: articleData.views_formatted,
                    shares: articleData.shares,
                    shares_formatted: articleData.shares_formatted,
                    url: "https://vk.com/" + articleData.url,
                };
            } catch (error) {
                throw new UtilsError(`Invalid article`);
            }
        }
    }
}

export const article = new VK_Article();
