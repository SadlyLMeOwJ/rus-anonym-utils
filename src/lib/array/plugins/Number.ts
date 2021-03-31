import Sort from "./NumberSort";

class Number {
	/**
	 * Вывод минимального значения в массиве
	 * @param inputArray {Array} - массив с числами
	 * @returns - минимальное значение
	 */
	public static min(inputArray: number[]): number {
		return Math.min.apply(null, inputArray);
	}

	/**
	 * Вывод максимального значения в массиве
	 * @param inputArray {Array} - массив с числами
	 * @returns максимальное значение
	 */
	public static max(inputArray: number[]): number {
		return Math.max.apply(null, inputArray);
	}

	/**
	 * Вывод среднего значения в массиве
	 * @param inputArray {Array} - массив с числами
	 * @returns среднее значение
	 */
	public static average(inputArray: number[]): number {
		return inputArray.reduce((a, b) => a + b) / inputArray.length;
	}

	public static sort = new Sort();
}

export default Number;
