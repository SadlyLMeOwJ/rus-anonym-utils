/**
 * @module NPM
 * @description Функции для работы с NPM
 */

import instanceNPM from "npm-api";
const npm = new instanceNPM();

/**
 * Получает массив с списком всех модулей
 * @param packageJSON {JSON} - package.json
 * @returns массив с всеми модулями
 */
async function getDependecies<T extends { dependencies: string[] }>(
	packageJSON: T,
): Promise<
	Array<{
		name: string;
		lastVersion: string;
		currentVersion: string;
		isOutdated: boolean;
	}>
> {
	const arrayWithDependecies = [];
	for (const i in packageJSON.dependencies) {
		const currentDependence = await npm.repo(i);
		const currentDependenceVersion = await getLatestVersion(i);
		const oldDependenceVersion = packageJSON.dependencies[i].replace("^", "");
		arrayWithDependecies.push({
			name: currentDependence.name,
			lastVersion: currentDependenceVersion,
			currentVersion: oldDependenceVersion,
			isOutdated: currentDependenceVersion !== oldDependenceVersion,
		});
	}
	return arrayWithDependecies;
}

/**
 * Получает последнюю версию переданного модуля
 * @param moduleName {string} - название модуля
 * @returns {string} Последняя версия модуля
 */
async function getLatestVersion(moduleName: string): Promise<string> {
	return (
		await (await npm.repo(moduleName)).version(`latest`)
	).version.toString();
}

export { getDependecies, getLatestVersion };
