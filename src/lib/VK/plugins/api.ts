/* eslint-disable jsdoc/require-example */

import { accessRights } from "./../DB/accessRights";
import VKUtils from "../types";

import axios from "axios";
import { VK } from "vk-io";
import UtilsError from "../../../utils/error";

/**
 * @category VK
 * @description Класс для работы с API
 * @hideconstructor
 */
export class VK_API {
    /**
     * @description Получить текущее состоянии API VK
     * @returns {Promise} Текущее состоянии API VK
     */
    public async status(): Promise<VKUtils.IVKAPIStatus[]> {
        let data: string = (await axios.get(`https://vk.com/dev/health`)).data;
        data = data.toString();
        let position1 = data.indexOf(`var content = {`);
        let position2 = data.indexOf(`'header': ['`);
        const newData = data.substring(position1, position2);
        position1 = newData.indexOf(`[[`);
        position2 = newData.indexOf(`]]`);
        const arrayWithSections = JSON.parse(
            newData.substring(position1, position2 + 2)
        );
        const outputArray = [];
        for (const sectionData of arrayWithSections) {
            outputArray.push({
                section: sectionData[0],
                performance: sectionData[2],
                uptime: sectionData[3],
            });
        }
        return outputArray as VKUtils.IVKAPIStatus[];
    }

    /**
     * @description Проверка токена
     * @param {string} token Проверяемый токен
     * @returns {Promise} данные токена
     */
    public async checkToken(token: string): Promise<VKUtils.ICheckToken> {
        if (token.length !== 85) {
            throw new UtilsError("Invalid token length");
        }

        const TokenWords = token
            .split("")
            .map((tempWord) => tempWord.toLowerCase());
        const AllowedWordSet = new Set([
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
        ]);

        TokenWords.forEach((tempWord) => {
            if (!AllowedWordSet.has(tempWord)) {
                throw new UtilsError("Invalid token symbols");
            }
        });

        const tempVK = new VK({ token: token });
        const tokenData = await tempVK.api.users.get({}).catch(() => {
            throw new UtilsError("Invalid token");
        });

        const OutputData: VKUtils.ICheckToken = {
            type: "user",
            id: 0,
            accessRights: [],
        };

        if (tokenData.length === 0) {
            const [secondTokenData] = await tempVK.api.groups.getById({});
            OutputData.type = "group";
            OutputData.id = secondTokenData.id;
            const currentPermissions =
                await tempVK.api.groups.getTokenPermissions({});
            OutputData.accessRights = this.decodeMask(
                currentPermissions.mask,
                "group"
            );
        } else {
            OutputData.id = tokenData[0].id;
            const currentPermissions =
                await tempVK.api.account.getAppPermissions({
                    user_id: OutputData.id,
                });
            OutputData.accessRights = this.decodeMask(
                currentPermissions,
                "user"
            );
        }

        return OutputData;
    }

    /**
     * @description Позволяет получить битовую маску по правам
     * @param {Array.<VKUtils.TAccessRightType>} rights - набор прав
     * @param {"user" | "group"} type - пользователь/группа
     * @returns {number} - битовая маска
     */
    public generateMask(
        rights: VKUtils.TAccessRightType[],
        type: "user" | "group"
    ): number {
        let mask = 0;
        for (const right of rights) {
            accessRights[type].find(
                (x) => x.right === right && (mask += x.mask)
            );
        }
        return mask;
    }

    /**
     * @description Позволяет получить набор прав по битовой маске
     * @param {number} bitmask - битовая маска
     * @param {"user" | "group"} type - пользователь/группа
     * @returns {Array.<VKUtils.TAccessRightType>} - набор прав
     */
    public decodeMask(
        bitmask: number,
        type: "user" | "group"
    ): VKUtils.TAccessRightType[] {
        const rights: VKUtils.TAccessRightType[] = [];
        for (const right of accessRights[type]) {
            if (Boolean(bitmask & right.mask) === true) {
                rights.push(right.right);
            }
        }
        return rights;
    }
}

export const api = new VK_API();
