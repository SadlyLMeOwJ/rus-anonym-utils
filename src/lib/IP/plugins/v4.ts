import { regular } from "../../regular/core";

export default class V4 {
	private _toBinary(IP: string): string[] {
		const splittedIP = IP.split(".");
		const binaryIP = [];
		for (let i = 0; i < splittedIP.length; i++) {
			const binaryNo = parseInt(splittedIP[i]).toString(2);
			if (binaryNo.length == 8) {
				binaryIP.push(binaryNo);
			} else {
				const diffNo = 8 - binaryNo.length;
				let createBinary = "";
				for (let j = 0; j < diffNo; j++) {
					createBinary += "0";
				}
				createBinary += binaryNo;
				binaryIP.push(createBinary);
			}
		}
		return binaryIP;
	}

	public _toIP(IP: string[]): number[] {
		const broadcastIP = [];
		for (let i = 0; i < IP.length; i++) {
			broadcastIP.push(parseInt(parseInt(IP[i]).toString(), 2));
		}
		return broadcastIP;
	}

	private _bitwise(
		firstBinary: string,
		secondBinary: string,
		operator: "AND" | "OR",
	): string {
		const firstArr = firstBinary.split("");
		const secondArr = secondBinary.split("");
		let newAdded = "";
		for (let i = 0; i < firstArr.length; i++) {
			if (firstArr[i] + "+" + secondArr[i] == "1+0") {
				newAdded += operator === "AND" ? "0" : "1";
			} else if (firstArr[i] + "+" + secondArr[i] == "0+1") {
				newAdded += operator === "AND" ? "0" : "1";
			} else if (firstArr[i] + "+" + secondArr[i] == "1+1") {
				newAdded += "1";
			} else if (firstArr[i] + "+" + secondArr[i] == "0+0") {
				newAdded += "0";
			}
		}
		return newAdded;
	}

	private _invertedBinary(number: string): string {
		const noArr = number.toString().split("");
		let newNo = "";
		for (let i = 0; i < noArr.length; i++) {
			if (noArr[i] == "0") {
				newNo += "1";
			} else {
				newNo += "0";
			}
		}
		return newNo;
	}

	/**
	 * Проверка является ли переданная строка IPv4 адресом
	 * @param IP IP адрес
	 * @returns является ли переданный IP адрес IPv4
	 */
	public is(IP: string): boolean {
		return regular.isIPv4(IP);
	}

	/**
	 * Возвращает адрес сети
	 * @param IP IP адрес
	 * @param maskIP маска подсети
	 * @returns IP сети
	 */
	public calculateNetworkIP(IP: string, maskIP: string): string {
		const binaryIP = this._toBinary(IP);
		const maskBinaryIP = this._toBinary(maskIP);

		const binaryNetwork = [];
		for (let j = 0; j < maskBinaryIP.length; j++) {
			binaryNetwork.push(this._bitwise(binaryIP[j], maskBinaryIP[j], "AND"));
		}

		const NetworkIPArr = this._toIP(binaryNetwork);

		let NetworkIPStr = "";
		for (let k = 0; k < NetworkIPArr.length; k++) {
			NetworkIPStr += NetworkIPArr[k] + ".";
		}
		return NetworkIPStr.slice(0, -1);
	}

	/**
	 * Возвращает broadcast адрес
	 * @param IP IP адрес
	 * @param maskIP маска подсети
	 * @returns Broadcast IP
	 */
	public calculateBroadcastIP(IP: string, maskIP: string): string {
		const binaryIP = this._toBinary(IP);
		const maskBinaryIP = this._toBinary(maskIP);
		const invertedMark = [];
		for (let i = 0; i < maskBinaryIP.length; i++) {
			invertedMark.push(this._invertedBinary(maskBinaryIP[i]));
		}

		const binaryBroadcast = [];
		for (let j = 0; j < maskBinaryIP.length; j++) {
			binaryBroadcast.push(this._bitwise(binaryIP[j], invertedMark[j], "OR"));
		}

		const broadcastIPArr = this._toIP(binaryBroadcast);

		let broadcastIPStr = "";
		for (let k = 0; k < broadcastIPArr.length; k++) {
			broadcastIPStr += broadcastIPArr[k] + ".";
		}
		return broadcastIPStr.slice(0, -1);
	}
}
