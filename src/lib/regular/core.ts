/**
 * @module Regular
 */

import regularList from "./DB/regularTemplate";

const list = {
	/**
	 * Шаблон для E-Mail адресов
	 */
	email: regularList.email,
	/**
	 * Шаблон для IPv4 адресов
	 */
	IPv4: regularList.IPv4,
	/**
	 * Шаблон для IPv6 адресов
	 */
	IPv6: regularList.IPv6,
	/**
	 * Шаблон для любых IP адресов
	 */
	ip: regularList.ip,
	/**
	 * Шаблон для ссылок
	 */
	url: regularList.url,
	/**
	 * Шаблон для номеров
	 */
	number: regularList.phone,
};

export class RegularUtils {
	/**
	 * Проверка является ли переданная строка E-Mail адресом
	 * @param email {string} - E-Mail адрес
	 * @returns {boolean}
	 */
	public isEmail(email: string): boolean {
		return new RegExp(regularList.email, "").test(email);
	}

	/**
	 *  Проверка является ли переданная строка IPv4 адресом
	 * @param address {string} - IPv4 адрес
	 * @returns {boolean}
	 */
	public isIPv4(address: string): boolean {
		return new RegExp(regularList.IPv4, "").test(address);
	}

	/**
	 *  Проверка является ли переданная строка IPv6 адресом
	 * @param address {string} - IPv6 адрес
	 * @returns {boolean}
	 */
	public isIPv6(address: string): boolean {
		return new RegExp(regularList.IPv6, "").test(address);
	}

	/**
	 *  Проверка является ли переданная строка IP адресом
	 * @param address {string} - IP адрес
	 * @returns {boolean}
	 */
	public isIP(address: string): boolean {
		return new RegExp(regularList.ip, "").test(address);
	}

	/**
	 *  Проверка является ли переданная строка ccылкой
	 * @param url {string} - URL
	 * @returns {boolean}
	 */
	public isURL(url: string): boolean {
		return new RegExp(regularList.url, "").test(url);
	}

	/**
	 * Проверка является ли переданная строка номером
	 * @param email {string} - E-Mail адрес
	 * @returns {boolean}
	 */
	public isPhoneNumber(number: string): boolean {
		return new RegExp(regularList.number, "i").test(number);
	}

	/**
	 * @description Шаблоны для создания своих регулярных выражений при помощи конструктора RegExp
	 * @example
	 * // => RegExp
	 * new RegExp(utils.regular.list.email, "g");
	 */
	public list = list;
}

/**
 * Класс для работы с регулярными выражениями
 */
export const regular = new RegularUtils();
