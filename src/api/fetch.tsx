import 'whatwg-fetch';
import * as qs from 'query-string';
import { message } from 'antd';

// import { get } from 'lodash';

interface IRequestOptions extends RequestInit {
    method?: string;
    body?: any;
    config?: any;
}

// 当前是否正在重新获取token
let isRefreshing = true;

function checkStatus(res: any) {
    if (res.status >= 200 && res.status < 300) {
        return res;
    }
    const error = new Error(res.statusText);
    throw error;
}

export async function fetchJson<T = any>(url: string, options?: IRequestOptions) {
    const headers = new Headers({
        authorization: url.startsWith('login') ? '' : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
    });

    if (options?.method === 'GET' || options?.body instanceof FormData) {
        headers.delete('Content-Type');
    }

    let apiUrl = '';
    const initOptions: IRequestOptions = {};
    initOptions.method = 'GET';
    // eslint-disable-next-line
    // @ts-ignore
    const apiHost = window._env_?.API_HOST || window.location.origin;

    if (apiHost.indexOf('http') >= 0) {
        apiUrl = apiHost;
    } else {
        apiUrl = `http://${apiHost}/`;
    }

    let requestUrl = '';
    if (options?.method === 'GET') {
        const query = qs.stringify(options.body || {}, { arrayFormat: 'comma' });
        delete options.body;
        requestUrl = `${apiUrl}/${options?.config?.is_v2 ? 'v2' : 'v1'}/${url}${
            query ? '?' : ''
        }${query}`;
    } else {
        requestUrl = `${apiUrl}/${options?.config?.is_v2 ? 'v2' : 'v1'}/${url}`;
    }
    delete options?.config;
    try {
        const res = await fetch(requestUrl, {
            ...options,
            headers,
        })
            .then(checkStatus)
            .then((res) => {
                return res.json();
            });
        // eslint-disable-next-line
        // @ts-ignore
        if (res && res.code === 20103) {
            // token expire, refresh token

            if (isRefreshing) {
                isRefreshing = false;
                const headers = new Headers({
                    authorization: `Bearer ${localStorage.getItem('token')}`,
                    Reraeb: `${localStorage.getItem('refreshToken')}`,
                });

                const result = await fetch(`${apiUrl}/v1/token/refresh`, {
                    method: 'POST',
                    headers,
                }).then((res) => res.json());

                if (result && result.code === 0) {
                    const {
                        data: { token, refresh_token },
                    } = result;
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', refresh_token);
                    isRefreshing = true;
                    // Not good TODO
                    location.reload();
                } else {
                    location.replace('/login');
                    message.error('Invalid token.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    localStorage.removeItem('permissions');
                    localStorage.removeItem('userInfo');
                    localStorage.removeItem('refreshToken');
                    // return Promise.resolve({});
                }
            }
        }
        if (res && res.code !== 0) {
            message.error(res.message);
            // return Promise.reject(new Error(res.message));
        }
        return res as { code: number; data: T };
    } catch (error) {
        message.error(error.message);
        return Promise.reject({ code: -1, data: null });
    }
}

class HTTP {
    async get<T = any>(url: string, data?: any, config?: any) {
        return fetchJson<T>(url, { method: 'GET', body: data, config });
    }

    async post(url: string, data?: any, config?: any) {
        return fetchJson(url, { method: 'POST', body: JSON.stringify(data), config });
    }

    async put(url: string, data?: any, config?: any) {
        return fetchJson(url, { method: 'PUT', body: JSON.stringify(data), config });
    }

    async delete(url: string, data?: any, config?: any) {
        return fetchJson(url, { method: 'DELETE', body: JSON.stringify(data), config });
    }

    async fetch<T = any>(url: string, data?: any, options?: IRequestOptions) {
        options = options ?? {};
        return fetchJson<T>(url, { method: 'POST', body: data, ...options });
    }
}

export default new HTTP();
