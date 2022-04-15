import HTTP from '../api/fetch';

export const queryAllUser = async () => {
    const response = await HTTP.get('users');
    const { data, code } = response;
    const nameMap = new Map();
    if (code === 0) {
        data.forEach((item: any) => {
            nameMap.set(item.id, item.name);
        });
    }
    return nameMap;
};

export interface UserType {
    id: number;
    name: string;
}

export const getAllUser = async () => {
    const response = await HTTP.get<Array<UserType>>('users');
    const { data, code } = response;
    if (code === 0) {
        return data as Array<UserType>;
    }
    return [];
};

export const queryAllCluster = async () => {
    const response = await HTTP.get('dev_space/cluster', null, {
        is_v2: true,
    });
    const { data, code } = response;
    const map = new Map();
    if (code === 0) {
        data.forEach((item: any) => {
            map.set(item.id, item.name);
        });
    }
    return map;
};
