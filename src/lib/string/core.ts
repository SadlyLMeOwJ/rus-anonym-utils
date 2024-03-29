/**
 * @category String
 * @description Класс для работы с строками
 * @hideconstructor
 */
export class StringUtils {
    /**
     * @description Метод для нахождения разницы между 2 строками
     * @param {string} firstString - Первая строка
     * @param {string} secondString - Вторая строка
     * @param {Object} costs - Набор параметров
     * @param {number} costs.replace - Цена замены
     * @param {number} costs.replaceCase - Цена замены с учётом кейса
     * @param {number} costs.insert - Цена присутствия
     * @param {number} costs.remove - Цена отсутствия
     * @returns {number} - Разница между строками
     * @example
     * string.levenshtein("test", "test1"); // => 1
     * string.levenshtein("test", "test123"); // => 3
     */
    public levenshtein(
        firstString: string,
        secondString: string,
        costs: {
            replace?: number;
            replaceCase?: number;
            insert?: number;
            remove?: number;
        } = {
            replace: 1,
            replaceCase: 1,
            insert: 1,
            remove: 1,
        }
    ): number {
        let flip: number;
        let ch: string;
        let chl: string;
        let ii: number;
        let ii2: number;
        let cost: number;
        const firstStringLength = firstString.length;
        const secondStringLength = secondString.length;

        costs.replace === undefined ? (costs.replace = 1) : null;
        costs.replaceCase === undefined ? (costs.replaceCase = 1) : null;
        costs.insert === undefined ? (costs.insert = 1) : null;
        costs.remove === undefined ? (costs.remove = 1) : null;

        const cutHalf = (flip = Math.max(
            firstStringLength,
            secondStringLength
        ));

        const minCost = Math.min(costs.remove, costs.insert, costs.replace);
        const minD = Math.max(
            minCost,
            (firstStringLength - secondStringLength) * costs.remove
        );
        const minI = Math.max(
            minCost,
            (secondStringLength - firstStringLength) * costs.insert
        );
        const buf: number[] = new Array(cutHalf * 2 - 1);

        for (let i = 0; i <= secondStringLength; ++i) {
            buf[i] = i * minD;
        }

        for (let i = 0; i < firstStringLength; ++i, flip = cutHalf - flip) {
            ch = firstString[i];
            chl = ch.toLowerCase();

            buf[flip] = (i + 1) * minI;

            ii = flip;
            ii2 = cutHalf - flip;

            for (let j = 0; j < secondStringLength; ++j, ++ii, ++ii2) {
                cost =
                    ch === secondString[j]
                        ? 0
                        : chl === secondString[j].toLowerCase()
                        ? costs.replaceCase
                        : costs.replace;
                buf[ii + 1] = Math.min(
                    buf[ii2 + 1] + costs.remove,
                    buf[ii] + costs.insert,
                    buf[ii2] + cost
                );
            }
        }
        return buf[secondStringLength + cutHalf - flip];
    }

    /**
     * Функция для корректного склонения чисел
     *
     * @param {number} inputNumber Число
     * @param {string[]} titlesArray Строки для склонения
     * @returns {string} корректное название
     * @example
     * // => помидора
     * string.declOfNum(3, ["помидор", "помидора", "помидоров"]);
     */
    public declOfNum(
        inputNumber: number,
        titlesArray: [string, string, string]
    ): string {
        return titlesArray[
            inputNumber % 10 === 1 && inputNumber % 100 !== 11
                ? 0
                : inputNumber % 10 >= 2 &&
                  inputNumber % 10 <= 4 &&
                  (inputNumber % 100 < 10 || inputNumber % 100 >= 20)
                ? 1
                : 2
        ];
    }

    // eslint-disable-next-line jsdoc/require-example
    /**
     * @description Возвращает строку без Zalgo
     * @param {string} string строка из которой необходимо убрать Zalgo
     * @returns {string} - Чистая строка
     */
    public removeZalgo(string: string): string {
        return string.replace(
            /(̖|̗|̘|̙|̜|̝|̞|̟|̠|̤|̥|̦|̩|̪|̫|̬|̭|̮|̯|̰|̱|̲|̳|̹|̺|̻|̼|ͅ|͇|͈|͉|͍|͎|͓|͔|͕|͖|͙|͚|̣|̕|̛|̀|́|͘|̡|̢|̧|̨|̴|̵|̶|͏|͜|͝|͞|͟|͠|͢|̸|̷|͡|҉|̍|̎|̄|̅|̿|̑|̆|̐|͒|͗|͑|̇|̈|̊|͂|̓|̈́|͊|͋|͌|̃|̂|̌|͐|̀|́|̋|̏|̒|̓|̔|̽|̉|ͣ|ͤ|ͥ|ͦ|ͧ|ͨ|ͩ|ͪ|ͫ|ͬ|ͭ|ͮ|ͯ|̾|͛|͆|̚)/gi,
            ""
        );
    }
}

export const string = new StringUtils();
