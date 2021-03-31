import { SortingBenchmarkResponse, sortingAlgorithm } from "../types";

import core from "../core";

import { performance } from "perf_hooks";

import Clone from "./Clone";

class NumberSort {
	/**
	 * Пузырьковая сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	public bubble(inputArray: number[]): number[] {
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
	 * Сортировка вставками
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
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
	 * Сортировка Шелла
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
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
	 * Сортировка подсчётом
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
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
	 * Сортировка расчёской
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
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
	 * Сортировка слиянием
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	public merge(inputArray: number[]): number[] {
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
	 * Быстрая сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
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
	 * Сортировка перемешиванием
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
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
	 * Гномья сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
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
	 * Натуральная сортировка
	 * @param inputArray {Array} - массив с числами
	 * @returns отсортированный массив с числами
	 */
	public naturalStringSorter(inputArray: number[]): number[] {
		return new core().naturalStringSorter(
			inputArray,
			function (element: number): string {
				return element.toString();
			},
		);
	}

	/**
	 * Сравнивает все методы сортировок
	 * @param inputArray {Array} - массив с числами, либо число из которого нужно сгенерировать массив
	 * @returns {Object} benchmark - Объект с выполнеными тестами
	 */
	public benchmark(input: number[] | number): SortingBenchmarkResponse {
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
			response.sortedArray = this[algorithm](new Clone().concat(inputArray));
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
}

export default NumberSort;
