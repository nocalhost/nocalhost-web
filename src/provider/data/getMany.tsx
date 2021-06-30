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
        try {
            const listData = result.json.data;
            const filterList = listData.filter((l: Record) => params.ids.includes(l.id));
            let list;
            if (resource === 'cluster') {
                list = filterList.map((l: Cluster) => deserializeCluster(l));
            } else if (resource === 'application') {
                list = filterList.map((l: Application) => deserializeApplication(l));
            } else {
                list = listData;
            }
            return {
                data: list ? list : [],
            };
        } catch (e) {
            // fix Associated reference no longer appears to be available
            return {
                data: [],
            };
        }
    });
};

export default getMany;
