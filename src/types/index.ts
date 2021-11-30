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
    modifiable: boolean;
    resources: {
        [key: string]: any;
        capacity: number;
        percentage: number;
        resource_name: string;
        used: number;
    }[];
}

export interface IOption {
    label: string;
    value: string | number;
}

export interface LoginToken {
    email: string;
    exp: number;
    iat: number;
    is_admin: number;
    nbf: number;
    user_id: number;
    username: string;
    uuid: string;
}
