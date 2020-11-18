import { AuthProvider } from 'ra-core/esm/types';
import decodeJwt from 'jwt-decode';
import md5 from 'js-md5';
import { LoginToken } from '../types';

export default (apiUrl: string): AuthProvider => ({
    login: async ({ username, password }) => {
        const request = new Request(`${apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        const resp = await fetch(request);
        if (resp.status < 200 || resp.status >= 300) {
            throw new Error(resp.statusText);
        }
        const login = await resp.json();
        const token = login.data.token;
        const decodeToken: any = decodeJwt(token);
        const loginToken: LoginToken = decodeToken;
        localStorage.setItem('token', token);
        localStorage.setItem('username', loginToken.email);
        localStorage.setItem('permissions', loginToken.is_admin === 1 ? 'admin' : 'user');
        localStorage.setItem('userInfo', JSON.stringify(loginToken));

        const getUserRequest = new Request(`${apiUrl}/me`, {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }),
        });
        const getUserResp = await fetch(getUserRequest);
        if (getUserResp.status < 200 || getUserResp.status >= 300) {
            throw new Error(getUserResp.statusText);
        }
        const data = await getUserResp.json();
        const user = data.data;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userId', user.id);
    },
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () => {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    },
    getIdentity: () => {
        const id = parseInt(localStorage.getItem('userId') || '0');
        const email = localStorage.getItem('username') || '';
        const avatar = `https://www.gravatar.com/avatar/${md5(email)}`;
        return Promise.resolve({
            id,
            avatar,
            fullName: email,
        });
    },
});
