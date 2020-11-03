import { getRandomIntInclusive } from "./random";

function random(array: any[]) {
	return array[getRandomIntInclusive(0, array.length - 1)];
}

function splitOn(array: any[], chunks: number): any {
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

function shuffle(array: Array<any>) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export { random, splitOn, splitTo, shuffle };
