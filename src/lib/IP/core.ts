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
	 * @description Секция для работы с IPv4 адресами
	 * @type {IPv4}
	 */
	public v4: IPv4;

	/**
	 * @description Секция для работы с IPv6 адресами
	 * @type {IPv6}
	 */
	public v6: IPv6;

	// eslint-disable-next-line require-jsdoc
	constructor() {
		this.v4 = new IPv4();
		this.v6 = new IPv6();
	}

	/**
	 * @description Проверка является ли переданная строка IP адресом
	 * @param {string} IP IP адрес
	 * @returns {boolean} является ли переданный IP адрес валидным
	 * @example
	 * // Return true
	 * IP.is("192.168.0.1");
	 * @example
	 * // Return false
	 * IP.is("test");
	 */
	public is(IP: string): boolean {
		return regular.isIP(IP);
	}
}

export const IP = new IPUtils();
