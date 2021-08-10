export interface ClusterItemInfo {
    id: number;
    info: string;
    name: string;
    server: string;
    storage_class: string;
    has_dev_space: boolean;
    users_count: number;
    created_at: string;
    user_id: number;
    userName: string;
    resources: {
        [key: string]: any;
        capacity: number;
        percentage: number;
        resource_name: string;
        used: number;
    }[];
}
