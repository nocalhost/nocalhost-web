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
