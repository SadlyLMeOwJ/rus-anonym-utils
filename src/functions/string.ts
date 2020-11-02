export function levenshtein( // ЧТО ЭТО БЛЯТЬ?
	s1: string | any[],
	s2: string | any[],
	costs?: { replace?: any; replaceCase?: any; insert?: any; remove?: any },
) {
	let l1: number,
		l2: number,
		flip: number,
		ch: string,
		chl: any,
		ii: number,
		ii2: number,
		cost: any,
		cutHalf: number;
	l1 = s1.length;
	l2 = s2.length;

	costs = costs || {};
	let cr = costs.replace || 1;
	let cri = costs.replaceCase || costs.replace || 1;
	let ci = costs.insert || 1;
	let cd = costs.remove || 1;

	cutHalf = flip = Math.max(l1, l2);

	let minCost = Math.min(cd, ci, cr);
	let minD = Math.max(minCost, (l1 - l2) * cd);
	let minI = Math.max(minCost, (l2 - l1) * ci);
	let buf = new Array(cutHalf * 2 - 1);

	for (let i = 0; i <= l2; ++i) {
		buf[i] = i * minD;
	}

	for (let i = 0; i < l1; ++i, flip = cutHalf - flip) {
		ch = s1[i];
		chl = ch.toLowerCase();

		buf[flip] = (i + 1) * minI;

		ii = flip;
		ii2 = cutHalf - flip;

		for (let j = 0; j < l2; ++j, ++ii, ++ii2) {
			cost = ch === s2[j] ? 0 : chl === s2[j].toLowerCase() ? cri : cr;
			buf[ii + 1] = Math.min(buf[ii2 + 1] + cd, buf[ii] + ci, buf[ii2] + cost);
		}
	}
	return buf[l2 + cutHalf - flip];
}

export function declOfNum(n: number, titles_array: { [x: string]: any }) {
	return titles_array[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
			? 1
			: 2
	];
}