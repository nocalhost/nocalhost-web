import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import { DataProvider, GetListParams } from 'ra-core/esm/types';
import { Application } from '../types';

const apiUrl = 'http://127.0.0.1:8080/v1';
const httpClient = fetchUtils.fetchJson;

interface Result {
    status: number;
    headers: Headers;
    body: string;
    json: { code: number; message: string; data: any };
}

const Data: DataProvider = {
    getList: async (resource: string, params: GetListParams) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const options = {
            user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
        };

        return httpClient(url, options).then((result: Result) => {
            return {
                data: result.json.data,
                total: result.json.data.length,
            };
        });
    },

    getOne: async (resource, params) => {
        const options = {
            user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
        };
        if (resource === 'application') {
            return httpClient(`${apiUrl}/${resource}`, options).then((result: Result) => {
                const data = result.json.data.find((item: Application) => item.id == params.id);
                return {
                    data,
                };
            });
        }
        return httpClient(`${apiUrl}/${resource}/${params.id}`, options).then((result: Result) => {
            if (resource === 'cluster') {
                return { data: { ...result.json.data, id: result.json.data.cluster_id } };
            }
            return {
                data: result.json.data,
            };
        });
    },

    getMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: async (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }: any) => ({
            data: json,
            total: parseInt(headers.get('content-range').split('/').pop(), 10),
        }));
    },

    update: async (resource, params) => {
        const options = {
            user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
        };
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            ...options,
        }).then(({ json }) => ({ data: json }));
    },

    updateMany: async (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: async (resource, params) => {
        const options = {
            user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
        };
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            ...options,
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        }));
    },

    delete: async (resource, params) => {
        const options = {
            user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
        };
        return httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            ...options,
        }).then(({ json }) => ({ data: json }));
    },

    deleteMany: async (resource: any, params: any) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },
};

export default Data;
