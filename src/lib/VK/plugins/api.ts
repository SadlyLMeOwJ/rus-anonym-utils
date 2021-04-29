/* eslint-disable jsdoc/require-example */

import { accessRights as AccessRights } from "./../DB/accessRights";
import { ICheckToken, IVKAPIStatus } from "../typings";

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
	public async status(): Promise<IVKAPIStatus[]> {
		let data: string = (await axios.get(`https://vk.com/dev/health`)).data;
		data = data.toString();
		let position1 = data.indexOf(`var content = {`);
		let position2 = data.indexOf(`'header': ['`);
		const newData = data.substring(position1, position2);
		position1 = newData.indexOf(`[[`);
		position2 = newData.indexOf(`]]`);
		const arrayWithSections = JSON.parse(
			newData.substring(position1, position2 + 2),
		);
		const OutputArray = [];
		for (const sectionData of arrayWithSections) {
			OutputArray.push({
				section: sectionData[0],
				performance: sectionData[2],
				uptime: sectionData[3],
			});
		}
		return OutputArray;
	}

	/**
	 * @description Проверка токена
	 * @param {string} token Проверяемый токен
	 * @returns {Promise} данные токена
	 */
	public async checkToken(token: string): Promise<ICheckToken> {
		if (token.length !== 85) {
			throw new UtilsError("Invalid token length");
		}

		const TokenWords = token.split("");
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

		for (const tempWord of TokenWords) {
			if (!AllowedWordSet.has(tempWord.toLowerCase())) {
				throw new UtilsError("Invalid token symbols");
			}
		}

		const tempVK = new VK({ token: token });
		const tokenData = await tempVK.api.users.get({}).catch(() => {
			throw new UtilsError("Invalid token");
		});

		const OutputData: ICheckToken = {
			type: "user",
			id: 0,
			accessRights: [],
		};

		if (tokenData.length === 0) {
			const [secondTokenData] = await tempVK.api.groups.getById({});
			OutputData.type = "group";
			OutputData.id = secondTokenData.id;
			const currentPermissions = await tempVK.api.groups.getTokenPermissions(
				{},
			);
			for (const right in AccessRights.group) {
				if (
					Boolean(currentPermissions.mask & AccessRights.group[right].mask) ===
					true
				) {
					OutputData.accessRights.push(AccessRights.group[right].right);
				}
			}
		} else {
			OutputData.id = tokenData[0].id;
			const currentPermissions = await tempVK.api.account.getAppPermissions({
				user_id: OutputData.id,
			});
			for (const right in AccessRights.user) {
				if (
					Boolean(currentPermissions & AccessRights.user[right].mask) === true
				) {
					OutputData.accessRights.push(AccessRights.user[right].right);
				}
			}
		}

		return OutputData;
	}
}

export const api = new VK_API();
