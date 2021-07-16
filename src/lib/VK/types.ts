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

    export interface IStickerPackInfo {
        id: number;
        price: number;
        title: string;
        author: string;
        description: string;
        copyright: string;
        url: string;
        isFree: boolean;
        isAnimation: boolean;
        isStyle: boolean;
    }

    export interface IUserStickerPack {
        id: number;
        purchaseDate: Date;
        isActive: boolean;
        isStyle: boolean;
    }

    export type IUserStickerPackExtend = IUserStickerPack & IStickerPackInfo;

    export interface IGetUserStickerPacksResponse {
        totalPrice: number;
        items: IUserStickerPackExtend[];
        stats: {
            total: number;
            free: number;
            paid: number;
            packs: {
                count: number;
                free: number;
                paid: number;
                simple: number;
                animated: number;
                freeSimple: number;
                paidSimple: number;
                freeAnimated: number;
                paidAnimated: number;
            };
            styles: {
                count: number;
                free: number;
                paid: number;
                simple: number;
                animated: number;
                freeSimple: number;
                paidSimple: number;
                freeAnimated: number;
                paidAnimated: number;
            };
        };
    }
}

export default VKUtils;
