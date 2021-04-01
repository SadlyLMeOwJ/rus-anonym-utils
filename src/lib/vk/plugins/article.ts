import axios from "axios";
import { regular } from "./../../regular/core";

export class VK_Article {
	/**
	 * Получить данные о статье по ссылке
	 * @param articleLink - Ссылка на статью
	 * @return данные статьи
	 */
	public async getByURL(
		articleLink: string,
	): Promise<{
		id: number;
		owner_id: number;
		access_hash: string;
		title: string;
		subtitle: string;
		published: Date;
		views: number;
		shares: number;
	}> {
		articleLink = articleLink.replace("https://m.", "https://");
		if (regular.isURL(articleLink) === false) {
			throw new Error(`Invalid article link`);
		} else {
			try {
				let data = await (await axios.get(articleLink)).data;
				let position1 = await data.indexOf(`Article.init({"id":`);
				let position2 = await data.indexOf(`</script></div>`, position1);
				data = data.substring(position1, position2);
				position1 = 13;
				position2 = await data.indexOf(`, {`);
				data = data.substring(position1, position2);
				const articleData = JSON.parse(data);
				return {
					id: articleData.id,
					owner_id: articleData.owner_id,
					access_hash: articleData.access_hash,
					title: articleData.title,
					subtitle: articleData.subtitle,
					published: new Date(articleData.published_date * 1000),
					views: articleData.views,
					shares: articleData.shares,
				};
			} catch (error) {
				throw new Error(`Invalid article`);
			}
		}
	}
}

export const article = new VK_Article();
