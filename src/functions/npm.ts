// @ts-ignore
import instanceNPM from "npm-api";
const npm = new instanceNPM();

interface checkDependenciesResponse {
	name: string;
	lastVersion: string;
	currentVersion: string;
	isOutdated: boolean;
}

class NPM {
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
				const currentDependenceVersion = (
					await currentDependence.version(`latest`)
				).version.toString();
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

export { NPM };
