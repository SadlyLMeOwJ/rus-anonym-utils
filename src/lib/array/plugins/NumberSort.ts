/* eslint-disable jsdoc/require-example */

import {
	ISortingBenchmarkResponse,
	TSortingAlgorithm,
	TComparisonOperators,
} from "../types";

import { performance } from "perf_hooks";

import CloneClass from "./Clone";

import naturalStringSorter from "../lib/naturalStringSorter";

const Clone = new CloneClass();

/**
 * @category Array
 * @description Класс для сортировки числовых массивов
 * @hideconstructor
 */
class NumberArraySort {
	private __operators: Record<
		TComparisonOperators,
		(x: number, y: number) => boolean
	> = {
		">": (x: number, y: number): boolean => x > y,
		"<": (x: number, y: number): boolean => x < y,
	};

	/**
	 * @description Пузырьковая сортировка
	 * @param {Array.<number>} inputArray массив с числами
	 * @param {string=} operator Оператор сравнения
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public bubble(
		inputArray: number[],
		operator?: TComparisonOperators,
	): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		for (let i = 0, endI = inputArray.length - 1; i < endI; i++) {
			for (let j = 0, endJ = endI - i; j < endJ; j++) {
				if (
					this.__operators[operator || ">"](inputArray[j], inputArray[j + 1])
				) {
					const currentElement = inputArray[j];
					inputArray[j] = inputArray[j + 1];
					inputArray[j + 1] = currentElement;
				}
			}
		}
		return inputArray;
	}

	/**
	 * @description Сортировка выбором
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public selection(inputArray: number[]): number[] {
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
	 * @description Сортировка вставками
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public insertion(inputArray: number[]): number[] {
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
	 * @description Сортировка Шелла
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public Shell(inputArray: number[]): number[] {
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
	 * @description Сортировка подсчётом
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public simpleCounting(inputArray: number[]): number[] {
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
	 * @description Сортировка расчёской
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public comb(inputArray: number[]): number[] {
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
	 * @description Сортировка слиянием
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public merge(inputArray: number[]): number[] {
		inputArray = ([] as number[]).concat(inputArray);
		if (inputArray.length <= 1) {
			return inputArray;
		}
		const middle = Math.floor(inputArray.length / 2);
		const arrLeft = inputArray.slice(0, middle);
		const arrRight = inputArray.slice(middle);

		// eslint-disable-next-line jsdoc/require-jsdoc
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
	 * @description Пирамидальная сортировка
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public heap(inputArray: number[]): number[] {
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
	 * @description Быстрая сортировка
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public quick(inputArray: number[]): number[] {
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
	 * @description Сортировка перемешиванием
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public shaker(inputArray: number[]): number[] {
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
	 * @description Гномья сортировка
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public gnome(inputArray: number[]): number[] {
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
	 * @description Натуральная сортировка
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Array.<number>} отсортированный массив с числами
	 */
	public naturalStringSorter(inputArray: number[]): number[] {
		return naturalStringSorter(inputArray, function (element: number): string {
			return element.toString();
		});
	}

	/**
	 * @description Сравнивает все методы сортировок
	 * @param {Array.<number>} inputArray массив с числами
	 * @returns {Object} benchmark - Объект с выполнеными тестами
	 */
	public benchmark(inputArray: number[]): ISortingBenchmarkResponse {
		const sortingAlgorithms: TSortingAlgorithm[] = [
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

		const response: ISortingBenchmarkResponse = {
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
			response.sortedArray = this[algorithm](Clone.concat(inputArray));
			response.summary[algorithm] = performance.now() - sortStart;
		}

		let tempKey: TSortingAlgorithm;

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
}

export default NumberArraySort;
