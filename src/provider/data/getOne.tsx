// import searchToObj from '../../utils/searchToObj';
import { Result } from '../../types';
import { GetOneParams } from 'react-admin';
import { deserializeApplication, deserializeCluster } from './deserialize';

const getOne = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: GetOneParams
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    let url = `${apiUrl}/${resource}/${params.id}`;
    if (resource === 'cluster') {
        url = `${url}/detail`;
    }
    if (['myDevSpace', 'space'].includes(resource)) {
        url = `${apiUrl}/dev_space/${params.id}/detail`;
    }
    if (resource === 'profile') {
        url = `${apiUrl}/me`;
    }
    return httpClient(url, options).then((result: Result) => {
        if (resource === 'cluster') {
            return {
                data: deserializeCluster(result.json.data),
            };
        }
        if (resource === 'application') {
            return {
                data: deserializeApplication(result.json.data),
            };
        }
        if (resource === 'space') {
            return { data: { ...result.json.data, status: result.json.data.status === 1 } };
        }
        return {
            data: result.json.data,
        };
    });
};

export default getOne;
