import { logical } from "../../logical/core";

/**
 * @param a
 * @param b
 */
function __naturalSortingCompare(a: number, b: number) {
	return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * @param array
 * @param extractor
 */
export default function naturalStringSorter<T>(
	array: T[],
	extractor?: (input: T) => string,
): T[] {
	/**
	 * @param item
	 */
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
		public source: T;
		private key: string;
		private elements: elementsPart[] = [];
		private currentIndex = 0;
		private fromIndex = 0;
		private completed = false;

		constructor(item: T) {
			this.source = item;
			this.key =
				typeof extractor === "function" ? extractor(item) : String(item);
		}

		get elementsCount() {
			return this.elements.length;
		}

		public processElement(elementIndex: number) {
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
						logical.XOR(currentIsDigit, this.isNumber(nextChar));
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
	}

	const splittersArray = array.map(createSplitter);
	const sortedSplittersArray = splittersArray.sort(
		(sp1: Splitter, sp2: Splitter) => {
			let i = 0;
			do {
				const first = sp1.processElement(i);
				const second = sp2.processElement(i);

				if (null !== first && null !== second) {
					if (logical.XOR(first.isNumber, second.isNumber)) {
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
						sp1.elementsCount,
						sp2.elementsCount,
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
