import CryptoJS from "crypto-js";

/**
 * @category Number
 * @description Класс для работы с числами
 * @hideconstructor
 */
export class NumberUtils {
	/**
	 * @description Получить псевдослучайное число с плавающей точкой
	 * @param {number} min Минимальное значение
	 * @param {number} max Максимальное значение
	 * @returns {number} Возвращает случайное число в заданном интервале. Возвращаемое значение не менее (и может быть равно) min и не более (и не равно) max.
	 * @example
	 * number.getRandomArbitrary(1, 5); // => 2.8043424354010273
	 */
	public getRandomArbitrary(min: number, max: number): number {
		return Math.random() * (max - min) + min;
	}

	/**
	 * @description Получение псевдослучайного целого числа в заданном интервале
	 * @param {number} min Минимальное значение
	 * @param {number} max Максимальное значение
	 * @returns {number} Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max.
	 */
	public getRandomInt(min: number, max: number): number;
	/**
	 * Получение псевдослучайного целого числа в заданном интервале с сидом
	 *
	 * @param {number} min - Минимальное значение
	 * @param {number} max - Максимальное значение
	 * @param {string} seed - Сид
	 * @returns {number} Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max.
	 */
	public getRandomInt(min: number, max: number, seed: string): number;
	// eslint-disable-next-line require-jsdoc
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
	 * @description Получение псевдослучайного целого числа в заданном интервале, включительно
	 * @param {number} min Минимальное значение
	 * @param {number} max Максимальное значение
	 * @returns {number} Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max включительно
	 * @example
	 * number.getRandomIntInclusive(1, 5); // => 1
	 */
	public getRandomIntInclusive(min: number, max: number): number {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * @description Проверяет, является ли число целым
	 * @param {number} number Число
	 * @returns {boolean} Возвращает true, если число целое, и false если оно не является целым
	 * @example
	 * number.isInteger(1); // => true
	 * number.isInteger(1.5); // => false
	 */
	public isInteger(number: number): boolean {
		return (number ^ 0) === number;
	}

	/**
	 * @description Разделяет число по 3 символа
	 * @param {number} number Число
	 * @param {string} separator Разделитель
	 * @param {string=} dotSymbol Разделитель между целой и дробной частью числа
	 * @returns {string} Итоговую строку
	 * @example
	 * number.separator(100000, "."); // => 100.000
	 * number.separator(100000.50, ".", ","); // => 100.000,50
	 */
	public separator(number: number, separator: string, dotSymbol: string | undefined = "."): string {
		const splittedNumber = Math.abs(number).toString().split(".");
		splittedNumber[0] = splittedNumber[0]
			.split("")
			.reverse()
			.map((value, index, arr) =>
				index > 0 && index < arr.length && index % 3 == 0
					? value + separator
					: value,
			)
			.reverse()
			.join("");
		return (Math.sign(number) < 0 ? "-" : "") + splittedNumber.join(dotSymbol);
	}
}

export const number = new NumberUtils();
