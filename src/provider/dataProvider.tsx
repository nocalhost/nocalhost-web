import { fetchUtils, DataProvider, Record } from 'react-admin';
import { stringify } from 'query-string';
import { Application } from '../types';

interface Result {
    status: number;
    headers: Headers;
    body: string;
    json: { code: number; message: string; data: any };
}

export default (apiUrl: string, httpClient = fetchUtils.fetchJson): DataProvider => ({
    getList: async (resource: string, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify(params.filter),
        };
        const options = {
            user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        if (resource === 'application') {
            return httpClient(url, options).then((result: Result) => {
                const list = result.json.data;
                const newList = list.map((l: Application) => {
                    return { id: l.id, status: l.status, context: JSON.parse(l.context) };
                });
                return {
                    data: newList,
                    total: newList.length,
                };
            });
        }

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
        if (resource === 'space') {
            const spaceGetListUrl = `${apiUrl}/cluster/${params.id}/dev_space`;
            return httpClient(spaceGetListUrl, options).then((result: Result) => {
                return {
                    data: {
                        ...result.json.data,
                        id: params.id,
                        status: result.json.data.status === 1,
                    },
                };
            });
        }
        let url = `${apiUrl}/${resource}/${params.id}`;
        if (resource === 'cluster') {
            url = `${url}/detail`;
        }
        return httpClient(url, options).then((result: Result) => {
            if (resource === 'application') {
                const data = result.json.data;
                return {
                    data: { status: data.status, id: data.id, context: JSON.parse(data.context) },
                };
            }
            return {
                data: result.json.data,
            };
        });
    },

    getMany: async (resource, params) => {
        const url = `${apiUrl}/${resource}`;
        const options = {
            user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
        };
        return httpClient(url, options).then((result: Result) => {
            const list = result.json.data;
            const newList = list.filter((l: Record) => params.ids.includes(l.id));
            if (resource === 'application') {
                const result = newList.map((l: Application) => {
                    return { id: l.id, status: l.status, context: JSON.parse(l.context) };
                });
                return {
                    data: result,
                };
            }
            return {
                data: newList,
            };
        });
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
        }).then((result: Result) => {
            const json = result.json;
            if (json.code === 0) {
                return {
                    data: json.data,
                };
            } else {
                throw Error(json.message);
            }
        });
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
        if (resource === 'space') {
            const space = {
                cluster_id: params.data.cluster_id,
                cpu: params.data.cpu,
                memory: params.data.memory,
                user_id: params.data.user_id,
            };
            return httpClient(`${apiUrl}/application/${params.data.application_id}/create_space`, {
                method: 'POST',
                body: JSON.stringify(space),
                ...options,
            }).then((result: Result) => {
                const json = result.json;
                if (json.code === 0) {
                    return {
                        data: { ...params.data, id: json.data.id },
                    };
                } else {
                    throw Error(json.message);
                }
            });
        }
        return httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            ...options,
        }).then((result: Result) => {
            const json = result.json;
            if (json.code === 0) {
                return {
                    data: json.data,
                };
            } else {
                throw Error(json.message);
            }
        });
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
});
