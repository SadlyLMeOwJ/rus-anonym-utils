import { VK_User, user } from "./plugins/user";
import { VK_Group, group } from "./plugins/group";
import { VK_Article, article } from "./plugins/article";
import { VK_API, api } from "./plugins/api";

/**
 * @category VK
 * @description Класс для работы с VK
 * @hideconstructor
 */
export class VKUtils {
	/**
	 * @description Секция для работы с API
	 */
	public api: VK_API;

	/**
	 * @description Секция для работы с статьями
	 */
	public article: VK_Article;

	/**
	 * @description Секция требующая токена пользователя
	 */
	public user: VK_User;

	/**
	 * @description Секция требующая токена группы
	 */
	public group: VK_Group;

	constructor() {
		this.api = api;
		this.article = article;
		this.user = user;
		this.group = group;
	}
}

export const vk = new VKUtils();
