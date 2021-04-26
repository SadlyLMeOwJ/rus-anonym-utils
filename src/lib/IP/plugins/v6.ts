import { regular } from "../../regular/core";

export default class V6 {
	/**
	 * Проверка является ли переданная строка IPv6 адресом
	 * @param IP IP адрес
	 * @returns является ли переданный IP адрес IPv6
	 */
	public is(IP: string): boolean {
		return regular.isIPv6(IP);
	}
}
