import utils from "../dist/main";
import assert from "assert";
import { describe, it } from "mocha";

import "./array/main";
import "./logical";
import "./number";
import "./regular";
import "./string";
import "./IP";

describe("Main", function () {
	it("sleep", async () => {
		let i = 0;
		setTimeout(() => {
			assert.strictEqual(i, 0);
		}, 25);
		await utils.sleep(50);
		i = 5;
	});
});
