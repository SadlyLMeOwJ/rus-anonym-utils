type TSortingAlgorithm =
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

type TCloneMethod =
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

interface ISortingBenchmarkResponse {
    fastest: {
        algorithm: TSortingAlgorithm;
        rate: number;
    };
    slowest: {
        algorithm: TSortingAlgorithm;
        rate: number;
    };
    summary: Record<TSortingAlgorithm, number>;
    totalTime: number;
    sourceArray: number[];
    sortedArray: number[];
}

interface ICloneBenchmarkResponse<T> {
    fastest: {
        method: TCloneMethod;
        rate: number;
    };
    slowest: {
        method: TCloneMethod;
        rate: number;
    };
    summary: Record<TCloneMethod, number>;
    totalTime: number;
    sourceArray: T[] | number[];
    copiedArray: T[] | number[];
}

type TComparisonOperators = ">" | "<";

export {
    TSortingAlgorithm,
    TCloneMethod,
    ISortingBenchmarkResponse,
    ICloneBenchmarkResponse,
    TComparisonOperators,
};
