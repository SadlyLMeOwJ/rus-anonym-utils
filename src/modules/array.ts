import * as number from "./number";

async function random(array: Array<any>) {
	return array[await number.getRandomInt(array.length - 1, array.length)];
}

export { random };
