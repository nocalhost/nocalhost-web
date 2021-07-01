// import { UpdateParams } from 'react-admin';
import { Result } from '../../types';

import { formatMeshInfo } from './create';

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
    if (value !== undefined && value !== null && value !== '') {
        obj[key] = `${value}${getUnit(key)}`;
    } else {
        delete obj[key];
    }
};

const update = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: any
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    let url = `${apiUrl}/${resource}/${params.id}`;
    if (resource === 'resourceLimit') {
        url = `${apiUrl}/dev_space/${params.id}/update_resource_limit`;
        delete params.data.id;
        const resourceLimit = params.data;
        for (const key in resourceLimit) {
            if (Object.prototype.hasOwnProperty.call(resourceLimit, key)) {
                formatResourceLimit(resourceLimit, key);
            }
        }
    }

    if (resource === 'resourceMeshInfo') {
        const { id, mesh_dev_info } = params;
        url = `${apiUrl}/dev_space/${id}/update_mesh_dev_space_info`;
        params.data = formatMeshInfo(mesh_dev_info);
    }

    return httpClient(url, {
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
};

export default update;
