import { getRandomIntInclusive } from "./number";

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
		return element != null;
	});
}

const number = {
	min: function (inputArray: number[]): number {
		return Math.min.apply(null, inputArray);
	},
	max: function (inputArray: number[]): number {
		return Math.max.apply(null, inputArray);
	},
	average: function (inputArray: number[]): number {
		return inputArray.reduce((a, b) => a + b) / inputArray.length;
	},
};

export { random, splitOn, splitTo, shuffle, removeEmptyElements, number };
