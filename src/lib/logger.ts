/**
 * @module Logger
 */
import chalk from "chalk";
import { currentDateTime } from "./time";

type eventType = "debug" | "info" | "warn" | "error" | "fatal";

const EVENTS: Record<eventType, string> = {
	debug: chalk.green("DEBUG"),
	info: chalk.green("INFO"),
	warn: chalk.yellow("WARN"),
	error: chalk.red("ERROR"),
	fatal: chalk.red("FATAL"),
};

function debug(text: string): void {
	return console.log(`[${currentDateTime()}] | ${EVENTS.debug} - ${text}`);
}

function info(text: string): void {
	return console.log(`[${currentDateTime()}] | ${EVENTS.info} - ${text}`);
}
function warn(text: string): void {
	return console.log(`[${currentDateTime()}] | ${EVENTS.warn} - ${text}`);
}
function error(text: string): void {
	return console.log(`[${currentDateTime()}] | ${EVENTS.error} - ${text}`);
}
function fatal(text: string): void {
	return console.log(`[${currentDateTime()}] | ${EVENTS.fatal} - ${text}`);
}

export { debug, info, warn, error, fatal };
