/**
 * @module Logical
 */
class Logical {
	/**
	 * Логическое И
	 * Конъюнкция
	 * Логическое умножение, выражение «AND».
	 * Конъюнкция возвращает true только тогда, когда оба аргумента равны true, иначе false.
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @return {boolean} - результат
	 */
	public AND(a: boolean, b: boolean): boolean {
		return a && b;
	}

	/**
	 * Логическое ИЛИ
	 * Дизъюнкция
	 * Логическое сложение, выражение «OR». Также называется «слабой дизъюнкцией».
	 * Возвращает false только тогда, когда оба аргумента равны false, иначе true.
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @return {boolean} - результат
	 */
	public OR(a: boolean, b: boolean): boolean {
		return a || b;
	}

	/**
	 * Логическое И-НЕ
	 * Возвращает true только тогда, когда оба аргумента равны true, иначе false
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @return {boolean} - результат
	 */
	public ANOT(a: boolean, b: boolean): boolean {
		return a === true && b === true;
	}

	/**
	 * Логическое ИЛИ-НЕ
	 * Иначе стрелка Пирса, выражение «NOR».
	 * Возвращает true только тогда, когда оба аргумента одновременно равны false.
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @return {boolean} - результат
	 */
	public NOR(a: boolean, b: boolean): boolean {
		return a === false && b === false;
	}

	/**
	 * Логическое исключающее ИЛИ
	 * Сильная дизъюнкция
	 * Исключающая дизъюнкция, выражение «XOR».
	 * Возвращает true только тогда, когда только один из них равен true, а второй равен false.
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @return {boolean} - результат
	 */
	public XOR(a: boolean, b: boolean): boolean {
		return a ? !b : b;
	}

	/**
	 * Логическое НЕ
	 * Отрицание
	 * Инверсия, негация, выражение «NOT».
	 * Возвращает противоположное значение: для false — true, для true — false.
	 * @param {boolean} a - 1 значение
	 * @return {boolean} - результат
	 */
	public NOT(a: boolean): boolean {
		return !a;
	}

	/**
	 * Логическое РАВНО
	 * Эквивалентность
	 * Тождество, равенство, выражение «EQ».
	 * Возвращает true только тогда, когда оба аргумента равны одновременно false или true.
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @return {boolean} - результат
	 */
	public EQ = (a: boolean, b: boolean): boolean => {
		return a === b;
	};

	/**
	 * Импликация
	 * Выражает зависимость причины и следствия.
	 * То есть возвращает ложь только тогда, когда первый аргумент равен true, а второй аргумент — false.
	 * @param {boolean} a - 1 значение
	 * @param {boolean} b - 2 значение
	 * @return {boolean} - результат
	 */
	public IMP(a: boolean, b: boolean): boolean {
		return a === true && b === false ? false : true;
	}
}

export default new Logical();
