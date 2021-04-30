/* eslint-disable jsdoc/require-example */

import axios from "axios";
import cheerio from "cheerio";

import UtilsError from "../../utils/error";
import { regular } from "./../regular/core";

import { IPDownload } from "./types";

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
}

export const torrent = new TorrentUtils();
