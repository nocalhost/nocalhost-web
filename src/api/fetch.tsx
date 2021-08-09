import 'whatwg-fetch';
import * as qs from 'query-string';
import { message } from 'antd';
interface IRequestOptions {
    method?: string;
    body?: any;
}

// interface fetchType {
//     json
// }

// 当前是否正在重新获取token
let isRefreshing = true;

export async function fetchJson(url: string, options?: IRequestOptions) {
    const headers = new Headers({
        authorization: url.startsWith('login') ? '' : `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': options?.method === 'GET' ? '' : 'application/json',
    });
    let apiUrl = '';
    const initOptions: IRequestOptions = {};
    initOptions.method = 'GET';
    // eslint-disable-next-line
    // @ts-ignore
    const apiHost = window._env_.API_HOST || window.location.origin;

    if (apiHost.indexOf('http') >= 0) {
        apiUrl = apiHost;
    } else {
        apiUrl = `http://${apiHost}/`;
    }

    let requestUrl = '';
    if (options?.method === 'GET') {
        const query = qs.stringify(options.body || {}, { arrayFormat: 'comma' });
        delete options.body;
        requestUrl = `${apiUrl}/v1/${url}?${query}`;
    } else {
        requestUrl = `${apiUrl}/v1/${url}`;
    }

    const res = await fetch(requestUrl, {
        ...options,
        headers,
    }).then((res) => res.json());
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
    return res;
}

class HTTP {
    async get(url: string, data?: any) {
        return await fetchJson(url, { method: 'GET', body: data });
    }
    async post(url: string, data?: any) {
        return await fetchJson(url, { method: 'POST', body: JSON.stringify(data) });
    }
    async put(url: string, data?: any) {
        return await fetchJson(url, { method: 'PUT', body: JSON.stringify(data) });
    }
    async delete(url: string, data?: any) {
        return await fetchJson(url, { method: 'DELETE', body: JSON.stringify(data) });
    }
}

export default new HTTP();
