import { CreateParams } from 'react-admin';
import { Result } from '../../types';

const create = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: CreateParams
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    if (resource === 'space') {
        if (!params.data.isLimit) {
            params.data['space_resource_limit'] = {};
        }
        return httpClient(`${apiUrl}/application/${params.data.application_id}/create_space`, {
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
