/**
 * @module Logical
 */

/**
 * Логическое И
 * Конъюнкция
 * Логическое умножение, выражение «AND».
 * Конъюнкция возвращает true только тогда, когда оба аргумента равны true, иначе false.
 * @param {boolean} a - 1 значение
 * @param {boolean} b - 2 значение
 * @return {boolean} - результат
 */
const AND = (a: boolean, b: boolean): boolean => a && b;

/**
 * Логическое ИЛИ
 * Дизъюнкция
 * Логическое сложение, выражение «OR». Также называется «слабой дизъюнкцией».
 * Возвращает false только тогда, когда оба аргумента равны false, иначе true.
 * @param {boolean} a - 1 значение
 * @param {boolean} b - 2 значение
 * @return {boolean} - результат
 */
const OR = (a: boolean, b: boolean): boolean => a || b;

/**
 * Логическое И-НЕ
 * Возвращает true только тогда, когда оба аргумента равны true, иначе false
 * @param {boolean} a - 1 значение
 * @param {boolean} b - 2 значение
 * @return {boolean} - результат
 */
const ANOT = (a: boolean, b: boolean): boolean => a === true && b === true;

/**
 * Логическое ИЛИ-НЕ
 * Иначе стрелка Пирса, выражение «NOR».
 * Возвращает true только тогда, когда оба аргумента одновременно равны false.
 * @param {boolean} a - 1 значение
 * @param {boolean} b - 2 значение
 * @return {boolean} - результат
 */
const NOR = (a: boolean, b: boolean): boolean => a === false && b === false;

/**
 * Логическое исключающее ИЛИ
 * Сильная дизъюнкция
 * Исключающая дизъюнкция, выражение «XOR».
 * Возвращает true только тогда, когда только один из них равен true, а второй равен false.
 * @param {boolean} a - 1 значение
 * @param {boolean} b - 2 значение
 * @return {boolean} - результат
 */
const XOR = (a: boolean, b: boolean): boolean => (a ? !b : b);

/**
 * Логическое НЕ
 * Отрицание
 * Инверсия, негация, выражение «NOT».
 * Возвращает противоположное значение: для false — true, для true — false.
 * @param {boolean} a - 1 значение
 * @return {boolean} - результат
 */
const NOT = (a: boolean): boolean => !a;

/**
 * Логическое РАВНО
 * Эквивалентность
 * Тождество, равенство, выражение «EQ».
 * Возвращает true только тогда, когда оба аргумента равны одновременно false или true.
 * @param {boolean} a - 1 значение
 * @param {boolean} b - 2 значение
 * @return {boolean} - результат
 */
const EQ = (a: boolean, b: boolean): boolean => a === b;

/**
 * Импликация
 * Выражает зависимость причины и следствия.
 * То есть возвращает ложь только тогда, когда первый аргумент равен true, а второй аргумент — false.
 * @param {boolean} a - 1 значение
 * @param {boolean} b - 2 значение
 * @return {boolean} - результат
 */
const IMP = (a: boolean, b: boolean): boolean => {
	return a === true && b === false ? false : true;
};

export { AND, OR, XOR, NOT, NOR, IMP, EQ, ANOT };
