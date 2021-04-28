/**
 * @module VK
 */

import { VK_User, user } from "./plugins/user";
import { VK_Group, group } from "./plugins/group";
import { VK_Article, article } from "./plugins/article";
import { VK_API, api } from "./plugins/api";

export class VK {
	/**
	 * Секция для работы с API
	 */
	public api: VK_API = api;
	/**
	 * Секция для работы с статьями
	 */
	public article: VK_Article = article;
	/**
	 * Секция требующая токена пользователя
	 */
	public user: VK_User = user;
	/**
	 * Секция требующая токена группы
	 */
	public group: VK_Group = group;
}

export const vk = new VK();
