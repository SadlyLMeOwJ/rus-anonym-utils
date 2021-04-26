import { regular } from "./../regular/core";

import IPv4 from "./plugins/v4";
import IPv6 from "./plugins/v6";

export class IPUtils {
	/**
	 * Проверка является ли переданная строка IP адресом
	 * @param IP IP адрес
	 * @returns является ли переданный IP адрес валидным
	 */
	public is(IP: string): boolean {
		return regular.isIP(IP);
	}

	/**
	 * Секция для работы с IPv4 адресами
	 */
	public v4: IPv4 = new IPv4();

	/**
	 * Секция для работы с IPv6 адресами
	 */
	public v6: IPv6 = new IPv6();
}

/**
 * Класс для работы с IP адресами
 */
export const IP = new IPUtils();
