type sortingAlgorithm =
	| "bubble"
	| "selection"
	| "insertion"
	| "Shell"
	| "simpleCounting"
	| "comb"
	| "merge"
	| "heap"
	| "quick"
	| "shaker"
	| "gnome"
	| "naturalStringSorter";

type cloneMethod =
	| "slice"
	| "concat"
	| "unshift"
	| "push"
	| "index"
	| "apply"
	| "map"
	| "json"
	| "spread"
	| "from"
	| "recursionDeep";

interface SortingBenchmarkResponse {
	fastest: {
		algorithm: sortingAlgorithm;
		rate: number;
	};
	slowest: {
		algorithm: sortingAlgorithm;
		rate: number;
	};
	summary: Record<sortingAlgorithm, number>;
	totalTime: number;
	sourceArray: number[];
	sortedArray: number[];
}

interface CloneBenchmarkResponse {
	fastest: {
		method: cloneMethod;
		rate: number;
	};
	slowest: {
		method: cloneMethod;
		rate: number;
	};
	summary: Record<cloneMethod, number>;
	totalTime: number;
	sourceArray: any[];
	copiedArray: any[];
}

export {
	sortingAlgorithm,
	cloneMethod,
	SortingBenchmarkResponse,
	CloneBenchmarkResponse,
};
