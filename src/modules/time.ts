export async function getTimeByMS(ms: number): Promise<string> {
	let date = new Date(ms);
	let hours: any = date.getHours();
	let minutes: any = date.getMinutes();
	let seconds: any = date.getSeconds();
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return `${hours}:${minutes}:${seconds}`;
}

export async function getDateByMS(ms: number): Promise<string> {
	let date = new Date(ms);
	let days: any = date.getDate();
	let month: any = date.getMonth() + 1;
	let year: any = date.getFullYear();
	if (month < 10) {
		month = "0" + month;
	}
	if (days < 10) {
		days = "0" + days;
	}
	return `${days}.${month}.${year}`;
}

export async function getDateTimeByMS(ms: number): Promise<string> {
	let date = new Date(ms);
	let hours: any = date.getHours();
	let minutes: any = date.getMinutes();
	let seconds: any = date.getSeconds();
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	let days: any = date.getDate();
	let month: any = date.getMonth() + 1;
	let year: any = date.getFullYear();
	if (month < 10) {
		month = "0" + month;
	}
	if (days < 10) {
		days = "0" + days;
	}
	return `${hours}:${minutes}:${seconds} | ${days}.${month}.${year}`;
}

export async function currentTime(): Promise<string> {
	return await getTimeByMS(Number(new Date()));
}

export async function currentDate(): Promise<string> {
	return await getDateByMS(Number(new Date()));
}

export async function currentDateTime(): Promise<string> {
	return await getDateTimeByMS(Number(new Date()));
}
