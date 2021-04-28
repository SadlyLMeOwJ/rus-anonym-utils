import Sort from "./NumberSort";

class Number {
	/**
	 * Вывод минимального значения в массиве
	 *
	 * @param inputArray {Array} - массив с числами
	 * @returns - минимальное значение
	 */
	public min(inputArray: number[]): number {
		return Math.min.apply(null, inputArray);
	}

	/**
	 * Вывод максимального значения в массиве
	 *
	 * @param inputArray {Array} - массив с числами
	 * @returns максимальное значение
	 */
	public max(inputArray: number[]): number {
		return Math.max.apply(null, inputArray);
	}

	/**
	 * Вывод среднего значения в массиве
	 *
	 * @param inputArray {Array} - массив с числами
	 * @returns среднее значение
	 */
	public average(inputArray: number[]): number {
		return inputArray.reduce((a, b) => a + b) / inputArray.length;
	}

	/**
	 * Подсчёт суммы массива
	 *
	 * @param inputArray {Array} - массив с числами
	 * @returns среднее значение
	 */
	public total(inputArray: number[]): number {
		return inputArray.reduce(
			(totalPrice, tempPrice) => totalPrice + tempPrice,
			0,
		);
	}

	/**
	 * Генерирует массив заполненный выбранной цифрой, либо нулями
	 *
	 * @param {number} length - Длина выходного массива
	 * @param {number} customNumber - Цифра, которой нужно заполнить массив, или функция её генерирующая
	 * @returns {Array.<number>} - Массив заполнный нулями
	 */
	public generate(
		length: number,
		customNumber?: number | (() => number),
	): number[] {
		if (typeof customNumber === "function") {
			return Array.from({ length: length }, () => customNumber());
		} else {
			return Array.from({ length: length }, () => customNumber || 0);
		}
	}

	public sort = new Sort();
}

export default Number;
