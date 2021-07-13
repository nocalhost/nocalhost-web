import { fetchUtils, DataProvider, HttpError } from 'react-admin';
import data from './data';
import { REQUEST_TIMEOUT } from '../constants';
export interface IRequestOptions extends fetchUtils.Options {
    timeout?: number;
}

const withTimeout = function (
    url: any,
    options?: IRequestOptions | undefined
): Promise<{
    status: number;
    headers: Headers;
    body: string;
    json: any;
}> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(
                new HttpError('Request timeout, please check your networks and try again.', 408)
            );
        }, REQUEST_TIMEOUT);
        fetchUtils.fetchJson(url, options).then(resolve, reject);
    });
};

// 当前是否正在重新获取token
let isRefreshing = true;

async function fetchJson(url: any, options?: IRequestOptions | undefined) {
    let res;
    const headers = new Headers({
        authorization: `Bearer ${localStorage.getItem('token')}`,
    });
    if (options && options.timeout) {
        res = await withTimeout(url, {
            ...options,
            headers,
        });
    } else {
        res = await fetchUtils.fetchJson(url, {
            ...options,
            headers,
        });
    }
    if (res && res.json && res.json.code === 20103) {
        // token expire, refresh token
        let apiUrl = '';
        // eslint-disable-next-line
        // @ts-ignore
        const apiHost = window._env_.API_HOST || window.location.origin;
        if (apiHost.indexOf('http') >= 0) {
            apiUrl = apiHost;
        } else {
            apiUrl = `http://${apiHost}`;
        }
        if (isRefreshing) {
            isRefreshing = false;

            const headers = new Headers({
                authorization: `Bearer ${localStorage.getItem('token')}`,
                Reraeb: `${localStorage.getItem('refreshToken')}`,
            });

            const result = await fetchUtils.fetchJson(`${apiUrl}/v1/token/refresh`, {
                method: 'POST',
                headers,
            });

            if (result && result.json && result.json.code === 0) {
                const {
                    data: { token },
                } = result.json;
                localStorage.setItem('token', token);
                isRefreshing = true;
                // Not good TODO
                location.reload();
                res = await fetchUtils.fetchJson(url, {
                    ...options,
                    headers,
                });
            } else {
                location.hash = 'login';
                return Promise.reject(new HttpError('Invalid token.', 403));
            }
        }
    }
    return res;
}

export default (apiUrl: string, httpClient = fetchJson): DataProvider => {
    return {
        getList: (resource, params) => data.getList(apiUrl, httpClient, resource, params),
        getOne: (resource, params) => data.getOne(apiUrl, httpClient, resource, params),
        getMany: (resource, params) => data.getMany(apiUrl, httpClient, resource, params),
        getNHConfig: () => data.getNHConfig(apiUrl, httpClient),
        update: (resource, params) => data.update(apiUrl, httpClient, resource, params),
        create: (resource, params) => data.create(apiUrl, httpClient, resource, params),
        delete: (resource, params) => data.delete(apiUrl, httpClient, resource, params),
        // NO SUPPORT API
        deleteMany: async () => {
            throw Error('No support deleteMany');
        },
        getManyReference: async () => {
            throw Error('No support getManyReference');
        },
        updateMany: async () => {
            throw Error('No support updateMany');
        },
        getAuthAppUsers: (appId: string, isAuth: boolean) =>
            data.appApi.getAuthAppUsers(apiUrl, appId, isAuth, httpClient),
        authApp: (appId: string, ispublic: boolean) =>
            data.appApi.authApp(apiUrl, appId, ispublic, httpClient),
        addAuthAppUser: (appId: string, users: Array<number>) =>
            data.appApi.addAuthAppUser(apiUrl, appId, users, httpClient),
        deleteAuthAppUser: (appId: string, users: Array<number>) =>
            data.appApi.deleteAuthAppUser(apiUrl, appId, users, httpClient),
    };
};
