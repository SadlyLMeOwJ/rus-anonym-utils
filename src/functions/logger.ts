/**
 * @module Logger
 */

export function log(text: string): void {
	console.log(`[${new Date().toISOString()}] - ${text}`);
}

export { log as console };
