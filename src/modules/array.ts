import * as number from "./number";

async function random(array: Array<any>) {
	return array[await number.getRandomInt(0, array.length - 1)];
}

export { random };
