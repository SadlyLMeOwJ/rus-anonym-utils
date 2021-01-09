/**
 * @module Time
 */

import moment from "moment";
import "moment-precise-range-plugin";
import { declOfNum } from "./string";

/**
 * Получить время по миллисекундам
 * @param milliseconds - количество миллисекунд от 1 января 1970
 * @return время в формате HH:MM:SS
 */
function getTimeByMS(milliseconds: number | Date): string {
	const { hours, minutes, seconds } = _getDate(Number(milliseconds));

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
function getDateByMS(milliseconds: number | Date): string {
	const { days, month, year } = _getDate(Number(milliseconds));
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
function getDateTimeByMS(milliseconds: number | Date): string {
	const { hours, minutes, seconds, days, month, year } = _getDate(
		Number(milliseconds),
	);

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
	const date: Date = new Date(milliseconds);

	return {
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		days: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
	};
}

/**
 * Получить время до нового года
 * @return возвращает строку с временем до нового года
 * @example
 * //return 1 месяц, 2 дня, 3 часа, 4 минуты, 5 секунд
 * utils.time.getTimeUntilNewYear();
 */
function getTimeUntilNewYear(): string {
	const newYearDate = moment(
		`${new Date().getFullYear() + 1}-01-01 00:00:00`,
		"YYYY-MM-DD HH:mm:ss",
	);
	const objectWithTime = moment.preciseDiff(moment(), newYearDate, true);
	return (
		"" +
		(objectWithTime.years
			? objectWithTime.years +
			  " " +
			  declOfNum(objectWithTime.years, ["год", "года", "лет"]) +
			  ", "
			: "") +
		(objectWithTime.months
			? objectWithTime.months +
			  " " +
			  declOfNum(objectWithTime.months, ["месяц", "месяца", "месяцев"]) +
			  ", "
			: "") +
		(objectWithTime.days
			? objectWithTime.days +
			  " " +
			  declOfNum(objectWithTime.days, ["день", "дня", "дней"]) +
			  ", "
			: "") +
		(objectWithTime.hours
			? objectWithTime.hours +
			  " " +
			  declOfNum(objectWithTime.hours, ["час", "часа", "часов"]) +
			  ", "
			: "") +
		(objectWithTime.minutes
			? objectWithTime.minutes +
			  " " +
			  declOfNum(objectWithTime.minutes, ["минута", "минуты", "минут"]) +
			  ", "
			: "") +
		(objectWithTime.seconds
			? objectWithTime.seconds +
			  " " +
			  declOfNum(objectWithTime.seconds, ["секунда", "секунды", "секунд"])
			: "")
	);
}

export {
	getTimeByMS,
	getDateByMS,
	getDateTimeByMS,
	currentTime,
	currentDate,
	currentDateTime,
	getTimeUntilNewYear,
};
