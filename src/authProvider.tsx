import { AuthProvider } from 'ra-core/esm/types';
import decodeJwt from 'jwt-decode';

const apiUrl = 'http://127.0.0.1:8080/v1';

const Auth: AuthProvider = {
    login: ({ username, password }: any) => {
        const request = new Request(`${apiUrl}/login`, {
            method: 'POST',
            body: JSON.stringify({ email: username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((result: any) => {
                console.log(result);
                const decodedToken: any = decodeJwt(result.data.token);
                localStorage.setItem('token', result.data.token);
                localStorage.setItem('username', decodedToken.email);
            });
    },
    logout: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }: any) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('username');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('username') ? Promise.resolve() : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};

export default Auth;
