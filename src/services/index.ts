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
