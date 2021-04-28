/**
 * @module Array
 * @description Функции для работы с массивами
 */

import { number } from "../number/core";
import naturalStringSorter from "./lib/naturalStringSorter";

import CloneArray from "./plugins/Clone";
import NumberArray from "./plugins/Number";
export class ArrayUtils {
	/**
	 * Возвращает рандомный элемент из массива
	 * @param inputArray {Array} - массив
	 * @returns элемент из массива
	 *
	 * @example
	 * // Return 2
	 * array.random([1, 2, 3, 4]);
	 */
	public random<T>(inputArray: T[]): T {
		return inputArray[number.getRandomIntInclusive(0, inputArray.length - 1)];
	}

	/**
	 * Режет массив по чанкам
	 * @param inputArray {Array} - массив
	 * @param chunks {Array.<Array>} - общее количество чанков, которое должно получиться
	 * @returns итоговый массив
	 *
	 * @example
	 * // Return [[1, 2], [3]]
	 * array.splitOn([1, 2, 3], 2);
	 */
	public splitOn<T>(array: T[], chunks: number): T[][] {
		const outputArray: T[][] = [];
		const maxIteration = Math.floor(array.length / chunks) * chunks;
		for (let i = 0; i < maxIteration; i += chunks) {
			outputArray.push(array.slice(i, i + chunks));
		}
		if (array[maxIteration]) {
			outputArray.push(array.slice(maxIteration));
		}
		return outputArray;
	}

	/**
	 * Режет массив по элементам в чанке
	 * @param inputArray {Array} - массив
	 * @param elementsInChunk - количество элементов в одном чанке
	 * @returns итоговый массив
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
	 * Перемешивает массив
	 * @param inputArray {Array} - массив
	 * @returns перемешанный массив
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
	 * Вставляет элемент в массив
	 * @param inputArray {Array} - массив
	 * @param index {Number} - Индекс добавляемого элемента
	 * @param element {any} - Новый элемент
	 * @returns итоговый массив
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
	 * Убирает пустые элементы из массива
	 * @param inputArray {Array} - массив
	 * @returns отсортированный массив
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
	 * Естественная сортировка строк
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
	 * Убирает из массива неуникальные значения (работает только с примитивами)
	 * @param {Array} array - Массив который требуется уникализировать
	 * @returns {Array} - Массив состоящий из уникальных значений
	 */
	public makeUnique<T>(array: T[]): T[] {
		return Array.from(new Set(array));
	}

	/**
	 * Удаляет из массива ложные значения (0, "", false, null, undefined, NaN)
	 * @param array - входной массив
	 * @returns {Array} - Массив состоящий из реальных значений
	 */
	public removeFalseValues<T>(array: T[]): T[] {
		return array.filter(Boolean);
	}

	/**
	 * Класс для работы с методами клонирования массивов
	 */
	public clone: CloneArray = new CloneArray();

	/**
	 * Класс для работы с числовыми массивами
	 */
	public number: NumberArray = new NumberArray();
}

export const array = new ArrayUtils();
