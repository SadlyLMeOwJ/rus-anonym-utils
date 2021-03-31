/**
 * @module Utils
 */

import ArrayClass from "./lib/array/core";
import LogicalClass from "./lib/logical/core";
import * as number from "./lib/number/core";
import * as regular from "./lib/regular/core";
import * as smileys from "./lib/smileys/core";
import * as string from "./lib/string/core";
import * as time from "./lib/time/core";
import * as vk from "./lib/vk/core";

const array = new ArrayClass();
const logical = new LogicalClass();

export { array, logical, number, regular, smileys, string, time, vk };

export default { array, logical, number, regular, smileys, string, time, vk };
