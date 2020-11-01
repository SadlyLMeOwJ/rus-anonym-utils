async function getRandom(): Promise<number> {
	return Math.random();
}

async function getRandomArbitrary(min: number, max: number): Promise<number> {
	return Math.random() * (max - min) + min;
}

async function getRandomInt(min: number, max: number): Promise<number> {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

async function getRandomIntInclusive(
	min: number,
	max: number,
): Promise<number> {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export { getRandom, getRandomArbitrary, getRandomInt, getRandomIntInclusive };
