export type AccessRightType =
	| "notify"
	| "friends"
	| "photos"
	| "audio"
	| "video"
	| "stories"
	| "pages"
	| "leftLink"
	| "status"
	| "notes"
	| "messages"
	| "wall"
	| "ads"
	| "offline"
	| "docs"
	| "groups"
	| "notifications"
	| "stats"
	| "email"
	| "market"
	| "app_widget"
	| "manage";

export interface IVKAPIStatus {
	section: string;
	performance: number;
	uptime: number;
}

export interface ICheckToken {
	type: "user" | "group";
	id: number;
	accessRights: AccessRightType[];
}

export interface IAccessRights {
	user: Array<{
		right: AccessRightType;
		mask: number;
	}>;
	group: Array<{
		right: AccessRightType;
		mask: number;
	}>;
}

export interface IArticleGetByUrl {
	id: number;
	owner_id: number;
	raw_id: string;
	access_hash: string;
	title: string;
	subtitle: string;
	published: Date;
	views: number;
	views_formatted: string;
	shares: number;
	shares_formatted: string;
	url: string;
}

interface IGift {
	gift: {
		id: number;
		thumb_256: string;
		thumb_48: string;
		thumb_96: string;
		keywords?: string;
		stickers_product_id?: number;
	};
	description: string;
	payment_type: string;
	price: number;
	price_str: string;
	sticker_pack?: {
		title: string;
		description: string;
		author: string;
	};
	gifts_left?: number;
	real_price?: number;
	disabled?: number;
}

export interface IGiftsGetCatalogResponse {
	name: string;
	title: string;
	items: IGift[];
}

export interface IUserStickerPack {
	id: number;
	name: string;
	description: string;
	author: string;
	price: number;
	thumb_256: string;
	thumb_48: string;
	thumb_96: string;
}

export interface IGetUserStickerPacks {
	id: number;
	total_price: number;
	items: IUserStickerPack[];
}

interface IStoreGetStickersKeywordsSticker {
	sticker_id: number;
	images: {
		height: number;
		width: number;
		url: string;
	}[];
	images_with_background: {
		height: number;
		width: number;
		url: string;
	}[];
}

interface IStoreGetStickersKeywordsDictionary {
	words: string[];
	user_stickers: IStoreGetStickersKeywordsSticker[];
	promoted_stickers?: IStoreGetStickersKeywordsSticker[];
}
export interface IStoreGetStickersKeywords {
	count: number;
	dictionary: IStoreGetStickersKeywordsDictionary[];
}

export interface IStoreGetStickersKeywordsWord {
	word: string;
	stickers: IStoreGetStickersKeywordsSticker[];
}

export interface IStoreGetStickersKeywordsNumber {
	sticker_id: number | number[];
	words: string[];
}
