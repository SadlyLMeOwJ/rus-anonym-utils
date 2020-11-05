/**
 * Получить время по миллисекундам
 * @param milliseconds - количество миллисекунд от 1 января 1970
 * @return время в формате HH:MM:SS
 */
function getTimeByMS(milliseconds: number): string {
	const { hours, minutes, seconds } = _getDate(milliseconds);

	return (
		(hours < 10 ? "0" + hours : hours) +
		":" +
		(minutes < 10 ? "0" + minutes : minutes) +
		":" +
		(seconds < 10 ? "0" + seconds : seconds)
	);
}

/**
 * Получить дату по миллисекундам
 * @param milliseconds - количество миллисекунд от 1 января 1970
 * @return дата в формате DD:MM:YY
 */
function getDateByMS(milliseconds: number): string {
	const { days, month, year } = _getDate(milliseconds);
	return (
		(days < 10 ? "0" + days : days) +
		"." +
		(month < 10 ? "0" + month : month) +
		"." +
		year
	);
}

/**
 * Получить время и дату по миллисекундам
 * @param milliseconds - количество миллисекунд от 1 января 1970
 * @return дата и время в формате HH:MM:SS | DD:MM:YY
 */
function getDateTimeByMS(milliseconds: number): string {
	const { hours, minutes, seconds, days, month, year } = _getDate(milliseconds);

	return (
		(hours < 10 ? "0" + hours : hours) +
		":" +
		(minutes < 10 ? "0" + minutes : minutes) +
		":" +
		(seconds < 10 ? "0" + seconds : seconds) +
		" | " +
		(days < 10 ? "0" + days : days) +
		"." +
		(month < 10 ? "0" + month : month) +
		"." +
		year
	);
}

/**
 * Получить текущее время
 * @return текущее время в формате HH:MM:SS
 */
function currentTime(): string {
	return getTimeByMS(Date.now());
}

/**
 * Получить текущую дату
 * @return текущая дата в формате  DD:MM:YY
 */
function currentDate(): string {
	return getDateByMS(Date.now());
}

/**
 * Получить текущее время и дату
 * @return текущее время и дата в формате HH:MM:SS | DD:MM:YY
 */
function currentDateTime(): string {
	return getDateTimeByMS(Date.now());
}

function _getDate(
	milliseconds: number,
): {
	hours: number;
	minutes: number;
	seconds: number;
	days: number;
	month: number;
	year: number;
} {
	let date: Date = new Date(milliseconds);

	return {
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		days: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
	};
}

export {
	getTimeByMS,
	getDateByMS,
	getDateTimeByMS,
	currentTime,
	currentDate,
	currentDateTime,
};
