import regularList from "./DB/regularTemplate";

/**
 * @category Regular
 * @description Шаблоны для регулярных выражений
 * @type {Object.<string, RegExp>}
 */
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

/**
 * @category Regular
 * @description Класс для работы с регулярными выражениями
 * @hideconstructor
 */
export class RegularUtils {
	/**
	 * @description Проверка является ли переданная строка E-Mail адресом
	 * @param {string} email E-Mail адрес
	 * @returns {boolean} является ли переданная строка E-Mail адресом
	 */
	public isEmail(email: string): boolean {
		return new RegExp(regularList.email, "").test(email);
	}

	/**
	 * @description Проверка является ли переданная строка IPv4 адресом
	 * @param {string} address IPv4 адрес
	 * @returns {boolean} является ли переданная строка IPv4 адресом
	 */
	public isIPv4(address: string): boolean {
		return new RegExp(regularList.IPv4, "").test(address);
	}

	/**
	 * @description Проверка является ли переданная строка IPv6 адресом
	 * @param {string} address IPv6 адрес
	 * @returns {boolean} является ли переданная строка IPv6 адресом
	 */
	public isIPv6(address: string): boolean {
		return new RegExp(regularList.IPv6, "").test(address);
	}

	/**
	 * @description Проверка является ли переданная строка IP адресом
	 * @param {string} address IP адрес
	 * @returns {boolean} является ли переданная строка IP адресом
	 */
	public isIP(address: string): boolean {
		return new RegExp(regularList.ip, "").test(address);
	}

	/**
	 * @description Проверка является ли переданная строка ccылкой
	 * @param {string} url URL
	 * @returns {boolean} является ли переданная строка ccылкой
	 */
	public isURL(url: string): boolean {
		return new RegExp(regularList.url, "").test(url);
	}

	/**
	 * @description Проверка является ли переданная строка номером
	 * @param {number} number Номер телефона
	 * @returns {boolean} является ли переданная строка номером
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

export const regular = new RegularUtils();
