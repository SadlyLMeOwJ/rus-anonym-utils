/**
 * @module Random
 * @deprecated
 */

import * as array from "./array";

function generatePercentsArray<T>(
	inputArray: Array<{
		element: T;
		possibility: number;
	}>,
): Array<T> {
	const outputArray: Array<T> = [];
	inputArray.map(function (element) {
		for (let i = 0; i < element.possibility; i++) {
			outputArray.push(element.element);
		}
	});
	if (outputArray.length !== 100) {
		throw new Error(`You must specify all 100%`);
	} else {
		return array.shuffle(outputArray);
	}
}

function getRandomElementByPercents<T>(
	inputArray: Array<{
		element: T;
		possibility: number;
	}>,
): T {
	return array.random(generatePercentsArray(inputArray));
}

export { generatePercentsArray, getRandomElementByPercents };
