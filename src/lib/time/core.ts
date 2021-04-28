/**
 * @module Time
 */

import moment from "moment";
import "moment-precise-range-plugin";
import { string } from "../string/core";
export class TimeUtils {
	/**
	 * Получить время до нового года
	 * @return возвращает строку с временем до нового года
	 * @example
	 * //return 1 месяц, 2 дня, 3 часа, 4 минуты, 5 секунд
	 * utils.time.getTimeUntilNewYear();
	 */
	public getTimeUntilNewYear(): string {
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
				  string.declOfNum(objectWithTime.years, ["год", "года", "лет"]) +
				  ", "
				: "") +
			(objectWithTime.months
				? objectWithTime.months +
				  " " +
				  string.declOfNum(objectWithTime.months, [
						"месяц",
						"месяца",
						"месяцев",
				  ]) +
				  ", "
				: "") +
			(objectWithTime.days
				? objectWithTime.days +
				  " " +
				  string.declOfNum(objectWithTime.days, ["день", "дня", "дней"]) +
				  ", "
				: "") +
			(objectWithTime.hours
				? objectWithTime.hours +
				  " " +
				  string.declOfNum(objectWithTime.hours, ["час", "часа", "часов"]) +
				  ", "
				: "") +
			(objectWithTime.minutes
				? objectWithTime.minutes +
				  " " +
				  string.declOfNum(objectWithTime.minutes, [
						"минута",
						"минуты",
						"минут",
				  ]) +
				  ", "
				: "") +
			(objectWithTime.seconds
				? objectWithTime.seconds +
				  " " +
				  string.declOfNum(objectWithTime.seconds, [
						"секунда",
						"секунды",
						"секунд",
				  ])
				: "")
		);
	}

	/**
	 * Получить время до выбранной даты
	 * @return возвращает строку с временем до даты
	 * @example
	 * //return 1 месяц, 2 дня, 3 часа, 4 минуты, 5 секунд
	 * utils.time.getPrecizeDiff(new Date(), new Date(Number(new Date()) + 2813645000));
	 */
	public getPrecizeDiff({
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
		  > {
		const objectWithTime = moment.preciseDiff(
			moment(firstDate),
			moment(secondDate),
			true,
		);
		const precizeData = {
			year: {
				value: objectWithTime.years,
				declination: string.declOfNum(objectWithTime.years, i18n.year),
			},
			month: {
				value: objectWithTime.months,
				declination: string.declOfNum(objectWithTime.months, i18n.month),
			},
			day: {
				value: objectWithTime.days,
				declination: string.declOfNum(objectWithTime.days, i18n.day),
			},
			hour: {
				value: objectWithTime.hours,
				declination: string.declOfNum(objectWithTime.hours, i18n.hour),
			},
			minute: {
				value: objectWithTime.minutes,
				declination: string.declOfNum(objectWithTime.minutes, i18n.minute),
			},
			second: {
				value: objectWithTime.minutes,
				declination: string.declOfNum(objectWithTime.minutes, i18n.minute),
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
	}
}

export const time = new TimeUtils();
