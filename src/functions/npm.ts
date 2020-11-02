// @ts-ignore
import instanceNPM from "npm-api";
const npm = new instanceNPM();

interface checkDependenciesResponse {
	name: string;
	lastVersion: string;
	currentVersion: string;
	isOutdated: boolean;
}

class packageJSON {
	private packageJSON: any;
	constructor(packageJSON: any) {
		this.packageJSON = packageJSON;
	}

	async checkDependencies(): Promise<Array<checkDependenciesResponse>> {
		if (!this.packageJSON.dependencies) {
			return [];
		} else {
			let arrayWithDependecies = [];
			for (let i in this.packageJSON.dependencies) {
				const currentDependence = await npm.repo(i);
				const currentDependenceVersion = await getLatestVersion(i);
				const oldDependenceVersion = this.packageJSON.dependencies[i].replace(
					"^",
					"",
				);
				arrayWithDependecies.push({
					name: currentDependence.name,
					lastVersion: currentDependenceVersion,
					currentVersion: oldDependenceVersion,
					isOutdated: currentDependenceVersion !== oldDependenceVersion,
				});
			}
			return arrayWithDependecies;
		}
	}
}

async function getLatestVersion(moduleName: string) {
	return (
		await (await npm.repo(moduleName)).version(`latest`)
	).version.toString();
}

export { packageJSON, getLatestVersion };
