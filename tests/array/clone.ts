import utils from "../../dist/main";

import assert from "assert";

function cloneTests(): void {
	it("slice", () => {
		assert.deepStrictEqual(utils.array.clone.slice([1, 2, 3]), [1, 2, 3]);
	});

	it("concat", () => {
		assert.deepStrictEqual(utils.array.clone.concat([1, 2, 3]), [1, 2, 3]);
	});

	it("unshift", () => {
		assert.deepStrictEqual(utils.array.clone.unshift([1, 2, 3]), [1, 2, 3]);
	});

	it("push", () => {
		assert.deepStrictEqual(utils.array.clone.push([1, 2, 3]), [1, 2, 3]);
	});

	it("index", () => {
		assert.deepStrictEqual(utils.array.clone.index([1, 2, 3]), [1, 2, 3]);
	});

	it("apply", () => {
		assert.deepStrictEqual(utils.array.clone.apply([1, 2, 3]), [1, 2, 3]);
	});

	it("map", () => {
		assert.deepStrictEqual(utils.array.clone.map([1, 2, 3]), [1, 2, 3]);
	});

	it("json", () => {
		assert.deepStrictEqual(utils.array.clone.json([1, 2, 3]), [1, 2, 3]);
	});

	it("spread", () => {
		assert.deepStrictEqual(utils.array.clone.spread([1, 2, 3]), [1, 2, 3]);
	});

	it("from", () => {
		assert.deepStrictEqual(utils.array.clone.from([1, 2, 3]), [1, 2, 3]);
	});

	it("recursionDeep", () => {
		assert.deepStrictEqual(utils.array.clone.recursionDeep([1, 2, 3]), [
			1,
			2,
			3,
		]);
	});

	it("benchmark", () => {
		assert.ok(utils.array.clone.benchmark([1, 2, 3]));
	});

	if (process.version >= "v15") {
		it("faster", async () => {
			assert.deepStrictEqual(await utils.array.clone.faster([1, 2, 3]), [
				1,
				2,
				3,
			]);
		});
	}
}

export default cloneTests;
