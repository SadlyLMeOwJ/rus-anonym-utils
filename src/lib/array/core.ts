import { number } from "../number/core";
import naturalStringSorter from "./lib/naturalStringSorter";

import CloneArray from "./plugins/Clone";
import NumberArray from "./plugins/Number";

/**
 * @category Array
 * @description Класс для работы с массивами
 * @hideconstructor
 */
export class ArrayUtils {
	/**
	 * @description Класс для работы с методами клонирования массивов
	 * @type {CloneArray}
	 */
	public clone: CloneArray;

	/**
	 * @description Класс для работы с числовыми массивами
	 * @type {NumberArray}
	 */
	public number: NumberArray;

	// eslint-disable-next-line require-jsdoc
	constructor() {
		this.clone = new CloneArray();
		this.number = new NumberArray();
	}

	/**
	 * @description Возвращает рандомный элемент из массива
	 * @param {Array} inputArray - массив
	 * @returns {any} элемент из массива
	 *
	 * @example
	 * // Return 2
	 * array.random([1, 2, 3, 4]);
	 */
	public random<T>(inputArray: T[]): T {
		return inputArray[number.getRandomIntInclusive(0, inputArray.length - 1)];
	}

	/**
	 * @description Режет массив по чанкам
	 * @param {Array} inputArray массив
	 * @param {number} chunks общее количество чанков, которое должно получиться
	 * @returns {Array.<Array>} итоговый массив
	 *
	 * @example
	 * // Return [[1, 2], [3]]
	 * array.splitOn([1, 2, 3], 2);
	 */
	public splitOn<T>(inputArray: T[], chunks: number): T[][] {
		const outputArray: T[][] = [];
		const maxIteration = Math.floor(inputArray.length / chunks) * chunks;
		for (let i = 0; i < maxIteration; i += chunks) {
			outputArray.push(inputArray.slice(i, i + chunks));
		}
		if (inputArray[maxIteration]) {
			outputArray.push(inputArray.slice(maxIteration));
		}
		return outputArray;
	}

	/**
	 * @description Режет массив по элементам в чанке
	 * @param {Array} inputArray массив
	 * @param {number} elementsInChunk количество элементов в одном чанке
	 * @returns {Array.<Array>} итоговый массив
	 *
	 * @example
	 * // Return [[1], [2], [3]]
	 * array.splitTo([1, 2, 3], 1);
	 */
	public splitTo<T>(inputArray: T[], elementsInChunk: number): T[][] {
		const outputArray: T[][] = [];

		for (let i = 0; i < inputArray.length; i += elementsInChunk) {
			outputArray.push(inputArray.slice(i, i + elementsInChunk));
		}

		return outputArray;
	}

	/**
	 * @description Перемешивает массив
	 * @param {Array} inputArray массив
	 * @returns {Array} перемешанный массив
	 *
	 * @example
	 * // Return [5, 1, 4, 2, 3]
	 * array.shuffle([1, 2, 3, 4, 5]);
	 */
	public shuffle<T>(inputArray: T[]): T[] {
		const outputArray = inputArray.concat();
		for (let i = outputArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
		}
		return outputArray;
	}

	/**
	 * @description Вставляет элемент в массив
	 * @param {Array} inputArray массив
	 * @param {number} index Индекс добавляемого элемента
	 * @param {any} element Новый элемент
	 * @returns {Array} итоговый массив
	 *
	 * @example
	 * // Return [1, 2, 3, 4, 5]
	 * array.insert([1, 2, 4, 5], 2, 3);
	 */
	public insert<T>(inputArray: T[], index: number, element: T): T[] {
		const outputArray = inputArray.concat();
		outputArray.splice(index, 0, element);
		return outputArray;
	}

	/**
	 * @description Убирает пустые элементы из массива
	 * @param {Array} inputArray массив
	 * @returns {Array} отсортированный массив
	 *
	 * @example
	 * // Return [1, 3, 5]
	 * array.removeEmptyElements([1, null, 3, null, 5]);
	 */
	public removeEmptyElements<T>(inputArray: T[]): T[] {
		return inputArray.filter(function (element) {
			return element !== null;
		});
	}

	/**
	 * @description Естественная сортировка строк
	 * @param {Array} array - Массив который требуется отсортировать
	 * @param {Function=} extractor - Функция переводящая элемент массива в строку
	 * @returns {Array} Отсортированный массив
	 *
	 * @example
	 * // Return [1, 2, 3]
	 * array.naturalStringSorter([1, 3, 2], function (element) {
	 * 	return element.toString();
	 * });
	 * // Return [1, 2, 3]
	 * array.naturalStringSorter([1, 3, 2]);
	 */
	public naturalStringSorter<T>(
		array: T[],
		extractor?: (input: T) => string,
	): T[] {
		return naturalStringSorter(array, extractor);
	}

	/**
	 * @description Убирает из массива неуникальные значения (работает только с примитивами)
	 * @param {Array} array Массив который требуется уникализировать
	 * @returns {Array} Массив состоящий из уникальных значений
	 *
	 * @example
	 * // Return [1, 2]
	 * array.makeUnique([1, 2, 1, 1, 2]);
	 */
	public makeUnique<T>(array: T[]): T[] {
		return Array.from(new Set(array));
	}

	/**
	 * @description Удаляет из массива ложные значения (0, "", false, null, undefined, NaN)
	 * @param {Array} array Входной массив
	 * @returns {Array} Массив состоящий из реальных значений
	 *
	 * @example
	 * // Return ["test"]
	 * array.removeFalseValues([0, NaN, false, null, undefined, "", "test"])
	 */
	public removeFalseValues<T>(array: T[]): T[] {
		return array.filter(Boolean);
	}
}

export const array = new ArrayUtils();
