/**
 * @module Number
 */

/**
 * Получение случайного числа от 0 (включительно) до 1 (не включая)
 * @returns случайное числа от 0 (включительно) до 1 (не включая)
 */
function getRandom() {
	return Math.random();
}

/**
 * Получить псевдослучайное число с плавающей точкой в диапазоне от 0 до 1
 * @param min - Минимальное значение
 * @param max - Максимальное значение
 * @returns Возвращает случайное число в заданном интервале. Возвращаемое значение не менее (и может быть равно) min и не более (и не равно) max.
 */
function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

/**
 * Получение случайного целого числа в заданном интервале
 * @param min - Минимальное значение
 * @param max - Максимальное значение
 * @returns Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max.
 */
function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Получение случайного целого числа в заданном интервале, включительно
 * @param min - Минимальное значение
 * @param max - Максимальное значение
 * @returns Возвращает случайное целое число в заданном интервале. Возвращаемое значение не менее min (или следующее целое число, которое больше min, если min не целое) и не более (но не равно) max включительно
 */
function getRandomIntInclusive(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Проверяет, является ли число целым
 * @param number - Число
 * @returns Возвращает true, если число целое, и false если оно не является целым
 */
function isInteger(number: number): boolean {
	return (number ^ 0) === number;
}

/**
 * Разделяет число по 3 символа
 * @param number - Число
 * @param separator - Разделитель
 * @returns Итоговую строку
 */
function separator(number: number, separator: string): string {
	let output = number.toString();
	if (!output) {
		throw new Error(`Invalid number`);
	} else {
		separator = separator || ".";
		let splitted = output.split("");
		let reversed = splitted.reverse();
		let joined = reversed.join("");
		let matched = joined.match(/[0-9]{1,3}/g);
		let separated = matched?.join(
			separator.toString().split("").reverse().join(""),
		);
		let splittedOutput = separated?.split("");
		let reversedOutput = splittedOutput?.reverse();
		let joinedOutput = reversedOutput?.join("");
		if (joinedOutput) {
			return joinedOutput;
		} else {
			throw new Error(`Invalid number`);
		}
	}
}

export {
	getRandom,
	getRandomArbitrary,
	getRandomInt,
	getRandomIntInclusive,
	isInteger,
	separator,
};
