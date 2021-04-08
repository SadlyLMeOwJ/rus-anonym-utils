import utils from "../../dist/main";
import assert from "assert";
import numberArraySortTests from "./numberSorter";

const numberArrayTests = (): void => {
	it("min", () => {
		assert.strictEqual(utils.array.number.min([5, 4, 1, 2]), 1);
	});

	it("max", () => {
		assert.strictEqual(utils.array.number.max([5, 4, 1, 2]), 5);
	});

	it("average", () => {
		assert.strictEqual(utils.array.number.average([5, 4, 1, 2]), 3);
	});

	it("total", () => {
		assert.strictEqual(utils.array.number.total([5, 4, 1, 2]), 12);
	});

	it("generate", () => {
		assert.deepStrictEqual(utils.array.number.generate(5, 0), [0, 0, 0, 0, 0]);
	});

	describe("Sort", numberArraySortTests);
};

export default numberArrayTests;
