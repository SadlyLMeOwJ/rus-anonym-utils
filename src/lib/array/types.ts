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

interface CloneBenchmarkResponse<T> {
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
	sourceArray: T[] | number[];
	copiedArray: T[] | number[];
}

type TComparisonOperators = ">" | "<";

export {
	sortingAlgorithm,
	cloneMethod,
	SortingBenchmarkResponse,
	CloneBenchmarkResponse,
	TComparisonOperators,
};
