import utils from "../dist/main";
import assert from "assert";

describe("Number section", () => {
	it("getRandomArbitrary", () => {
		const answer = utils.number.getRandomArbitrary(0, 1);
		assert.strictEqual(answer >= 0 && answer < 1, true);
	});

	it("getRandomInt", () => {
		const answer = utils.number.getRandomInt(0, 1);
		assert.strictEqual(utils.number.getRandomInt(1, 5, "500"), 1);
		assert.strictEqual(answer >= 0 && answer < 1, true);
	});

	it("getRandomIntInclusive", () => {
		const answer = utils.number.getRandomIntInclusive(0, 1);
		assert.strictEqual(answer >= 0 && answer <= 1, true);
	});

	it("isInteger", () => {
		assert.strictEqual(utils.number.isInteger(500), true);
		assert.strictEqual(utils.number.isInteger(500.1), false);
	});

	it("separator", () => {
		assert.strictEqual(utils.number.separator(500, "."), "500");
		assert.strictEqual(utils.number.separator(500.5, ".", ","), "500,5");
		assert.strictEqual(utils.number.separator(5000, "."), "5.000");
		assert.strictEqual(utils.number.separator(500000, "."), "500.000");
		assert.strictEqual(utils.number.separator(5000000, "."), "5.000.000");
		assert.strictEqual(
			utils.number.separator(50000000000, "."),
			"50.000.000.000",
		);
	});
});
