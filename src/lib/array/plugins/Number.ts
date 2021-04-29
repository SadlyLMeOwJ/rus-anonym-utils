import NumberArraySort from "./NumberSort";

/**
 * @category Array
 * @description Класс для работы с числовыми массивами
 * @hideconstructor
 */
class NumberArray {
	/**
	 * @description Сортировка
	 * @type {NumberArraySort}
	 */
	public sort: NumberArraySort;

	constructor() {
		this.sort = new NumberArraySort();
	}

	/**
	 * @description Вывод минимального значения в массиве
	 * @param {Array.<number>} inputArray Массив с числами
	 * @returns {number} Минимальное значение
	 *
	 * @example
	 * // Return -50
	 * array.number.min([1, 2, 3, 4, 5, 6, -50]);
	 */
	public min(inputArray: number[]): number {
		return Math.min.apply(null, inputArray);
	}

	/**
	 * @description Вывод максимального значения в массиве
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {number} максимальное значение
	 *
	 * @example
	 * // Return 6
	 * array.number.min([1, 2, 3, 4, 5, 6, -50]);
	 */
	public max(inputArray: number[]): number {
		return Math.max.apply(null, inputArray);
	}

	/**
	 * @description Вывод среднего значения в массиве
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {number} среднее значение
	 *
	 * @example
	 * // Return 3
	 * array.number.average([1, 2, 3, 4, 5]);
	 */
	public average(inputArray: number[]): number {
		return inputArray.reduce((a, b) => a + b) / inputArray.length;
	}

	/**
	 * @description Подсчёт суммы массива
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {number} сумма массива
	 *
	 * @example
	 * // Return 15
	 * array.number.total([1, 2, 3, 4, 5]);
	 */
	public total(inputArray: number[]): number {
		return inputArray.reduce(
			(totalPrice, tempPrice) => totalPrice + tempPrice,
			0,
		);
	}

	/**
	 * @description Генерирует массив заполненный выбранной цифрой, либо нулями
	 * @param {number} length - Длина выходного массива
	 * @param {number} customNumber - Цифра, которой нужно заполнить массив, или функция её генерирующая
	 * @returns {Array.<number>} - Массив
	 *
	 * @example
	 * // Return [0, 0, 0, 0, 0]
	 * array.number.generate(5);
	 *
	 * @example
	 * // Return [5, 5, 5, 5, 5]
	 * array.number.generate(5, 5);
	 *
	 * @example
	 * // Return [1, 2, 3, 4, 5]
	 * let i = 1;
	 * array.number.generate(5, () => ++i);
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
}

export default NumberArray;
