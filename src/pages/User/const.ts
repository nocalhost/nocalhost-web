export interface UserType {
    name: string;
    id?: number;
    is_admin?: number;
}

export type SelectValue = 'all' | 'admin' | 'user';
