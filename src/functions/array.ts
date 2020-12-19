import { getRandomIntInclusive } from "./number";
import { XOR } from "./logical";
import { performance } from "perf_hooks";

type sortingAlgorithm =
	| "bubble"
	| "selection"
	| "insertion"
	| "Shell"
	| "simpleCounting"
	| "comb"
	| "merge"
	| "heap"
	| "quick"
	| "shaker"
	| "gnome";

interface benchmarkResponse {
	fastest: {
		algorithm: sortingAlgorithm;
		rate: number;
	};
	slowest: {
		algorithm: sortingAlgorithm;
		rate: number;
	};
	summary: Record<sortingAlgorithm, number>;
	totalTime: number;
	sortedArray: number[];
}

function random(array: any[]) {
	return array[getRandomIntInclusive(0, array.length - 1)];
}

function splitOn(array: any[], chunks: number): any[] {
	return array.reduce(
		(acc, n, i) => ((acc[i % chunks] = acc[i % chunks] || []).push(n), acc),
		[],
	);
}

function splitTo(array: any[], elementsInChunk: number): any[] {
	let i,
		j,
		tmp = [];

	for (i = 0, j = array.length; i < j; i += elementsInChunk) {
		tmp.push(array.slice(i, i + elementsInChunk));
	}

	return tmp;
}

function shuffle(inputArray: any[]): any[] {
	let outputArray = inputArray.concat();
	for (let i = outputArray.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[outputArray[i], outputArray[j]] = [outputArray[j], outputArray[i]];
	}
	return outputArray;
}

function removeEmptyElements(inputArray: any[]): any[] {
	return inputArray.filter(function (element) {
		return element !== null;
	});
}

/**
 * Естественная сортировка строк
 * @param {Array} array - Массив который требуется отсортировать
 * @param {Function=} extractor - Функция переводящая элемент из массива в строку
 * @example
 * // Return [1, 2, 3]
 * universalStringSorter([1, 3, 2], function (element) {
 * 	element.toString()
 * });
 * // Return [1, 3, 2]
 * universalStringSorter([1, 3, 2]);
 * @return {Array} Отсортированный массив
 */
function naturalStringSorter(array: any[], extractor?: Function) {
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

const number = {
	/**
	 * Вывод минимального значения в массиве
	 * @param inputArray - массив с числами
	 * @return - минимальное значение
	 */
	min: function (inputArray: number[]): number {
		return Math.min.apply(null, inputArray);
	},
	/**
	 * Вывод максимального значения в массиве
	 * @param inputArray - массив с числами
	 * @return максимальное значение
	 */
	max: function (inputArray: number[]): number {
		return Math.max.apply(null, inputArray);
	},
	/**
	 * Вывод среднего значения в массиве
	 * @param inputArray - массив с числами
	 * @return среднее значение
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * @param inputArray - массив с числами
		 * @return отсортированный массив с числами
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
		 * Сравнивает все методы сортировок
		 * @param inputArray - массив с числами, либо число из которого нужно сгенерировать массив
		 * @returns {Object} benchmark - Объект с выполнеными тестами
		 */
		benchmark: function (input: number[] | number): benchmarkResponse {
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
			];

			let response: benchmarkResponse = {
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
				},
				totalTime: 0,
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
};
