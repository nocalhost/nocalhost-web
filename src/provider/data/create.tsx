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
};

export default create;
