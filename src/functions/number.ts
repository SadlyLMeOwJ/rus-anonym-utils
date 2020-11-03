function getRandom() {
	return Math.random();
}

function getRandomArbitrary(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

function getRandomInt(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntInclusive(min: number, max: number) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isInteger(number: number): boolean {
	return (number ^ 0) === number;
}

export {
	getRandom,
	getRandomArbitrary,
	getRandomInt,
	getRandomIntInclusive,
	isInteger,
};
