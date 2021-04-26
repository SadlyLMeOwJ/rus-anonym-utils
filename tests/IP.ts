import utils from "../dist/main";
import assert from "assert";
import { describe } from "mocha";

describe("IP section", () => {
	it("is", () => {
		assert.strictEqual(utils.IP.is("127.0.0.1"), true);
		assert.strictEqual(
			utils.IP.is("2001:0db8:85a3:0000:0000:8a2e:0370:7334"),
			true,
		);
	});
	describe("v4", () => {
		it("is", () => {
			assert.strictEqual(utils.IP.v4.is("127.0.0.1"), true);
		});

		it("calculateBroadcastIP", () => {
			assert.strictEqual(
				utils.IP.v4.calculateBroadcastIP("192.168.0.1", "255.255.255.0"),
				"192.168.0.255",
			);
		});

		it("calculateNetworkIP", () => {
			assert.strictEqual(
				utils.IP.v4.calculateNetworkIP("192.168.0.1", "255.255.255.0"),
				"192.168.0.0",
			);
		});
	});

	describe("v6", () => {
		it("is", () => {
			assert.strictEqual(
				utils.IP.v6.is("2001:0db8:85a3:0000:0000:8a2e:0370:7334"),
				true,
			);
		});
	});
});
