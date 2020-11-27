import { UpdateParams } from 'react-admin';
import { Result } from '../../types';

const update = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: UpdateParams
) => {
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
};

export default update;
