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

/**
 * @category Regular
 * @description Класс для работы с регулярными выражениями
 * @hideconstructor
 */
export class RegularUtils {
	/**
	 * @description Шаблоны для создания своих регулярных выражений при помощи конструктора RegExp
	 * @example
	 * // => RegExp
	 * new RegExp(utils.regular.list.email, "g");
	 */
	public list;

	// eslint-disable-next-line require-jsdoc
	constructor() {
		this.list = list;
	}

	/**
	 * @description Проверка является ли переданная строка E-Mail адресом
	 * @param {string} email E-Mail адрес
	 * @returns {boolean} является ли переданная строка E-Mail адресом
	 * @example
	 * regular.isEmail("alexandrsemin2033@gmail.com"); // => true
	 */
	public isEmail(email: string): boolean {
		return new RegExp(regularList.email, "").test(email);
	}

	/**
	 * @description Проверка является ли переданная строка IPv4 адресом
	 * @param {string} address IPv4 адрес
	 * @returns {boolean} является ли переданная строка IPv4 адресом
	 * @example
	 * regular.isIPv4("192.168.0.1"); // => true
	 * regular.isIPv4("test"); // => false
	 */
	public isIPv4(address: string): boolean {
		return new RegExp(regularList.IPv4, "").test(address);
	}

	/**
	 * @description Проверка является ли переданная строка IPv6 адресом
	 * @param {string} address IPv6 адрес
	 * @returns {boolean} является ли переданная строка IPv6 адресом
	 * @example
	 * regular.isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // => true
	 * regular.isIPv6("test"); // => false
	 */
	public isIPv6(address: string): boolean {
		return new RegExp(regularList.IPv6, "").test(address);
	}

	/**
	 * @description Проверка является ли переданная строка IP адресом
	 * @param {string} address IP адрес
	 * @returns {boolean} является ли переданная строка IP адресом
	 * @example
	 * regular.isIP("192.168.0.1"); // => true
	 * regular.isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334"); // => true
	 * regular.isIP("test"); // => false
	 */
	public isIP(address: string): boolean {
		return new RegExp(regularList.ip, "").test(address);
	}

	/**
	 * @description Проверка является ли переданная строка ccылкой
	 * @param {string} url URL
	 * @returns {boolean} является ли переданная строка ccылкой
	 * @example
	 * regular.isURL("google.com"); // => true
	 * regular.isURL("http://google.com"); // => true
	 * regular.isURL("https://google.com"); // => true
	 * regular.isURL("https://google.com/test"); // => true
	 * regular.isURL("https://google.com/test?act=test"); // => true
	 * regular.isURL("test"); // => false
	 */
	public isURL(url: string): boolean {
		return new RegExp(regularList.url, "").test(url);
	}

	// eslint-disable-next-line jsdoc/require-example
	/**
	 * @description Проверка является ли переданная строка номером
	 * @param {number} number Номер телефона
	 * @returns {boolean} является ли переданная строка номером
	 */
	public isPhoneNumber(number: string): boolean {
		return new RegExp(regularList.number, "i").test(number);
	}
}

export const regular = new RegularUtils();
