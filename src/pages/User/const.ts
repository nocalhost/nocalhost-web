export const userOptions = [
    { value: 'all', text: '全部' },
    { value: 'user', text: '用户' },
    { value: 'admin', text: '管理员' },
];

export interface UserType {
    name: string;
    id?: number;
}
