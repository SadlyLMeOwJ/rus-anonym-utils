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
const getTimeByMS = (milliseconds: number | Date): string => {
	const { hours, minutes, seconds } = _getDate(Number(milliseconds));

	return (
		(hours < 10 ? "0" + hours : hours) +
		":" +
		(minutes < 10 ? "0" + minutes : minutes) +
		":" +
		(seconds < 10 ? "0" + seconds : seconds)
	);
};

/**
 * Получить дату по миллисекундам
 * @param milliseconds - количество миллисекунд от 1 января 1970
 * @return дата в формате DD:MM:YY
 */
const getDateByMS = (milliseconds: number | Date): string => {
	const { days, month, year } = _getDate(Number(milliseconds));
	return (
		(days < 10 ? "0" + days : days) +
		"." +
		(month < 10 ? "0" + month : month) +
		"." +
		year
	);
};

/**
 * Получить время и дату по миллисекундам
 * @param milliseconds - количество миллисекунд от 1 января 1970
 * @return дата и время в формате HH:MM:SS | DD:MM:YY
 */
const getDateTimeByMS = (milliseconds: number | Date): string => {
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
};

/**
 * Получить текущее время
 * @return текущее время в формате HH:MM:SS
 */
const currentTime = (): string => getTimeByMS(Date.now());

/**
 * Получить текущую дату
 * @return текущая дата в формате  DD:MM:YY
 */
const currentDate = (): string => getDateByMS(Date.now());

/**
 * Получить текущее время и дату
 * @return текущее время и дата в формате HH:MM:SS | DD:MM:YY
 */
const currentDateTime = (): string => getDateTimeByMS(Date.now());

const _getDate = (
	milliseconds: number,
): {
	hours: number;
	minutes: number;
	seconds: number;
	days: number;
	month: number;
	year: number;
} => {
	const date: Date = new Date(milliseconds);

	return {
		hours: date.getHours(),
		minutes: date.getMinutes(),
		seconds: date.getSeconds(),
		days: date.getDate(),
		month: date.getMonth() + 1,
		year: date.getFullYear(),
	};
};

/**
 * Получить время до нового года
 * @return возвращает строку с временем до нового года
 * @example
 * //return 1 месяц, 2 дня, 3 часа, 4 минуты, 5 секунд
 * utils.time.getTimeUntilNewYear();
 */
const getTimeUntilNewYear = (): string => {
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
};

/**
 * Получить время до выбранной даты
 * @return возвращает строку с временем до даты
 * @example
 * //return 1 месяц, 2 дня, 3 часа, 4 минуты, 5 секунд
 * utils.time.getPrecizeDiff(new Date(), new Date(Number(new Date()) + 2813645000));
 */
const getPrecizeDiff = ({
	firstDate,
	secondDate,
	json = false,
	i18n = {
		year: ["год", "года", "лет"],
		month: ["месяц", "месяца", "месяцев"],
		day: ["день", "дня", "дней"],
		hour: ["час", "часа", "часов"],
		minute: ["минута", "минуты", "минут"],
		second: ["секунда", "секунды", "секунд"],
	},
}: {
	firstDate: Date;
	secondDate: Date;
	json?: boolean;
	i18n?: {
		year: [string, string, string];
		month: [string, string, string];
		day: [string, string, string];
		hour: [string, string, string];
		minute: [string, string, string];
		second: [string, string, string];
	};
}):
	| string
	| Record<
			"year" | "month" | "day" | "hour" | "minute" | "second",
			{ value: number; declination: string }
	  > => {
	const objectWithTime = moment.preciseDiff(
		moment(firstDate),
		moment(secondDate),
		true,
	);
	const precizeData = {
		year: {
			value: objectWithTime.years,
			declination: declOfNum(objectWithTime.years, i18n.year),
		},
		month: {
			value: objectWithTime.months,
			declination: declOfNum(objectWithTime.months, i18n.month),
		},
		day: {
			value: objectWithTime.days,
			declination: declOfNum(objectWithTime.days, i18n.day),
		},
		hour: {
			value: objectWithTime.hours,
			declination: declOfNum(objectWithTime.hours, i18n.hour),
		},
		minute: {
			value: objectWithTime.minutes,
			declination: declOfNum(objectWithTime.minutes, i18n.minute),
		},
		second: {
			value: objectWithTime.minutes,
			declination: declOfNum(objectWithTime.minutes, i18n.minute),
		},
	};
	if (json === true) {
		return precizeData;
	} else {
		return (
			"" +
			(objectWithTime.years
				? objectWithTime.years + " " + precizeData.year.value + ", "
				: "") +
			(objectWithTime.months
				? objectWithTime.months + " " + precizeData.month.value + ", "
				: "") +
			(objectWithTime.days
				? objectWithTime.days + " " + precizeData.day.value + ", "
				: "") +
			(objectWithTime.hours
				? objectWithTime.hours + " " + precizeData.hour.value + ", "
				: "") +
			(objectWithTime.minutes
				? objectWithTime.minutes + " " + precizeData.minute.value + ", "
				: "") +
			(objectWithTime.seconds
				? objectWithTime.seconds + " " + precizeData.second.value
				: "")
		);
	}
};

export {
	getTimeByMS,
	getDateByMS,
	getDateTimeByMS,
	currentTime,
	currentDate,
	currentDateTime,
	getTimeUntilNewYear,
	getPrecizeDiff,
};
