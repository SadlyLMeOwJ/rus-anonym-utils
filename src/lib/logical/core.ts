/**
 * @category Logical
 * @description Класс для работы с логическими функциями
 * @hideconstructor
 */
export class LogicalUtils {
	/**
	 * Логическое И
	 * Конъюнкция
	 * Логическое умножение, выражение «AND».
	 * Конъюнкция возвращает true только тогда, когда оба аргумента равны true, иначе false.
	 *
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @returns {boolean} - результат
	 * @example
	 * logical.AND(true, true) // => true
	 * logical.AND(true, false); // => true
	 * logical.AND(false, false); // => false
	 * logical.AND(false, true); // => true
	 */
	public AND(a: boolean, b: boolean): boolean {
		return a && b;
	}

	/**
	 * Логическое ИЛИ
	 * Дизъюнкция
	 * Логическое сложение, выражение «OR». Также называется «слабой дизъюнкцией».
	 * Возвращает false только тогда, когда оба аргумента равны false, иначе true.
	 *
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @returns {boolean} - результат
	 * @example
	 * logical.OR(true, true) // => true
	 * logical.OR(true, false); // => true
	 * logical.OR(false, false); // => false
	 * logical.OR(false, true); // => true
	 */
	public OR(a: boolean, b: boolean): boolean {
		return a || b;
	}

	/**
	 * Логическое И-НЕ
	 * Возвращает true только тогда, когда оба аргумента равны true, иначе false
	 *
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @returns {boolean} - результат
	 * @example
	 * logical.ANOT(true, true) // => true
	 * logical.ANOT(true, false); // => false
	 * logical.ANOT(false, true); // => false
	 * logical.ANOT(false, false); // => false
	 */
	public ANOT(a: boolean, b: boolean): boolean {
		return a === true && b === true;
	}

	/**
	 * Логическое ИЛИ-НЕ
	 * Иначе стрелка Пирса, выражение «NOR».
	 * Возвращает true только тогда, когда оба аргумента одновременно равны false.
	 *
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @returns {boolean} - результат
	 * @example
	 * logical.NOR(true, true) // => false
	 * logical.NOR(true, false); // => false
	 * logical.NOR(false, false); // => true
	 * logical.NOR(false, true); // => false
	 */
	public NOR(a: boolean, b: boolean): boolean {
		return a === false && b === false;
	}

	/**
	 * Логическое исключающее ИЛИ
	 * Сильная дизъюнкция
	 * Исключающая дизъюнкция, выражение «XOR».
	 * Возвращает true только тогда, когда только один из них равен true, а второй равен false.
	 *
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @returns {boolean} - результат
	 * @example
	 * logical.XOR(true, true) // => false
	 * logical.XOR(true, false); // => true
	 * logical.XOR(false, false); // => false
	 * logical.XOR(false, true); // => true
	 */
	public XOR(a: boolean, b: boolean): boolean {
		return a ? !b : b;
	}

	/**
	 * Логическое НЕ
	 * Отрицание
	 * Инверсия, негация, выражение «NOT».
	 * Возвращает противоположное значение: для false — true, для true — false.
	 *
	 * @param {boolean} a - 1 значение
	 * @returns {boolean} - результат
	 * @example
	 * logical.NOT(true) // => false
	 * logical.NOT(false); // => true
	 */
	public NOT(a: boolean): boolean {
		return !a;
	}

	/**
	 * Логическое РАВНО
	 * Эквивалентность
	 * Тождество, равенство, выражение «EQ».
	 * Возвращает true только тогда, когда оба аргумента равны одновременно false или true.
	 *
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @returns {boolean} - результат
	 * @example
	 * logical.EQ(true, true) // => false
	 * logical.EQ(true, false); // => false
	 * logical.EQ(false, false); // => true
	 * logical.EQ(false, true); // => true
	 */
	public EQ(a: boolean, b: boolean): boolean {
		return a === b;
	}

	/**
	 * Импликация
	 * Выражает зависимость причины и следствия.
	 * То есть возвращает ложь только тогда, когда первый аргумент равен true, а второй аргумент — false.
	 *
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @returns {boolean} - результат
	 * @example
	 * logical.IMP(true, true) // => true
	 * logical.IMP(true, false); // => false
	 * logical.IMP(false, false); // => true
	 * logical.IMP(false, true); // => true
	 */
	public IMP(a: boolean, b: boolean): boolean {
		return a === true && b === false ? false : true;
	}
}

export const logical = new LogicalUtils();
