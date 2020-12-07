import searchToObj from '../../utils/searchToObj';
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
    if (resource === 'space') {
        const hash = window.location.hash;
        const search = hash.substring(hash.indexOf('?'));
        const p = searchToObj(search);
        url = `${apiUrl}/cluster/${p.cluster}/dev_space/${params.id}/detail`;
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
