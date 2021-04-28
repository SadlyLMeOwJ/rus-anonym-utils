import { IPUtils } from "./../lib/IP/core";
import { VK } from "./../lib/VK/core";
import { TimeUtils } from "./../lib/time/core";
import { StringUtils } from "./../lib/string/core";
import { RegularUtils } from "./../lib/regular/core";
import { NumberUtils } from "./../lib/number/core";
import { LogicalUtils } from "./../lib/logical/core";

import { array, ArrayUtils } from "../lib/array/core";
import { logical } from "../lib/logical/core";
import { number } from "../lib/number/core";
import { regular } from "../lib/regular/core";
import { string } from "../lib/string/core";
import { time } from "../lib/time/core";
import { vk } from "../lib/VK/core";
import { IP } from "../lib/IP/core";

/**
 * @description Класс функций
 * @class
 * @hideconstructor
 */
class RusAnonymUtils {
	/**
	 * @description Секция для работы с массивами
	 * @type {ArrayUtils}
	 */
	public readonly array: ArrayUtils;

	/**
	 * @description Секция для работы с логическими функциями
	 * @type {LogicalUtils}
	 */
	public readonly logical: LogicalUtils;

	/**
	 * @description Секция для работы с числами
	 * @type {NumberUtils}
	 */
	public readonly number: NumberUtils;

	/**
	 * @description Секция для работы с регулярными выражениями
	 * @type {RegularUtils}
	 */
	public readonly regular: RegularUtils;

	/**
	 * @description Секция для работы с строками
	 * @type {StringUtils}
	 */
	public readonly string: StringUtils;

	/**
	 * @description Секция для работы с временем
	 * @type {TimeUtils}
	 */
	public readonly time: TimeUtils;

	/**
	 * @description Секция для работы с VK
	 * @type {VK}
	 */
	public readonly vk: VK;

	/**
	 * @description Секция для работы с IP
	 * @type {IPUtils}
	 */
	public readonly IP: IPUtils;

	constructor() {
		this.array = array;
		this.logical = logical;
		this.number = number;
		this.regular = regular;
		this.string = string;
		this.time = time;
		this.vk = vk;
		this.IP = IP;
	}

	/**
	 * @description Приостанавливает работу скрипта на выбранное время
	 * @param {number} ms Время в ms
	 * @example
	 * import utils from "rus-anonym-utils";
	 * await utils.sleep(1000); // Приостановит скрипт на 1 секунду
	 *
	 * @returns {Promise} Промис
	 */
	public sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

export default RusAnonymUtils;
