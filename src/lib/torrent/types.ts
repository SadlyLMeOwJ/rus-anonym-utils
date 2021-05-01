interface IPDownload {
	first: string;
	last: string;
	name: string;
	size: string;
	type?: string;
}

interface DayStat {
	country: string;
	peopleDownloadingTorrents: number;
	populationHaveInternetPercents: number;
	populationDownloadingTorrentsPercents: number;
	top: {
		torrents: string[];
		movies: string[];
		porno: string[];
		games: string[];
		software: string[];
		music: string[];
	};
}

export { IPDownload, DayStat };
