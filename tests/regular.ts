import utils from "../dist/main";
import assert from "assert";

describe("Regular section", () => {
	it("isEmail", () => {
		assert.strictEqual(
			utils.regular.isEmail("alexandrsemin2033@gmail.com"),
			true,
		);
		assert.strictEqual(
			utils.regular.isEmail("alexandrsemin2033@yandex.ru"),
			true,
		);
	});

	it("isIPv4", () => {
		assert.strictEqual(utils.regular.isIPv4("192.168.0.1"), true);
		assert.strictEqual(utils.regular.isIPv4("10.0.0.1"), true);
		assert.strictEqual(utils.regular.isIPv4("1.1.1.1"), true);
		assert.strictEqual(utils.regular.isIPv4("255.255.255.255"), true);
		assert.strictEqual(utils.regular.isIPv4("-1.1.1.1"), false);
		assert.strictEqual(utils.regular.isIPv4("1.1.1.256"), false);
	});

	it("isIPv6", () => {
		assert.strictEqual(
			utils.regular.isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334"),
			true,
		);
	});

	it("isIP", () => {
		assert.strictEqual(utils.regular.isIP("192.168.0.1"), true);
		assert.strictEqual(utils.regular.isIP("10.0.0.1"), true);
		assert.strictEqual(utils.regular.isIP("1.1.1.1"), true);
		assert.strictEqual(utils.regular.isIP("255.255.255.255"), true);
		assert.strictEqual(utils.regular.isIP("-1.1.1.1"), false);
		assert.strictEqual(utils.regular.isIP("1.1.1.256"), false);
		assert.strictEqual(
			utils.regular.isIP("2001:0db8:85a3:0000:0000:8a2e:0370:7334"),
			true,
		);
	});

	it("isURL", () => {
		assert.strictEqual(utils.regular.isURL("http://google.com"), true);
		assert.strictEqual(utils.regular.isURL("https://google.com/"), true);
		assert.strictEqual(utils.regular.isURL("http://google.com/test"), true);
		assert.strictEqual(
			utils.regular.isURL("https://google.com/test/test2/test3"),
			true,
		);
		assert.strictEqual(utils.regular.isURL("http://google.ru/"), true);
	});

	it("isPhoneNumber", () => {
		assert.strictEqual(utils.regular.isPhoneNumber("79991237799"), true);
		assert.strictEqual(utils.regular.isPhoneNumber("+79991237799"), true);
		assert.strictEqual(utils.regular.isPhoneNumber("+7(999)-123-77-99"), true);
		assert.strictEqual(utils.regular.isPhoneNumber("8-800-555-35-35"), true);
	});
});
