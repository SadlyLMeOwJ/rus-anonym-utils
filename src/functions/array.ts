/**
 * @module Array
 * @description Функции для работы с массивами
 */

import { getRandomIntInclusive } from "./number";
import { XOR } from "./logical";
import { performance } from "perf_hooks";

import {
	sortingAlgorithm,
	cloneMethod,
	SortingBenchmarkResponse,
	CloneBenchmarkResponse,
} from "../types/array";

/**
 * Возвращает рандомный элемент из массива
 * @param inputArray {Array} - массив
 * @returns элемент из массива
 *
 * @example
 * // Return 2
 * array.random([1, 2, 3, 4]);
 */
function random<T>(inputArray: T[]): T {
	return inputArray[getRandomIntInclusive(0, inputArray.length - 1)];
}

/**
 * Убирает пустые элементы из массива
 * @param inputArray {Array} - массив
 * @param chunks - общее количество чанков, которое должно получиться
 * @returns отсортированный массив
 *
 * @example
 * // Return [[1, 2], [3]]
 * array.splitOn([1, 2, 3], 2);
 */
function splitOn<T>(array: T[], chunks: number): Array<T[]> {
	return array.reduce(
		(acc, n, i) => (
			((acc[i % chunks] = acc[i % chunks] || []) as T[]).push(n), acc
		),
		[],
	);
}

/**
 * Режет массив по чанкам
 * @param inputArray {Array} - массив
 * @param elementsInChunk - количество элементов в одном чанке
 * @returns отсортированный массив
 *
 * @example
 * // Return [[1], [2], [3]]
 * array.splitTo([1, 2, 3], 3);
 */
function splitTo<T>(array: T[], elementsInChunk: number) {
	let i,
		j,
		tmp: Array<T[]> = [];

	for (i = 0, j = array.length; i < j; i += elementsInChunk) {
		tmp.push(array.slice(i, i + elementsInChunk));
	}

	return tmp;
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
	let outputArray = inputArray.concat();
	for (let i = outputArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
	}
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
 * @param {Function=} extractor - Функция переводящая элемент из массива в строку
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
function naturalStringSorter<T>(array: T[], extractor?: Function): T[] {
	function createSplitter(item: any) {
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
		source: any;
		private key: string;
		private elements: any[] = [];
		private currentIndex: number = 0;
		private fromIndex: number = 0;
		private completed: boolean = false;
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
			let code = char.charCodeAt(0);
			return code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0);
		}
		private parseString() {
			if (this.currentIndex < this.key.length) {
				while (++this.currentIndex) {
					var currentIsDigit = this.isNumber(
						this.key.charAt(this.currentIndex - 1),
					);
					var nextChar = this.key.charAt(this.currentIndex);
					var currentIsLast = this.currentIndex === this.key.length;

					var isBorder =
						currentIsLast || XOR(currentIsDigit, this.isNumber(nextChar));
					if (isBorder) {
						var partStr = this.key.slice(this.fromIndex, this.currentIndex);
						this.elements.push(new elementsPart(partStr, currentIsDigit));
						this.fromIndex = this.currentIndex;
						break;
					}
				}
			} else {
				this.completed = true;
			}
		}
		constructor(item: any) {
			this.source = item;
			this.key = typeof extractor === "function" ? extractor(item) : item;
		}
	}

	let splittersArray = array.map(createSplitter);
	let sortedSplittersArray = splittersArray.sort(
		(sp1: Splitter, sp2: Splitter) => {
			let i = 0;
			do {
				let first = sp1.processElement(i);
				let second = sp2.processElement(i);
				function compare(a: number, b: number) {
					return a < b ? -1 : a > b ? 1 : 0;
				}
				if (null !== first && null !== second) {
					if (XOR(first.isNumber, second.isNumber)) {
						return first.isNumber ? -1 : 1;
					} else {
						let comp = compare(first.value, second.value);
						if (comp != 0) {
							return comp;
						}
					}
				} else {
					return compare(sp1.findElements(), sp2.findElements());
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
 * Функции для клонирования массивов
 * @namespace
 */
const clone: {
	slice: <T extends any[]>(inputArray: T) => T[];
	concat: <T extends any[]>(inputArray: T) => T[];
	unshift: <T extends any[]>(inputArray: T) => T[];
	push: <T extends any[]>(inputArray: T) => T[];
	index: <T extends any[]>(inputArray: T) => T[];
	apply: <T extends any[]>(inputArray: T) => T[];
	map: <T extends any[]>(inputArray: T) => T[];
	json: <T extends any[]>(inputArray: T) => T[];
	spread: <T extends any[]>(inputArray: T) => T[];
	from: <T extends any[]>(inputArray: T) => T[];
	recursionDeep: <T extends any[]>(inputArray: T) => T[];
	benchmark: <T extends any[]>(
		inputArray: T | number,
	) => CloneBenchmarkResponse;
} = {
	/**
	 * Клонирование массива с помощью slice
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	slice: function <T extends any[]>(inputArray: T) {
		return inputArray.slice() as T;
	},
	/**
	 * Клонирование массива с помощью concat
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	concat: function <T extends any[]>(inputArray: T) {
		return ([] as any).concat(inputArray) as T;
	},
	/**
	 * Клонирование массива с помощью unshift
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	unshift: function <T extends any[]>(inputArray: T) {
		let output: T[] = [];
		for (let i = inputArray.length; i--; ) {
			output.unshift(inputArray[i]);
		}
		return output;
	},
	/**
	 * Клонирование массива с помощью push
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	push: function <T extends any[]>(inputArray: T) {
		let output: any[] = [];
		for (let i = 0, l = inputArray.length; i < l; i++) {
			output.push(inputArray[i]);
		}
		return output as T;
	},
	/**
	 * Клонирование массива с помощью index
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	index: function <T extends any[]>(inputArray: T) {
		let output: any[] = new Array(inputArray.length);
		for (let i = 0, l = inputArray.length; i < l; i++) {
			output[i] = inputArray[i];
		}
		return output as T;
	},
	/**
	 * Клонирование массива с помощью apply
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	apply: function <T extends any[]>(inputArray: T) {
		return Array.apply(undefined, inputArray) as T;
	},
	/**
	 * Клонирование массива с помощью map
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	map: function <T extends any[]>(inputArray: T) {
		return inputArray.map(function (element) {
			return element as T;
		});
	},
	/**
	 * Клонирование массива с помощью JSON
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	json: function <T extends any[]>(inputArray: T) {
		return JSON.parse(JSON.stringify(inputArray)) as T;
	},
	/**
	 * Клонирование массива с помощью spread
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	spread: function <T extends any[]>(inputArray: T) {
		return [...inputArray] as T;
	},
	/**
	 * Клонирование массива с помощью Array.from
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	from: function <T extends any[]>(inputArray: T) {
		return Array.from([inputArray]) as T;
	},
	/**
	 * Рекурсивное глубокое копирование массива (копирует подмассив)
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	recursionDeep: function <T>(inputArray: T[]): T[] {
		let output: any = inputArray.map((element: T | T[]) => {
			return Array.isArray(element)
				? clone.recursionDeep(element)
				: (element as T);
		});
		return output;
	},
	/**
	 * Сравнивает все методы копирования
	 * @param inputArray {Array} - массив
	 * @returns {Object} benchmark - Объект с выполнеными тестами
	 */
	benchmark: function (input: number | any[]): CloneBenchmarkResponse {
		let inputArray: number[] = [];
		if (Number.isInteger(input) === true) {
			inputArray = Array.from({ length: Number(input) }, () =>
				Math.floor(Math.random() * Number(input)),
			);
		} else if (Array.isArray(input)) {
			inputArray = input;
		}

		let cloneMethods: cloneMethod[] = [
			"slice",
			"concat",
			"unshift",
			"push",
			"index",
			"apply",
			"map",
			"json",
			"spread",
			"from",
			"recursionDeep",
		];

		let response: CloneBenchmarkResponse = {
			fastest: {
				method: "slice",
				rate: Number.MAX_VALUE,
			},
			slowest: {
				method: "slice",
				rate: 0,
			},
			summary: {
				slice: 0,
				concat: 0,
				unshift: 0,
				push: 0,
				index: 0,
				apply: 0,
				map: 0,
				json: 0,
				spread: 0,
				from: 0,
				recursionDeep: 0,
			},
			totalTime: 0,
			sourceArray: inputArray,
			copiedArray: [],
		};

		for (let method of cloneMethods) {
			let sortStart = performance.now();
			//@ts-ignore
			response.copiedArray = clone[method](inputArray);
			response.summary[method] = performance.now() - sortStart;
		}

		let tempKey: cloneMethod;

		for (tempKey in response.summary) {
			if (response.fastest.rate > response.summary[tempKey]) {
				response.fastest.method = tempKey;
				response.fastest.rate = response.summary[tempKey];
			}
			if (response.slowest.rate < response.summary[tempKey]) {
				response.slowest.method = tempKey;
				response.slowest.rate = response.summary[tempKey];
			}
			response.totalTime += response.summary[tempKey];
		}

		return response;
	},
};

const number = {
	/**
	 * Вывод минимального значения в массиве
	 * @param inputArray {Array} - массив с числами
	 * @returns - минимальное значение
	 */
	min: function (inputArray: number[]): number {
		return Math.min.apply(null, inputArray);
	},
	/**
	 * Вывод максимального значения в массиве
	 * @param inputArray {Array} - массив с числами
	 * @returns максимальное значение
	 */
	max: function (inputArray: number[]): number {
		return Math.max.apply(null, inputArray);
	},
	/**
	 * Вывод среднего значения в массиве
	 * @param inputArray {Array} - массив с числами
	 * @returns среднее значение
	 */
	average: function (inputArray: number[]): number {
		return inputArray.reduce((a, b) => a + b) / inputArray.length;
	},
	/**
	 * Функции сортировки числовых массивов
	 */
	sort: {
		/**
		 * Пузырьковая сортировка
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		bubble: function (inputArray: number[]): number[] {
			inputArray = ([] as number[]).concat(inputArray);
			if (inputArray.length <= 1) {
				return inputArray;
			}
			for (let i = 0, endI = inputArray.length - 1; i < endI; i++) {
				for (let j = 0, endJ = endI - i; j < endJ; j++) {
					if (inputArray[j] > inputArray[j + 1]) {
						let currentElement = inputArray[j];
						inputArray[j] = inputArray[j + 1];
						inputArray[j + 1] = currentElement;
					}
				}
			}
			return inputArray;
		},
		/**
		 * Сортировка выбором
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		selection: function (inputArray: number[]): number[] {
			inputArray = ([] as number[]).concat(inputArray);
			if (inputArray.length <= 1) {
				return inputArray;
			}
			let arrayLength = inputArray.length;
			for (let i = 0; i < arrayLength - 1; i++) {
				let min = i;
				for (let j = i + 1; j < arrayLength; j++) {
					if (inputArray[j] < inputArray[min]) {
						min = j;
					}
				}
				let t = inputArray[min];
				inputArray[min] = inputArray[i];
				inputArray[i] = t;
			}
			return inputArray;
		},
		/**
		 * Сортировка вставками
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		insertion: function (inputArray: number[]): number[] {
			inputArray = ([] as number[]).concat(inputArray);
			if (inputArray.length <= 1) {
				return inputArray;
			}
			let n = inputArray.length;
			for (let i = 0; i < n; i++) {
				let v = inputArray[i],
					j = i - 1;
				while (j >= 0 && inputArray[j] > v) {
					inputArray[j + 1] = inputArray[j];
					j--;
				}
				inputArray[j + 1] = v;
			}
			return inputArray;
		},
		/**
		 * Сортировка Шелла
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		Shell: function (inputArray: number[]): number[] {
			inputArray = ([] as number[]).concat(inputArray);
			if (inputArray.length <= 1) {
				return inputArray;
			}
			let n = inputArray.length,
				i = Math.floor(n / 2);
			while (i > 0) {
				for (let j = 0; j < n; j++) {
					let k = j,
						t = inputArray[j];
					while (k >= i && inputArray[k - i] > t) {
						inputArray[k] = inputArray[k - i];
						k -= i;
					}
					inputArray[k] = t;
				}
				i = i == 2 ? 1 : Math.floor((i * 5) / 11);
			}
			return inputArray;
		},
		/**
		 * Сортировка подсчётом
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		simpleCounting: function (inputArray: number[]): number[] {
			if (inputArray.length <= 1) {
				return inputArray;
			}
			let n = inputArray.length,
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
		},
		/**
		 * Сортировка расчёской
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		comb: function (inputArray: number[]): number[] {
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
		},
		/**
		 * Сортировка слиянием
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		merge: function (inputArray: number[]): number[] {
			inputArray = ([] as number[]).concat(inputArray);
			if (inputArray.length <= 1) {
				return inputArray;
			}
			const middle = Math.floor(inputArray.length / 2);
			const arrLeft = inputArray.slice(0, middle);
			const arrRight = inputArray.slice(middle);

			function mergeArray(
				firstArray: number[],
				secondArray: number[],
			): number[] {
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
		},
		/**
		 * Пирамидальная сортировка
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		heap: function (inputArray: number[]): number[] {
			inputArray = ([] as number[]).concat(inputArray);
			if (inputArray.length <= 1) {
				return inputArray;
			}
			let n = inputArray.length,
				i = Math.floor(n / 2),
				j,
				k,
				t;
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
		},
		/**
		 * Быстрая сортировка
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		quick: function (inputArray: number[]): number[] {
			if (inputArray.length <= 1) {
				return inputArray;
			}
			let a = [],
				b = [],
				p = inputArray[0];
			for (let i = 1; i < inputArray.length; i++) {
				if (inputArray[i] < p) a[a.length] = inputArray[i];
				else b[b.length] = inputArray[i];
			}
			return this.quick(a).concat(p, this.quick(b));
		},
		/**
		 * Сортировка перемешиванием
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		shaker: function (inputArray: number[]): number[] {
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
		},
		/**
		 * Гномья сортировка
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		gnome: function (inputArray: number[]): number[] {
			let n = inputArray.length,
				i = 1,
				j = 2;
			while (i < n) {
				if (inputArray[i - 1] < inputArray[i]) {
					i = j;
					j++;
				} else {
					let t = inputArray[i - 1];
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
		},
		/**
		 * Натуральная сортировка
		 * @param inputArray {Array} - массив с числами
		 * @returns отсортированный массив с числами
		 */
		naturalStringSorter: function (inputArray: number[]): number[] {
			return naturalStringSorter(inputArray, function (element: number) {
				return element.toString();
			});
		},
		/**
		 * Сравнивает все методы сортировок
		 * @param inputArray {Array} - массив с числами, либо число из которого нужно сгенерировать массив
		 * @returns {Object} benchmark - Объект с выполнеными тестами
		 */
		benchmark: function (input: number[] | number): SortingBenchmarkResponse {
			let inputArray: number[] = [];
			if (Number.isInteger(input) === true) {
				inputArray = Array.from({ length: Number(input) }, () =>
					Math.floor(Math.random() * Number(input)),
				);
			} else if (Array.isArray(input)) {
				inputArray = input;
			}

			let sortingAlgorithms: sortingAlgorithm[] = [
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

			let response: SortingBenchmarkResponse = {
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

			for (let algorithm of sortingAlgorithms) {
				let sortStart = performance.now();
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
		},
	},
};

export {
	random,
	splitOn,
	splitTo,
	shuffle,
	removeEmptyElements,
	naturalStringSorter,
	number,
	clone,
};
