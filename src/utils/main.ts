/**
 * @module Utils
 */

import { array } from "../lib/array/core";
import { logical } from "../lib/logical/core";
import { number } from "../lib/number/core";
import { regular } from "../lib/regular/core";
import { string } from "../lib/string/core";
import { time } from "../lib/time/core";
import { vk } from "../lib/vk/core";
import { IP } from "../lib/IP/core";

class RusAnonymUtils {
	/**
	 * Класс для работы с массивами
	 */
	public array = array;

	/**
	 * Класс для работы с логическими функциями
	 */
	public logical = logical;

	/**
	 * Класс для работы с числами
	 */
	public number = number;

	/**
	 * Класс для работы с регулярными выражениями
	 */
	public regular = regular;

	/**
	 * Класс для работы с строками
	 */
	public string = string;

	/**
	 * Класс для работы со временем
	 */
	public time = time;

	/**
	 * Секция для работы с методами VK
	 */
	public vk = vk;

	/**
	 * Класс для работы с IP адресами
	 */
	public IP = IP;

	/**
	 * Приостанавливает работу скрипта на выбранное время
	 * @param ms Время в ms
	 * @example
	 * import utils from "rus-anonym-utils";
	 * await utils.sleep(1000); // Приостановит скрипт на 1 секунду
	 */
	public sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

export default RusAnonymUtils;
