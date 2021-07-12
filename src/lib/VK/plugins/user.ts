/* eslint-disable jsdoc/require-example */

import axios from "axios";
import moment from "moment";

/**
 * @category VK
 * @description Класс для работы с методами требующими токена польщователя
 * @hideconstructor
 */
export class VK_User {
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
