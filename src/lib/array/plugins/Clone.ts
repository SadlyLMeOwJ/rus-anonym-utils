import { cloneMethod, CloneBenchmarkResponse } from "../../../types/array";

/**
 * Класс для работы с методами клонирования массивов
 * @example
 * const utils = require(`rus-anonym-utils`);
 * utils.array.clone
 */
class Clone {
	/**
	 * @hideconstructor
	 */
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private constructor() {}

	/**
	 * Клонирование массива с помощью slice
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public static slice<T>(inputArray: T[]): T[] {
		return inputArray.slice() as T[];
	}

	/**
	 * Клонирование массива с помощью concat
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public static concat<T>(inputArray: T[]): T[] {
		return ([] as T[]).concat(inputArray) as T[];
	}

	/**
	 * Клонирование массива с помощью unshift
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public static unshift<T>(inputArray: T[]): T[] {
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
	public static push<T>(inputArray: T[]): T[] {
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
	public static index<T>(inputArray: T[]): T[] {
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
	public static apply<T>(inputArray: T[]): T[] {
		// eslint-disable-next-line prefer-spread
		return Array.apply(undefined, inputArray) as T[];
	}

	/**
	 * Клонирование массива с помощью map
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public static map<T>(inputArray: T[]): T[] {
		return inputArray.map(function (element) {
			return element;
		});
	}

	/**
	 * Клонирование массива с помощью JSON
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public static json<T>(inputArray: T[]): T[] {
		return JSON.parse(JSON.stringify(inputArray)) as T[];
	}

	/**
	 * Клонирование массива с помощью spread
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public static spread<T>(inputArray: T[]): T[] {
		return [...inputArray] as T[];
	}

	/**
	 * Клонирование массива с помощью Array.from
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public static from<T>(inputArray: T[]): T[] {
		return Array.from(inputArray) as T[];
	}

	/**
	 * Рекурсивное глубокое копирование массива (копирует подмассив)
	 * @param inputArray {Array} - массив
	 * @returns новый массив
	 */
	public static recursionDeep<T>(inputArray: T[]): T[] {
		const output = inputArray.map((element: T | T[]) => {
			return this.__recursionDeepCopy(element);
		});
		return output as T[];
	}

	private static __recursionDeepCopy<T>(inputArray: T | T[]): T | T[] {
		return Array.isArray(inputArray)
			? this.__recursionDeepCopy(inputArray)
			: (inputArray as T);
	}

	/**
	 * Сравнивает все методы копирования
	 * @param inputArray {Array} - массив
	 * @returns {Object} benchmark - Объект с выполнеными тестами
	 */
	public static benchmark<T>(input: number | T[]): CloneBenchmarkResponse<T> {
		let inputArray: number[] | T[] = [];
		if (Number.isInteger(input) === true) {
			inputArray = Array.from({ length: Number(input) }, () =>
				Math.floor(Math.random() * Number(input)),
			);
		} else if (Array.isArray(input)) {
			inputArray = input;
		}

		const cloneMethods: cloneMethod[] = [
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
			sourceArray: inputArray,
			copiedArray: [],
		};

		for (const method of cloneMethods) {
			const sortStart = performance.now();
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
	}
}

export default Clone;
