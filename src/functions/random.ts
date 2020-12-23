/**
 * @module Random
 * @deprecated
 */

import * as array from "./array";

function generatePercentsArray(
	inputArray: Array<{
		element: any;
		possibility: number;
	}>,
): Array<any> {
	let outputArray: Array<any> = [];
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

function getRandomElementByPercents(
	inputArray: Array<{
		element: any;
		possibility: number;
	}>,
): any {
	return array.random(generatePercentsArray(inputArray));
}

export { generatePercentsArray, getRandomElementByPercents };
