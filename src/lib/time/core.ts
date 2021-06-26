import { string } from "./../string/core";
import moment from "moment";
import "moment-precise-range-plugin";

interface I18N {
    years: [string, string, string];
    months: [string, string, string];
    days: [string, string, string];
    hours: [string, string, string];
    minutes: [string, string, string];
    seconds: [string, string, string];
}

/**
 * @category Time
 * @description Класс для работы с временем
 * @hideconstructor
 */
export class TimeUtils {
    // eslint-disable-next-line jsdoc/require-example
    /**
     * @description Получить читабельную строку
     * @param {moment.Moment} m1 - 1 дата
     * @param {moment.Moment} m2 - 2 дата
     * @param {I18N}  i18n - объект с переводом
     * @returns {string} - строка
     */
    public precizeDiff(
        m1: moment.Moment,
        m2: moment.Moment,
        i18n: I18N = {
            years: [`год`, `года`, `лет`],
            months: [`месяц`, `месяца`, `месяцев`],
            days: [`день`, `дня`, `дней`],
            hours: [`час`, `часа`, `часов`],
            minutes: [`минута`, `минуты`, `минут`],
            seconds: [`секунда`, `секунды`, `секунд`],
        }
    ): string {
        const diff = moment.preciseDiff(m1, m2, true);
        const output = [];

        if (diff.years > 0) {
            output.push(
                diff.years + ` ` + string.declOfNum(diff.years, i18n.years)
            );
        }
        if (diff.months > 0) {
            output.push(
                diff.months + ` ` + string.declOfNum(diff.months, i18n.months)
            );
        }
        if (diff.days > 0) {
            output.push(
                diff.days + ` ` + string.declOfNum(diff.days, i18n.days)
            );
        }
        if (diff.hours > 0) {
            output.push(
                diff.hours + ` ` + string.declOfNum(diff.hours, i18n.hours)
            );
        }
        if (diff.minutes > 0) {
            output.push(
                diff.minutes +
                    ` ` +
                    string.declOfNum(diff.minutes, i18n.minutes)
            );
        }
        if (diff.seconds > 0) {
            output.push(
                diff.seconds +
                    ` ` +
                    string.declOfNum(diff.seconds, i18n.seconds)
            );
        }
        return output.join(`, `);
    }
}

export const time = new TimeUtils();
