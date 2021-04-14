import { CreateParams } from 'react-admin';
import { Result } from '../../types';

const formatResourceLimit = (obj: any, key: string) => {
    const value = obj[key];
    function getUnit(key: string) {
        const Mi = [
            'space_limits_mem',
            'container_limits_mem',
            'container_req_mem',
            'space_req_mem',
        ];
        const Gi = ['space_storage_capacity'];
        let unit = '';
        if (Mi.includes(key)) {
            unit = 'Mi';
        } else if (Gi.includes(key)) {
            unit = 'Gi';
        }

        return unit;
    }
    if (value !== undefined && value !== null) {
        obj[key] = `${value}${getUnit(key)}`;
    }
};

const create = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: CreateParams
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    if (resource === 'devspace') {
        if (!params.data.isLimit || params.data.cluster_admin) {
            params.data.isLimit = false;
            params.data.cluster_admin = 1;
            params.data['space_resource_limit'] = {};
        } else {
            params.data.cluster_admin = 0;
            const resourceLimit = params.data['space_resource_limit'];
            for (const key in resourceLimit) {
                if (Object.prototype.hasOwnProperty.call(resourceLimit, key)) {
                    formatResourceLimit(resourceLimit, key);
                }
            }
        }
        return httpClient(`${apiUrl}/dev_space`, {
            method: 'POST',
            body: JSON.stringify(params.data),
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
};

export default create;
