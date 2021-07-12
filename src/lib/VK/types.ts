namespace VKUtils {
    export type TAccessRightType =
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
        accessRights: TAccessRightType[];
    }

    export interface IAccessRights {
        user: Array<{
            right: TAccessRightType;
            mask: number;
        }>;
        group: Array<{
            right: TAccessRightType;
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
}

export default VKUtils;
