import { array } from "./../array/core";
/* eslint-disable jsdoc/require-example */

import axios from "axios";
import cheerio from "cheerio";
import moment from "moment";

import UtilsError from "../../utils/error";
import { regular } from "./../regular/core";

import { DayStat, IPDownload } from "./types";

export class TorrentUtils {
	/**
	 * @description Позволяет узнать загрузки в торрент сети с этого IP
	 * @param {string} IP IP адрес
	 * @param {string=} locale  локаль, по умолчанию en
	 * @returns {Promise.<Array.<IPDownload>>} массив с данными
	 */
	public async getDownloads(IP: string, locale = "en"): Promise<IPDownload[]> {
		if (!regular.isIP(IP)) {
			throw new UtilsError("IP is not valid");
		}

		const IPDownloads = await axios.get(
			`https://iknowwhatyoudownload.com/${locale}/peer/?ip=${IP}`,
		);

		const $ = cheerio.load(await IPDownloads.data);

		const downloadsList = $(
			"#main > div > div > div > div:nth-child(5) > table > tbody",
		);

		const downloads: IPDownload[] = [];

		downloadsList.children().each(function downloadParser(_index, element) {
			const selectedDownload = $(element);

			const parsedDownload: IPDownload = {
				first: $(selectedDownload.children()[0]).text(),
				last: $(selectedDownload.children()[1]).text(),
				name: $(selectedDownload.children()[3]).text().trim(),
				size: $(selectedDownload.children()[4]).text(),
			};

			const downloadType = $(selectedDownload.children()[2]).text();

			if (downloadType !== "") {
				parsedDownload.type = $(selectedDownload.children()[2]).text();
			}

			downloads.push(parsedDownload);
		});

		return downloads;
	}

	/**
	 * @description Позволяет получить статистику торрент сети по дню
	 * @param {string} countryCode код страны
	 * @param {Date=} date дата на которую нужна статистика
	 * @param {string=} locale локаль
	 * @returns {Promise.<Array.<DayStat>>} данные статистики за день
	 */
	public async dayStat(
		countryCode: string,
		date = new Date(),
		locale = "en",
	): Promise<DayStat> {
		const selectedDate = moment(date).format("YYYY-MM-DD");
		const dayStat = await axios.get(
			`https://iknowwhatyoudownload.com/${locale}/stat/${countryCode}/daily/q?statDate=${selectedDate}`,
		);
		const dayStatHTML = await dayStat.data;

		if (dayStatHTML === "") {
			throw new UtilsError("As of this date, there are no statistics yet");
		}

		const $ = cheerio.load(dayStatHTML);

		const country = $(
			"body > div.container > div:nth-child(1) > div > h3 > a:nth-child(1)",
		)
			.text()
			.trim();

		const peopleDownloadingTorrents = $(
			"body > div.container > div.row.paddingBottom > div:nth-child(1) > span.usePercent",
		)
			.text()
			.trim();

		const populationHaveInternetPercents = $(
			"body > div.container > div.row.paddingBottom > div:nth-child(2) > span.usePercent",
		)
			.text()
			.trim();

		const populationDownloadingTorrentsPercents = $(
			"body > div.container > div.row.paddingBottom > div:nth-child(3) > span.usePercent",
		)
			.text()
			.trim();

		const topTorrents = array.removeFalseValues(
			$("#general")
				.text()
				.split("\n")
				.map((x) => x.trim()),
		);

		const topMovies = array.removeFalseValues(
			$("#movie")
				.text()
				.split("\n")
				.map((x) => x.trim()),
		);

		const topPorno = array.removeFalseValues(
			$("#xxx")
				.text()
				.split("\n")
				.map((x) => x.trim()),
		);

		const topGames = array.removeFalseValues(
			$("#games")
				.text()
				.split("\n")
				.map((x) => x.trim()),
		);

		const topSoftware = array.removeFalseValues(
			$("#software")
				.text()
				.split("\n")
				.map((x) => x.trim()),
		);

		const topMusic = array.removeFalseValues(
			$("#music")
				.text()
				.split("\n")
				.map((x) => x.trim()),
		);

		return {
			country,
			peopleDownloadingTorrents: Number(peopleDownloadingTorrents),
			populationHaveInternetPercents: parseFloat(
				populationHaveInternetPercents,
			),
			populationDownloadingTorrentsPercents: parseFloat(
				populationDownloadingTorrentsPercents,
			),
			top: {
				torrents: topTorrents,
				movies: topMovies,
				porno: topPorno,
				games: topGames,
				software: topSoftware,
				music: topMusic,
			},
		};
	}
}

export const torrent = new TorrentUtils();
