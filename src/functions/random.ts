export interface GetRandomOptions {
	/**
	 * @default false
	 */
	inclusive?: boolean;

	/**
	 * @default false
	 */
	round?: boolean;
}

export function getRandom(
	min: number,
	max: number,
	options?: GetRandomOptions,
): number {
	if (!min && !max) return Math.random();
	if (options?.round) {
		min = Math.ceil(min);
		max = Math.floor(max);
	}
	if (options?.inclusive) {
		return Math.random() * (max - min + 1) + min;
	}
	return Math.random() * (max - min) + min;
}
