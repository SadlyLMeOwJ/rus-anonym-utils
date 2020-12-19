/**
 * Логическое ИЛИ
 * @param {boolean} a - 1 значение
 * @param {boolean} b - 2 значение
 * @return {boolean} - результат
 */
function XOR(a: boolean, b: boolean): boolean {
	return a ? !b : b;
}

export { XOR };
