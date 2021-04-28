/* eslint-disable jsdoc/no-undefined-types */

import { array } from "../lib/array/core";
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
	public readonly array;
	public readonly logical;
	public readonly number;
	public readonly regular;
	public readonly string;
	public readonly time;
	public readonly vk;
	public readonly IP;

	constructor() {
		/**
		 * @description Секция для работы с массивами
		 * @type {ArrayUtils}
		 */
		this.array = array;

		/**
		 * @description Секция для работы с логическими функциями
		 * @type {LogicalUtils}
		 */
		this.logical = logical;

		/**
		 * @description Секция для работы с числами
		 * @type {NumberUtils}
		 */
		this.number = number;

		/**
		 * @description Секция для работы с регулярными выражениями
		 * @type {RegularUtils}
		 */
		this.regular = regular;

		/**
		 * @description Секция для работы с строками
		 * @type {StringUtils}
		 */
		this.string = string;

		/**
		 * @description Секция для работы с временем
		 * @type {TimeUtils}
		 */
		this.time = time;

		/**
		 * @description Секция для работы с VK
		 * @type {VK}
		 */
		this.vk = vk;

		/**
		 * @description Секция для работы с IP
		 * @type {IPUtils}
		 */
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
