import HTTP from '../api/fetch';

export const queryAllUser = async () => {
    const response = await HTTP.get('users');
    const { data } = response;
    const nameMap = new Map();
    data.forEach((item: any) => {
        nameMap.set(item.id, item.name);
    });
    return nameMap;
};

export const queryAllCluster = async () => {
    const response = await HTTP.get('cluster');
    const { data } = response;
    const map = new Map();
    data.forEach((item: any) => {
        map.set(item.id, item.name);
    });
    return map;
};
