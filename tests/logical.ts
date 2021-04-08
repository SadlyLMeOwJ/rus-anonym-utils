import utils from "../dist/main";
import assert from "assert";

describe("Logical section", () => {
	it("AND", () => {
		assert.strictEqual(utils.logical.AND(true, true), true);
	});

	it("OR", () => {
		assert.strictEqual(utils.logical.OR(true, false), true);
	});

	it("ANOT", () => {
		assert.strictEqual(utils.logical.ANOT(true, true), true);
	});

	it("NOR", () => {
		assert.strictEqual(utils.logical.NOR(false, false), true);
	});

	it("XOR", () => {
		assert.strictEqual(utils.logical.XOR(true, false), true);
	});

	it("NOT", () => {
		assert.strictEqual(utils.logical.NOT(false), true);
	});

	it("EQ", () => {
		assert.strictEqual(utils.logical.EQ(false, false), true);
	});

	it("IMP", () => {
		assert.strictEqual(utils.logical.IMP(false, true), true);
	});
});
