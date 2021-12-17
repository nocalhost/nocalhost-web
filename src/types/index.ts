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

// space data
export interface ISpaceData {
    base_dev_space_id: number;
    base_dev_space_name: string;
    base_dev_space_namespace: string;
    cluster_admin: number;
    cluster_id: number;
    cluster_name: string;
    cooper_user: string[];
    created_at: string;
    deletable: boolean;
    id: number;
    is_base_space: boolean;
    modifiable: boolean;
    namespace: string;

    owner: {
        avatar: string;
        cluster_admin: boolean;
        email: string;
        id: number;
        is_admin: 1 | 0;
        name: string;
        phone: string;
        status: number;
        username: string;
    };

    resource_limit_set: boolean;
    sleep_at: string | Date;
    sleep_config: null;
    sleep_minute: number;
    sleep_status: string;
    space_name: string;

    space_own_type: {
        Priority: number;
        Str: string;
    };

    space_resource_limit: string;
    space_type: 'IsolateSpace' | 'MeshSpace';
}
