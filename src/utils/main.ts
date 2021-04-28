/**
 * @category Utils
 */

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
 * @hideconstructor
 */
class RusAnonymUtils {
	/**
	 * Секция для работы с массивами
	 */
	public array = array;

	/**
	 * Секция для работы с логическими функциями
	 */
	public logical = logical;

	/**
	 * Секция для работы с числами
	 */
	public number = number;

	/**
	 * Секция для работы с регулярными выражениями
	 */
	public regular = regular;

	/**
	 * Секция для работы с строками
	 */
	public string = string;

	/**
	 * Секция для работы со временем
	 */
	public time = time;

	/**
	 * Секция для работы с методами VK
	 */
	public vk = vk;

	/**
	 * Секция для работы с IP адресами
	 */
	public IP = IP;

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
