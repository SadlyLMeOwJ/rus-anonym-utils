import { regular } from "../../regular/core";

export default class V4 {
	private _toDecimal(IP: string): number {
		return IP.split(".")
			.map((x) => Number(x))
			.reduce((total, amount) => total + amount);
	}

	/**
	 * Проверка является ли переданная строка IPv4 адресом
	 * @param IP IP адрес
	 * @returns является ли переданный IP адрес IPv4
	 */
	public is(IP: string): boolean {
		return regular.isIPv4(IP);
	}
}
