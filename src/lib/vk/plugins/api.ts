import { accessRights } from "./../DB/accessRights";
import { accessRightType } from "./../types";

import axios from "axios";
import { VK } from "vk-io";

export class VK_API {
	/**
	 * Получить текущее состоянии API VK
	 * @return Текущее состоянии API VK
	 */
	public async status(): Promise<
		Array<{
			section: string;
			performance: number;
			uptime: number;
		}>
	> {
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
		for (const sectionData of arrayWithSections) {
			outputArray.push({
				section: sectionData[0],
				performance: sectionData[2],
				uptime: sectionData[3],
			});
		}
		return outputArray;
	}

	/**
	 * Проверка токена
	 * @param token {string} - Проверяемый токен
	 * @return данные токена
	 */
	public async checkToken(
		token: string,
	): Promise<{
		type: "user" | "group";
		id: number;
		accessRights: accessRightType[];
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
			accessRights: accessRightType[];
		} = {
			type: "user",
			id: 0,
			accessRights: [],
		};

		if (tokenData.length === 0) {
			const [secondTokenData] = await tempVK.api.groups.getById({});
			outputData.type = "group";
			outputData.id = secondTokenData.id;
			const currentPermissions = await tempVK.api.groups.getTokenPermissions(
				{},
			);
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
}

export const api = new VK_API();
