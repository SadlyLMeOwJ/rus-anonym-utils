import { getRandom } from "./random";

export function random(array: any[]) {
	return array[getRandom(0, array.length - 1, {
		inclusive: true,
		round: true
	})];
}

export function splitOn(array: any[], chunks: number): any {
	return array.reduce(
		(acc, n, i) => ((acc[i % chunks] = acc[i % chunks] || []).push(n), acc),
		[],
	);
}

export function splitTo(array: any[], elementsInChunk: number): any[] {
	let i, j, tmp = [];

	for (i = 0, j = array.length; i < j; i += elementsInChunk) {
		tmp.push(array.slice(i, i + elementsInChunk));
	}

	return tmp;
}