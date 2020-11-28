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
        const list = result.json.data;
        const newList = list.filter((l: Record) => params.ids.includes(l.id));
        if (resource === 'cluster') {
            const result = newList.map((l: Cluster) => deserializeCluster(l));
            return {
                data: result,
            };
        }
        if (resource === 'application') {
            const result = newList.map((l: Application) => deserializeApplication(l));
            return {
                data: result,
            };
        }
        return {
            data: newList,
        };
    });
};

export default getMany;
