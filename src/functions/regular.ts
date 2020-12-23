/**
 * @module Regular
 */

import list from "../DB/regularTemplate";

/**
 * Проверка является ли переданная строка E-Mail адресом
 * @param email {string} - E-Mail адрес
 * @returns {boolean}
 */
function isEmail(email: string): boolean {
	return new RegExp(list.email, "").test(email);
}

/**
 *  Проверка является ли переданная строка IPv4 адресом
 * @param address {string} - IPv4 адрес
 * @returns {boolean}
 */
function isIPv4(address: string): boolean {
	return new RegExp(list.IPv4, "").test(address);
}

/**
 *  Проверка является ли переданная строка IPv6 адресом
 * @param address {string} - IPv6 адрес
 * @returns {boolean}
 */
function isIPv6(address: string): boolean {
	return new RegExp(list.IPv6, "").test(address);
}

/**
 *  Проверка является ли переданная строка ccылкой
 * @param url {string} - URL
 * @returns {boolean}
 */
function isURL(url: string): boolean {
	return new RegExp(list.url, "").test(url);
}

export { list, isIPv4, isIPv6, isEmail, isURL };
