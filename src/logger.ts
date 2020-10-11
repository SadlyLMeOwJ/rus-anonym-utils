async function log(text: string) {
	return console.log(`[${new Date().toISOString()}] - ${text}`);
}

export { log as console };
