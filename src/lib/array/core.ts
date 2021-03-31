/**
 * @module Array
 * @description Функции для работы с массивами
 */

import LogicalClass from "../logical/core";
import { getRandomIntInclusive } from "../number/core";

import CloneArray from "./plugins/Clone";
import NumberArray from "./plugins/Number";

const Logical = new LogicalClass();
export default class Array {
	private __naturalSortingCompare(a: number, b: number) {
		return a < b ? -1 : a > b ? 1 : 0;
	}

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
		return inputArray[getRandomIntInclusive(0, inputArray.length - 1)];
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
		return array.reduce(
			(acc, n, i) => (
				((acc[i % chunks] = acc[i % chunks] || []) as T[]).push(n), acc
			),
			[],
		);
	}

	/**
	 * Режет массив по элементам в чанке
	 * @param inputArray {Array} - массив
	 * @param elementsInChunk - количество элементов в одном чанке
	 * @returns итоговый массив
	 *
	 * @example
	 * // Return [[1], [2], [3]]
	 * array.splitTo([1, 2, 3], 3);
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
	 * array.universalStringSorter([1, 3, 2], function (element) {
	 * 	element.toString()
	 * });
	 * // Return [1, 3, 2]
	 * array.universalStringSorter([1, 3, 2]);
	 */
	public naturalStringSorter<T>(
		array: T[],
		extractor?: (input: T) => string,
	): T[] {
		function createSplitter(item: T): Splitter {
			return new Splitter(item);
		}

		class elementsPart {
			value: string | number;
			isNumber: boolean;
			constructor(text: string, isNumber: boolean) {
				this.isNumber = isNumber;
				this.value = isNumber ? Number(text) : text;
			}
		}
		class Splitter {
			source: T;
			private key: string;
			private elements: elementsPart[] = [];
			private currentIndex = 0;
			private fromIndex = 0;
			private completed = false;
			findElements() {
				return this.elements.length;
			}
			processElement(elementIndex: number) {
				while (this.elements.length <= elementIndex && !this.completed) {
					this.parseString();
				}
				return elementIndex < this.elements.length
					? this.elements[elementIndex]
					: null;
			}
			private isNumber(char: string) {
				const code = char.charCodeAt(0);
				return code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0);
			}
			private parseString() {
				if (this.currentIndex < this.key.length) {
					while (++this.currentIndex) {
						const currentIsDigit = this.isNumber(
							this.key.charAt(this.currentIndex - 1),
						);
						const nextChar = this.key.charAt(this.currentIndex);
						const currentIsLast = this.currentIndex === this.key.length;

						const isBorder =
							currentIsLast ||
							Logical.XOR(currentIsDigit, this.isNumber(nextChar));
						if (isBorder) {
							const partStr = this.key.slice(this.fromIndex, this.currentIndex);
							this.elements.push(new elementsPart(partStr, currentIsDigit));
							this.fromIndex = this.currentIndex;
							break;
						}
					}
				} else {
					this.completed = true;
				}
			}
			constructor(item: T) {
				this.source = item;
				this.key =
					typeof extractor === "function" ? extractor(item) : String(item);
			}
		}

		const splittersArray = array.map(createSplitter);
		const sortedSplittersArray = splittersArray.sort(
			(sp1: Splitter, sp2: Splitter) => {
				let i = 0;
				do {
					const first = sp1.processElement(i);
					const second = sp2.processElement(i);

					if (null !== first && null !== second) {
						if (Logical.XOR(first.isNumber, second.isNumber)) {
							return first.isNumber ? -1 : 1;
						} else {
							const comp = this.__naturalSortingCompare(
								Number(first.value),
								Number(second.value),
							);
							if (comp != 0) {
								return comp;
							}
						}
					} else {
						return this.__naturalSortingCompare(
							sp1.findElements(),
							sp2.findElements(),
						);
					}
				} while (++i);
				return 0;
			},
		);

		return sortedSplittersArray.map(function (splitterInstance: Splitter) {
			return splitterInstance.source;
		});
	}

	/**
	 * Класс для работы с методами клонирования массивов
	 * @example
	 * const utils = require(`rus-anonym-utils`);
	 * utils.array.clone
	 */
	public clone: CloneArray = new CloneArray();

	/**
	 * Класс для работы с числовыми массивами
	 */
	public number: NumberArray = new NumberArray();
}
