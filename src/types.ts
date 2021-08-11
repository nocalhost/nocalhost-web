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
