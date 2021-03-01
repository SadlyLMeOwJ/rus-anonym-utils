/**
 * @module Array
 * @description Функции для работы с массивами
 */

import { XOR } from "../logical";
import { performance } from "perf_hooks";
import { getRandomIntInclusive } from "../number";

import {
	sortingAlgorithm,
	SortingBenchmarkResponse,
} from "../../types/array";

/**
 * Возвращает рандомный элемент из массива
 * @param inputArray {Array} - массив
 * @returns элемент из массива
 *
 * @example
 * // Return 2
 * array.random([1, 2, 3, 4]);
 */
const random = <T>(inputArray: T[]): T => {
	return inputArray[getRandomIntInclusive(0, inputArray.length - 1)];
};

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
const splitOn = <T>(array: T[], chunks: number): T[][] => {
	return array.reduce(
		(acc, n, i) => (
			((acc[i % chunks] = acc[i % chunks] || []) as T[]).push(n), acc
		),
		[],
	);
};

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
function splitTo<T>(inputArray: T[], elementsInChunk: number): T[][] {
	const outputArray: Array<T[]> = [];

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
function shuffle<T>(inputArray: T[]): T[] {
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
function insert<T>(inputArray: T[], index: number, element: T): T[] {
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
function removeEmptyElements<T>(inputArray: T[]): T[] {
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
function naturalStringSorter<T>(
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
						currentIsLast || XOR(currentIsDigit, this.isNumber(nextChar));
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
					if (XOR(first.isNumber, second.isNumber)) {
						return first.isNumber ? -1 : 1;
					} else {
						const comp = __naturalSortingCompare(
							Number(first.value),
							Number(second.value),
						);
						if (comp != 0) {
							return comp;
						}
					}
				} else {
					return __naturalSortingCompare(
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
 * Класс для работы с сортировкой числовых массивов
 * @example
 * const utils = require(`rus-anonym-utils`);
 * utils.array.number.sort
 */
class NumberArraysSort {
	private static instance: NumberArraysSort;
	/**
	 * @hideconstructor
	 */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	/**
	 * Пузырьковая сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	bubble(inputArray: number[]): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		for (let i = 0, endI = inputArray.length - 1; i < endI; i++) {
			for (let j = 0, endJ = endI - i; j < endJ; j++) {
				if (inputArray[j] > inputArray[j + 1]) {
					const currentElement = inputArray[j];
					inputArray[j] = inputArray[j + 1];
					inputArray[j + 1] = currentElement;
				}
			}
		}
		return inputArray;
	}
	/**
	 * Сортировка выбором
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	selection(inputArray: number[]): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		const arrayLength = inputArray.length;
		for (let i = 0; i < arrayLength - 1; i++) {
			let min = i;
			for (let j = i + 1; j < arrayLength; j++) {
				if (inputArray[j] < inputArray[min]) {
					min = j;
				}
			}
			const t = inputArray[min];
			inputArray[min] = inputArray[i];
			inputArray[i] = t;
		}
		return inputArray;
	}
	/**
	 * Сортировка вставками
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	insertion(inputArray: number[]): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		const n = inputArray.length;
		for (let i = 0; i < n; i++) {
			const v = inputArray[i];
			let j = i - 1;
			while (j >= 0 && inputArray[j] > v) {
				inputArray[j + 1] = inputArray[j];
				j--;
			}
			inputArray[j + 1] = v;
		}
		return inputArray;
	}
	/**
	 * Сортировка Шелла
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	Shell(inputArray: number[]): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		const n = inputArray.length;
		let i = Math.floor(n / 2);
		while (i > 0) {
			for (let j = 0; j < n; j++) {
				let k = j;
				const t = inputArray[j];
				while (k >= i && inputArray[k - i] > t) {
					inputArray[k] = inputArray[k - i];
					k -= i;
				}
				inputArray[k] = t;
			}
			i = i == 2 ? 1 : Math.floor((i * 5) / 11);
		}
		return inputArray;
	}
	/**
	 * Сортировка подсчётом
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	simpleCounting(inputArray: number[]): number[] {
		if (inputArray.length <= 1) {
			return inputArray;
		}
		const n = inputArray.length,
			count: number[] = [],
			outputArray: number[] = [];
		for (let i = 0; i < n; i++) {
			count[i] = 0;
		}
		for (let i = 0; i < n - 1; i++) {
			for (let j = i + 1; j < n; j++) {
				if (inputArray[i] < inputArray[j]) count[j]++;
				else count[i]++;
			}
		}
		for (let i = 0; i < n; i++) {
			outputArray[count[i]] = inputArray[i];
		}
		return outputArray;
	}
	/**
	 * Сортировка расчёской
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	comb(inputArray: number[]): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		const l = inputArray.length;
		const factor = 1.247;
		let gapFactor = l / factor;
		while (gapFactor > 1) {
			const gap = Math.round(gapFactor);
			for (let i = 0, j = gap; j < l; i++, j++) {
				if (inputArray[i] > inputArray[j]) {
					[inputArray[i], inputArray[j]] = [inputArray[j], inputArray[i]];
				}
			}
			gapFactor = gapFactor / factor;
		}
		return inputArray;
	}
	/**
	 * Сортировка слиянием
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	merge(inputArray: number[]): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		const middle = Math.floor(inputArray.length / 2);
		const arrLeft = inputArray.slice(0, middle);
		const arrRight = inputArray.slice(middle);

		function mergeArray(firstArray: number[], secondArray: number[]): number[] {
			const arrSort = [];
			let i = 0;
			let j = 0;
			while (i < firstArray.length && j < secondArray.length) {
				arrSort.push(
					firstArray[i] < secondArray[j] ? firstArray[i++] : secondArray[j++],
				);
			}
			return [...arrSort, ...firstArray.slice(i), ...secondArray.slice(j)];
		}

		return mergeArray(this.merge(arrLeft), this.merge(arrRight));
	}
	/**
	 * Пирамидальная сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	heap(inputArray: number[]): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		let n = inputArray.length,
			i = Math.floor(n / 2),
			j,
			k,
			t;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			if (i > 0) t = inputArray[--i];
			else {
				n--;
				if (n == 0) {
					return inputArray;
				}
				t = inputArray[n];
				inputArray[n] = inputArray[0];
			}
			j = i;
			k = j * 2 + 1;
			while (k < n) {
				if (k + 1 < n && inputArray[k + 1] > inputArray[k]) k++;
				if (inputArray[k] > t) {
					inputArray[j] = inputArray[k];
					j = k;
					k = j * 2 + 1;
				} else {
					break;
				}
			}
			inputArray[j] = t;
		}
	}
	/**
	 * Быстрая сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	quick(inputArray: number[]): number[] {
		if (inputArray.length <= 1) {
			return inputArray;
		}
		const a = [],
			b = [],
			p = inputArray[0];
		for (let i = 1; i < inputArray.length; i++) {
			if (inputArray[i] < p) a[a.length] = inputArray[i];
			else b[b.length] = inputArray[i];
		}
		return this.quick(a).concat(p, this.quick(b));
	}
	/**
	 * Сортировка перемешиванием
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	shaker(inputArray: number[]): number[] {
		let i = 0,
			j = inputArray.length - 1,
			s = true,
			t;
		while (i < j && s) {
			s = false;
			for (let k = i; k < j; k++) {
				if (inputArray[k] > inputArray[k + 1]) {
					t = inputArray[k];
					inputArray[k] = inputArray[k + 1];
					inputArray[k + 1] = t;
					s = true;
				}
			}
			j--;
			if (s) {
				s = false;
				for (let k = j; k > i; k--) {
					if (inputArray[k] < inputArray[k - 1]) {
						t = inputArray[k];
						inputArray[k] = inputArray[k - 1];
						inputArray[k - 1] = t;
						s = true;
					}
				}
			}
			i++;
		}
		return inputArray;
	}
	/**
	 * Гномья сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	gnome(inputArray: number[]): number[] {
		const n = inputArray.length;
		let i = 1;
		let j = 2;
		while (i < n) {
			if (inputArray[i - 1] < inputArray[i]) {
				i = j;
				j++;
			} else {
				const t = inputArray[i - 1];
				inputArray[i - 1] = inputArray[i];
				inputArray[i] = t;
				i--;
				if (i == 0) {
					i = j;
					j++;
				}
			}
		}
		return inputArray;
	}
	/**
	 * Натуральная сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	naturalStringSorter(inputArray: number[]): number[] {
		return naturalStringSorter(inputArray, function (element: number): string {
			return element.toString();
		});
	}
	/**
	 * Сравнивает все методы сортировок
	 * @param inputArray {Array} - массив с числами, либо число из которого нужно сгенерировать массив
	 * @returns {Object} benchmark - Объект с выполнеными тестами
	 */
	benchmark(input: number[] | number): SortingBenchmarkResponse {
		let inputArray: number[] = [];
		if (Number.isInteger(input) === true) {
			inputArray = Array.from({ length: Number(input) }, () =>
				Math.floor(Math.random() * Number(input)),
			);
		} else if (Array.isArray(input)) {
			inputArray = input;
		}

		const sortingAlgorithms: sortingAlgorithm[] = [
			"bubble",
			"selection",
			"insertion",
			"Shell",
			"simpleCounting",
			"comb",
			"merge",
			"heap",
			"quick",
			"shaker",
			"gnome",
			"naturalStringSorter",
		];

		const response: SortingBenchmarkResponse = {
			fastest: {
				algorithm: "Shell",
				rate: Number.MAX_VALUE,
			},
			slowest: {
				algorithm: "Shell",
				rate: 0,
			},
			summary: {
				bubble: 0,
				selection: 0,
				insertion: 0,
				Shell: 0,
				simpleCounting: 0,
				comb: 0,
				merge: 0,
				heap: 0,
				quick: 0,
				shaker: 0,
				gnome: 0,
				naturalStringSorter: 0,
			},
			totalTime: 0,
			sourceArray: inputArray,
			sortedArray: [],
		};

		for (const algorithm of sortingAlgorithms) {
			const sortStart = performance.now();
			response.sortedArray = this[algorithm](inputArray);
			response.summary[algorithm] = performance.now() - sortStart;
		}

		let tempKey: sortingAlgorithm;

		for (tempKey in response.summary) {
			if (response.fastest.rate > response.summary[tempKey]) {
				response.fastest.algorithm = tempKey;
				response.fastest.rate = response.summary[tempKey];
			}
			if (response.slowest.rate < response.summary[tempKey]) {
				response.slowest.algorithm = tempKey;
				response.slowest.rate = response.summary[tempKey];
			}
			response.totalTime += response.summary[tempKey];
		}

		return response;
	}

	public static getInstance(): NumberArraysSort {
		if (!NumberArraysSort.instance) {
			NumberArraysSort.instance = new NumberArraysSort();
		}
		return NumberArraysSort.instance;
	}
}

class NumberArrays {
	private static instance: NumberArrays;
	/**
	 * @hideconstructor
	 */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

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

	/**
	 * Функции сортировки числовых массивов
	 * @memberof NumberArraysSort
	 */
	public static sort = NumberArraysSort.getInstance();

	public static getInstance(): NumberArrays {
		if (!NumberArrays.instance) {
			NumberArrays.instance = new NumberArrays();
		}
		return NumberArrays.instance;
	}
}

const number = NumberArrays.getInstance();

export {
	random,
	splitOn,
	splitTo,
	shuffle,
	insert,
	removeEmptyElements,
	naturalStringSorter,
	number,
};

function __naturalSortingCompare(a: number, b: number) {
	return a < b ? -1 : a > b ? 1 : 0;
}