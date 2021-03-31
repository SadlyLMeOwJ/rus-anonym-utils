import { cloneMethod, CloneBenchmarkResponse } from "../types";

import { performance } from "perf_hooks";

class Clone {
	private methods: cloneMethod[] = [
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

	/**
	 * Клонирование массива с помощью slice
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public slice<T>(inputArray: T[]): T[] {
		return inputArray.slice() as T[];
	}

	/**
	 * Клонирование массива с помощью concat
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public concat<T>(inputArray: T[]): T[] {
		return ([] as T[]).concat(inputArray) as T[];
	}

	/**
	 * Клонирование массива с помощью unshift
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public unshift<T>(inputArray: T[]): T[] {
		const output: T[] = [];
		for (let i = inputArray.length; i--; ) {
			output.unshift(inputArray[i]);
		}
		return output;
	}

	/**
	 * Клонирование массива с помощью push
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public push<T>(inputArray: T[]): T[] {
		const output: T[] = [];
		for (let i = 0, l = inputArray.length; i < l; i++) {
			output.push(inputArray[i]);
		}
		return output;
	}

	/**
	 * Клонирование массива с помощью index
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public index<T>(inputArray: T[]): T[] {
		const output: T[] = new Array(inputArray.length);
		for (let i = 0, l = inputArray.length; i < l; i++) {
			output[i] = inputArray[i];
		}
		return output as T[];
	}

	/**
	 * Клонирование массива с помощью apply
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public apply<T>(inputArray: T[]): T[] {
		// eslint-disable-next-line prefer-spread
		return Array.apply(undefined, inputArray) as T[];
	}

	/**
	 * Клонирование массива с помощью map
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public map<T>(inputArray: T[]): T[] {
		return inputArray.map(function (element) {
			return element;
		});
	}

	/**
	 * Клонирование массива с помощью JSON
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public json<T>(inputArray: T[]): T[] {
		return JSON.parse(JSON.stringify(inputArray)) as T[];
	}

	/**
	 * Клонирование массива с помощью spread
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public spread<T>(inputArray: T[]): T[] {
		return [...inputArray] as T[];
	}

	/**
	 * Клонирование массива с помощью Array.from
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public from<T>(inputArray: T[]): T[] {
		return Array.from(inputArray) as T[];
	}

	/**
	 * Рекурсивное глубокое копирование массива (копирует подмассив)
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public recursionDeep<T>(inputArray: T[]): T[] {
		const output = inputArray.map((element: T | T[]) => {
			return this.__recursionDeepCopy(element);
		});
		return output as T[];
	}

	private __recursionDeepCopy<T>(inputArray: T | T[]): T | T[] {
		return Array.isArray(inputArray)
			? this.__recursionDeepCopy(inputArray)
			: (inputArray as T);
	}

	/**
	 * Сравнивает все методы копирования
	 * @param inputArray {Array} - массив
	 * @returns {Object} benchmark - Объект с выполнеными тестами
	 */
	public benchmark<T>(input: T[]): CloneBenchmarkResponse<T> {
		const response: CloneBenchmarkResponse<T> = {
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
			sourceArray: input,
			copiedArray: [],
		};

		for (const method of this.methods) {
			const sortStart = performance.now();

			response.copiedArray = this[method](input);
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
	}

	/**
	 * Выполняет копирование наиболее быстрым методом (не всегда корректно работает)
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public faster<T>(input: T[]): Promise<T[]> {
		return new Promise((resolve) => {
			Promise.race(
				this.methods.map((method) => {
					return new Promise((raceResolver) => {
						raceResolver(this[method](input));
					});
				}),
			).then((value) => {
				return resolve(value as T[]);
			});
		});
	}
}

export default Clone;
