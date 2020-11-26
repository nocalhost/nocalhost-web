import { ReduxState, Record, Identifier } from 'react-admin';

export interface AppState extends ReduxState {}

export interface StringMap {
    [key: string]: StringMap | string | undefined;
}

export interface LoginToken {
    email: string;
    exp: number;
    iat: number;
    is_admin: number;
    nbf: number;
    user_id: Identifier;
    username: string;
    uuid: string;
}

export interface User extends Record {
    avatar: string;
    email: string;
    id: Identifier;
    status: number;
    username: string;
    password?: string;
    password_confrim?: string;
}

export interface Application extends Record {
    context: string;
    id: Identifier;
    status: number;
}

export interface ApplicationContext {
    application_name: string;
    application_url: string;
    source: string;
    install_type: string;
    resource_dir: string;
}

export interface Cluster extends Record {
    cluster_mark: string;
    cluster_name: string;
    created_at: string;
    id: Identifier;
    cluster_id?: Identifier;
    info: string;
    users_count: number;
}

export interface ClusterInfo {
    cluster_version: string;
    nodes: string;
}
