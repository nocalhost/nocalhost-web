import { Application, Cluster, Result } from '../../types';
import { GetManyParams, Record } from 'react-admin';
import { deserializeApplication, deserializeCluster } from './deserialize';

const getMany = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: GetManyParams
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = `${apiUrl}/${resource}`;
    return httpClient(url, options).then((result: Result) => {
        const listData = result.json.data;
        const filterList = listData.filter((l: Record) => params.ids.includes(l.id));
        let list;
        if (resource === 'cluster') {
            list = filterList.map((l: Cluster) => deserializeCluster(l));
        }
        if (resource === 'application') {
            list = filterList.map((l: Application) => deserializeApplication(l));
        }
        return {
            data: list ? list : [],
        };
    });
};

export default getMany;
