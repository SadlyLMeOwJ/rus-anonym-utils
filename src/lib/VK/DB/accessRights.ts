import { IAccessRights } from "../types";

export const accessRights: IAccessRights = {
	user: [
		{
			right: "notify",
			mask: 1 << 0,
		},
		{
			right: "friends",
			mask: 1 << 1,
		},
		{
			right: "photos",
			mask: 1 << 2,
		},
		{
			right: "audio",
			mask: 1 << 3,
		},
		{
			right: "video",
			mask: 1 << 4,
		},
		{
			right: "stories",
			mask: 1 << 6,
		},
		{
			right: "pages",
			mask: 1 << 7,
		},
		{
			right: "leftLink",
			mask: 1 << 8,
		},
		{
			right: "status",
			mask: 1 << 10,
		},
		{
			right: "notes",
			mask: 1 << 11,
		},
		{
			right: "messages",
			mask: 1 << 12,
		},
		{
			right: "wall",
			mask: 1 << 13,
		},
		{
			right: "ads",
			mask: 1 << 15,
		},
		{
			right: "offline",
			mask: 1 << 16,
		},
		{
			right: "docs",
			mask: 1 << 17,
		},
		{
			right: "groups",
			mask: 1 << 18,
		},
		{
			right: "notifications",
			mask: 1 << 19,
		},
		{
			right: "stats",
			mask: 1 << 20,
		},
		{
			right: "email",
			mask: 1 << 22,
		},
		{
			right: "market",
			mask: 1 << 27,
		},
	],
	group: [
		{
			right: "stories",
			mask: 1 << 0,
		},
		{
			right: "photos",
			mask: 1 << 2,
		},
		{
			right: "app_widget",
			mask: 1 << 6,
		},
		{
			right: "messages",
			mask: 1 << 12,
		},
		{
			right: "docs",
			mask: 1 << 17,
		},
		{
			right: "manage",
			mask: 1 << 18,
		},
	],
};
