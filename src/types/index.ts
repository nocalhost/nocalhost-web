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

export interface ConfigInfo {
    admin_base_dn: string;
    admin_filter: string;
    base_dn: string;
    bind_dn: string;
    costs: number;
    created_at: string;
    deletes: number;
    email_attr: string;
    enable: number;
    entries: number;
    fails: number;
    filter: string;
    id: number;
    inserts: number;
    last_sync_err_msg: string;
    ldap_gen: number;
    md5: string;
    password: string;
    server: string;
    sync_protection_ts: number;
    tls: string;
    updates: number;
    user_name_attr: string;
}
