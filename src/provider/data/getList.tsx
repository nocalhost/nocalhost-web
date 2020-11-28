import { stringify } from 'query-string';
import searchToObj from '../../utils/searchToObj';
import { Application, Result, Cluster } from '../../types';
import { GetListParams } from 'react-admin';
import { deserializeApplication, deserializeCluster } from './deserialize';

const getList = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: GetListParams
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
        sort: JSON.stringify([field, order]),
        range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        filter: JSON.stringify(params.filter),
    };
    let url = `${apiUrl}/${resource}?${stringify(query)}`;
    if (resource === 'dev_space') {
        const hash = window.location.hash;
        const search = hash.substring(hash.indexOf('?'));
        const p = searchToObj(search);
        url = `${apiUrl}/cluster/${p.cluster}/dev_space`;
    }
    if (resource === 'space') {
        const hash = window.location.hash;
        const search = hash.substring(hash.indexOf('?'));
        const p = searchToObj(search);
        url = `${apiUrl}/application/${p.application}/dev_space_list`;
    }

    return httpClient(url, options).then((result: Result) => {
        if (resource === 'cluster') {
            const list = result.json.data;
            const newList = list.map((l: Cluster) => deserializeCluster(l));
            return {
                data: newList,
                total: newList.length,
            };
        }
        if (resource === 'application') {
            const list = result.json.data;
            const newList = list.map((l: Application) => deserializeApplication(l));
            return {
                data: newList,
                total: newList.length,
            };
        }
        const list = result.json.data;
        return {
            data: list ? list : [],
            total: list ? list.length : 0,
        };
    });
};

export default getList;
