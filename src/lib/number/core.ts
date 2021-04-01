/**
 * @module Number
 * @description Функции для работы с числами
 */

import CryptoJS from "crypto-js";
import UtilsError from "../../utils/error";

export class NumberUtils {
	/**
	 * Получить псевдослучайное число с плавающей точкой
	 * @param min {number} - Минимальное значение
	 * @param max {number} - Максимальное значение
	 * @returns {number} Возвращает случайное число в заданном интервале. Возвращаемое значение не менее (и может быть равно) min и не более (и не равно) max.
	 */
	public getRandomArbitrary(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	/**
	 * Получение псевдослучайного целого числа в заданном интервале
	 * @param min {number} - Минимальное значение
	 * @param max {number} - Максимальное значение
	 * @returns {number} Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max.
	 */
	public getRandomInt(min: number, max: number): number;
	/**
	 * Получение псевдослучайного целого числа в заданном интервале с сидом
	 * @param {number} min - Минимальное значение
	 * @param {number} max - Максимальное значение
	 * @param {string} seed - Сид
	 * @returns {number} Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max.
	 */
	public getRandomInt(min: number, max: number, seed: string): number;
	public getRandomInt(min: number, max: number, seed?: string): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		if (seed) {
			return (
				(parseInt(CryptoJS.SHA256(seed).toString(), 16) % (max - min + 1)) + min
			);
		}
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 * Получение псевдослучайного целого числа в заданном интервале, включительно
	 * @param min {number} - Минимальное значение
	 * @param max {number} - Максимальное значение
	 * @returns {number} Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max включительно
	 */
	public getRandomIntInclusive(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * Проверяет, является ли число целым
	 * @param number {number} - Число
	 * @returns {boolean} Возвращает true, если число целое, и false если оно не является целым
	 */
	public isInteger(number: number): boolean {
		return (number ^ 0) === number;
	}

	/**
	 * Разделяет число по 3 символа
	 * @param number {number} - Число
	 * @param separator {string} - Разделитель
	 * @returns {string} Итоговую строку
	 */
	public separator(number: number, separator: string): string {
		const output = number.toString();
		if (!output) {
			throw new UtilsError(`Invalid number`);
		} else {
			separator = separator || ".";
			const splitted = output.split("");
			const reversed = splitted.reverse();
			const joined = reversed.join("");
			const matched = joined.match(/[0-9]{1,3}/g);
			const separated = matched?.join(
				separator.toString().split("").reverse().join(""),
			);
			const splittedOutput = separated?.split("");
			const reversedOutput = splittedOutput?.reverse();
			const joinedOutput = reversedOutput?.join("");
			if (joinedOutput) {
				return joinedOutput;
			} else {
				throw new UtilsError(`Invalid number`);
			}
		}
	}
}

/**
 * Класс для работы с числами
 */
export const number = new NumberUtils();
