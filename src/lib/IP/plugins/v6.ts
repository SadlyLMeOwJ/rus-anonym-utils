import { regular } from "../../regular/core";

/**
 * @category IP
 * @description Класс для работы с IPv6
 * @hideconstructor
 */
class IPv6 {
	/**
	 * Проверка является ли переданная строка IPv6 адресом
	 *
	 * @param {string} IP IP адрес
	 * @returns {boolean} является ли переданный IP адрес IPv6
	 */
	public is(IP: string): boolean {
		return regular.isIPv6(IP);
	}
}

export default IPv6;
