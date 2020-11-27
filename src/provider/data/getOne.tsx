import searchToObj from '../../utils/searchToObj';
import { Result } from '../../types';
import { GetOneParams } from 'react-admin';

const getOne = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: GetOneParams
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    if (resource === 'space') {
        const hash = window.location.hash;
        const search = hash.substring(hash.indexOf('?'));
        const p = searchToObj(search);
        const spaceUrl = `${apiUrl}/cluster/${p.cluster}/dev_space/${params.id}/detail`;
        return httpClient(spaceUrl, options).then((result: Result) => {
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
                data: {
                    ...data,
                    status: data.status === 1,
                    id: data.id,
                    context: JSON.parse(data.context),
                },
            };
        }
        return {
            data: result.json.data,
        };
    });
};

export default getOne;
