/**
 * Получить идентификатор последней беседы в группе.
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
 * Получить идентификатор последней беседы в группе.
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
 * Получить идентификатор последней беседы в группе.
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
 * Получить идентификатор последней беседы в группе.
 * @param milliseconds - количество миллисекунд от 1 января 1970
 * @return текущее время в формате HH:MM:SS
 */
function currentTime(): string {
	return getTimeByMS(Date.now());
}

/**
 * Получить идентификатор последней беседы в группе.
 * @param milliseconds - количество миллисекунд от 1 января 1970
 * @return текущая дата в формате  DD:MM:YY
 */
function currentDate(): string {
	return getDateByMS(Date.now());
}

/**
 * Получить идентификатор последней беседы в группе.
 * @param milliseconds - количество миллисекунд от 1 января 1970
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
	let date: Date;
	if (Number.isInteger(milliseconds)) {
		date = new Date(milliseconds);
	} else {
		date = new Date();
	}

	return {
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		days: date.getDay(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
	};
}

export {
	getDateByMS,
	getDateTimeByMS,
	currentTime,
	currentDate,
	currentDateTime,
};
