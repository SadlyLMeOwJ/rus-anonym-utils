import * as number from "./number";

async function random(array: Array<any>) {
	return array[await number.getRandomIntInclusive(0, array.length - 1)];
}

async function splitOn(array: Array<any>, chunks: number) {
	return array.reduce(
		(acc, n, i) => ((acc[i % chunks] = acc[i % chunks] || []).push(n), acc),
		[],
	);
}

async function splitTo(array: Array<any>, elementsInChunk: number) {
	var i,
		j,
		tmp = [];
	for (i = 0, j = array.length; i < j; i += elementsInChunk) {
		tmp.push(array.slice(i, i + elementsInChunk));
	}
	return tmp;
}

export { random, splitOn, splitTo };
