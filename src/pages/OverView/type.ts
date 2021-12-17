export interface HType {
    mb?: string;
    bg?: string;
    bold?: boolean;
    height?: string;
}
export interface FlexType {
    mb?: string;
}

export interface ClusterItemType {
    storage_class: string;
    id: number;
    info: string;
    name: string;
    created_at: string;
    user_id: number;
    users_count: number;
}
