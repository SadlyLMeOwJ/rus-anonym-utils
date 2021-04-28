import { regular } from "./../regular/core";

import IPv4 from "./plugins/v4";
import IPv6 from "./plugins/v6";

/**
 * @category IP
 * @classdesc Класс для работы с IP
 * @hideconstructor
 */
export class IPUtils {
	/**
	 * Проверка является ли переданная строка IP адресом
	 *
	 * @param {string} IP IP адрес
	 * @returns {boolean} является ли переданный IP адрес валидным
	 */
	public is(IP: string): boolean {
		return regular.isIP(IP);
	}

	/**
	 * Секция для работы с IPv4 адресами
	 *
	 * @type {IPv4}
	 * @memberof IPUtils
	 */
	public v4: IPv4 = new IPv4();

	/**
	 * Секция для работы с IPv6 адресами
	 *
	 * @type {IPv6}
	 */
	public v6: IPv6 = new IPv6();
}

export const IP = new IPUtils();
