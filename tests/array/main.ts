import utils from "../../src/main";

import { describe, it } from "mocha";

describe("Array section", () => {
	describe("Main functions", () => {
		it("random", (done) => {
			const sourceArray = Array.from({ length: 10 }, () => () => Math.random());
			const randomElement = utils.array.random(sourceArray);
			if (sourceArray.includes(randomElement)) {
				done();
			} else {
				done(new Error("An unexpected number: " + randomElement));
			}
		});

		it("splitOn", (done) => {
			const splittedArray = utils.array.splitOn([1, 2, 3], 2);
			// bug
			if (splittedArray.length === 2 && splittedArray[1][0] === 2) {
				done();
			} else {
				done(new Error());
			}
		});

		it("splitTo", (done) => {
			const splittedArray = utils.array.splitTo([1, 2, 3, 4], 1);
			if (splittedArray.length !== 4) {
				done(new Error());
			} else {
				done();
			}
		});

		it("shuffle", (done) => {
			const sourceArray = Array.from({ length: 10 }, () => () => Math.random());
			const compare = <T>(a1: T[], a2: string | T[]): boolean => {
				return (
					a1.length == a2.length && a1.every((v: T, i: number) => v === a2[i])
				);
			};
			const shuffleArray = utils.array.shuffle(sourceArray);
			if (compare(sourceArray, shuffleArray)) {
				done(new Error());
			} else {
				done();
			}
		});

		it("insert", (done) => {
			if (utils.array.insert([1, 2, 4], 2, 3).includes(3)) {
				done();
			} else {
				done(new Error());
			}
		});

		it("removeEmptyElements", (done) => {
			if (utils.array.removeEmptyElements([1, null, 3, null, 5]).length !== 3) {
				done(new Error());
			} else {
				done();
			}
		});

		it("naturalStringSorter", (done) => {
			const firstTest = utils.array.naturalStringSorter(
				[1, 3, 2],
				function (element) {
					return element.toString();
				},
			);
			const secondTest = utils.array.naturalStringSorter([1, 3, 2]);

			if (firstTest[1] !== 2 || secondTest[1] !== 2) {
				done(new Error());
			} else {
				done();
			}
		});

		it("makeUnique", (done) => {
			const sourceArray = [1, 1, 2, 3];
			const uniqueArray = utils.array.makeUnique(sourceArray);
			if (uniqueArray.length !== 3) {
				done(new Error());
			} else {
				done();
			}
		});

		it("removeFalseValues", (done) => {
			const sourceArray = [0, "", null, undefined, NaN, true, "valid"];
			if (utils.array.removeFalseValues(sourceArray).length !== 2) {
				done(new Error());
			} else {
				done();
			}
		});
	});
});
