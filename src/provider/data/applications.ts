import { Result } from '../../types';

export const getAuthAppUsers = async (
    apiUrl: string,
    appId: string,
    isAuth: boolean,
    httpClient: (url: any, options?: any) => Promise<any>
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = `${apiUrl}/application/${appId}/${isAuth ? 'users' : '!users'}`;
    return httpClient(url, options).then((result: Result) => {
        return {
            data: result.json.data,
        };
    });
};

export const authApp = async (
    apiUrl: string,
    appId: string,
    ispublic: boolean,
    httpClient: (url: any, options?: any) => Promise<any>
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = `${apiUrl}/application/${appId}/public`;
    return httpClient(url, {
        method: 'PUT',
        body: JSON.stringify({ public: ispublic ? 1 : 0 }),
        ...options,
    }).then((result: Result) => {
        return {
            data: result.json.data,
        };
    });
};

export const addAuthAppUser = async (
    apiUrl: string,
    appId: string,
    users: Array<number>,
    httpClient: (url: any, options?: any) => Promise<any>
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = `${apiUrl}/application/${appId}/users`;
    return httpClient(url, {
        method: 'POST',
        body: JSON.stringify({ users }),
        ...options,
    }).then((result: Result) => {
        return {
            data: result.json.data,
        };
    });
};

export const deleteAuthAppUser = async (
    apiUrl: string,
    appId: string,
    users: Array<number>,
    httpClient: (url: any, options?: any) => Promise<any>
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = `${apiUrl}/application/${appId}/users`;
    return httpClient(url, {
        method: 'DELETE',
        body: JSON.stringify({ users }),
        ...options,
    }).then((result: Result) => {
        return {
            data: result.json.data,
        };
    });
};
