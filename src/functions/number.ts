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

function separator(number: number, separator: string): string {
	let output = number.toString();
	if (!output) {
		throw new Error(`Invalid number`);
	} else {
		separator = separator || ".";
		let splitted = output.split("");
		let reversed = splitted.reverse();
		let joined = reversed.join("");
		let matched = joined.match(/[0-9]{1,3}/g);
		let separated = matched?.join(
			separator.toString().split("").reverse().join(""),
		);
		let splittedOutput = separated?.split("");
		let reversedOutput = splittedOutput?.reverse();
		let joinedOutput = reversedOutput?.join("");
		if (joinedOutput) {
			return joinedOutput;
		} else {
			throw new Error(`Invalid number`);
		}
	}
}

export {
	getRandom,
	getRandomArbitrary,
	getRandomInt,
	getRandomIntInclusive,
	isInteger,
	separator,
};
