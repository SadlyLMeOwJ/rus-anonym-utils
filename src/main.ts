/**
 * @module Utils
 */

import { array } from "./lib/array/core";
import { logical } from "./lib/logical/core";
import { number } from "./lib/number/core";
import { regular } from "./lib/regular/core";
import { string } from "./lib/string/core";
import { time } from "./lib/time/core";
import { vk } from "./lib/vk/core";
import { IP } from "./lib/IP/core";

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export { array, logical, number, regular, string, time, vk, IP, sleep };

export default { array, logical, number, regular, string, time, vk, IP, sleep };
