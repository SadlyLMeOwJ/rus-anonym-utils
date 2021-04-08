import utils from "../../dist/main";

import assert from "assert";

function numberArraySortTests(): void {
	const source = [1, 5, 7, 2, 10, 4, 3, 9, 8, 6];
	const answer = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	it("bubble", () => {
		assert.deepStrictEqual(utils.array.number.sort.bubble(source), answer);
	});

	it("selection", () => {
		assert.deepStrictEqual(utils.array.number.sort.selection(source), answer);
	});

	it("insertion", () => {
		assert.deepStrictEqual(utils.array.number.sort.insertion(source), answer);
	});

	it("Shell", () => {
		assert.deepStrictEqual(utils.array.number.sort.Shell(source), answer);
	});

	it("simpleCounting", () => {
		assert.deepStrictEqual(
			utils.array.number.sort.simpleCounting(source),
			answer,
		);
	});

	it("comb", () => {
		assert.deepStrictEqual(utils.array.number.sort.comb(source), answer);
	});

	it("merge", () => {
		assert.deepStrictEqual(utils.array.number.sort.merge(source), answer);
	});

	it("simpleCounting", () => {
		assert.deepStrictEqual(
			utils.array.number.sort.simpleCounting(source),
			answer,
		);
	});

	it("comb", () => {
		assert.deepStrictEqual(utils.array.number.sort.comb(source), answer);
	});

	it("merge", () => {
		assert.deepStrictEqual(utils.array.number.sort.merge(source), answer);
	});

	it("heap", () => {
		assert.deepStrictEqual(utils.array.number.sort.heap(source), answer);
	});

	it("quick", () => {
		assert.deepStrictEqual(utils.array.number.sort.quick(source), answer);
	});

	it("shaker", () => {
		assert.deepStrictEqual(utils.array.number.sort.shaker(source), answer);
	});

	it("gnome", () => {
		assert.deepStrictEqual(utils.array.number.sort.gnome(source), answer);
	});

	it("naturalStringSorter", () => {
		assert.deepStrictEqual(
			utils.array.number.sort.naturalStringSorter(source),
			answer,
		);
	});

	it("benchmark", () => {
		assert.ok(utils.array.number.sort.benchmark(source));
	});
}

export default numberArraySortTests;
