import { fetchUtils, DataProvider } from 'react-admin';
import data from './data';

export default (apiUrl: string, httpClient = fetchUtils.fetchJson): DataProvider => {
    return {
        getList: (resource, params) => data.getList(apiUrl, httpClient, resource, params),
        getOne: (resource, params) => data.getOne(apiUrl, httpClient, resource, params),
        getMany: (resource, params) => data.getMany(apiUrl, httpClient, resource, params),
        getNHConfig: () => data.getNHConfig(apiUrl, httpClient),
        update: (resource, params) => data.update(apiUrl, httpClient, resource, params),
        create: (resource, params) => data.create(apiUrl, httpClient, resource, params),
        delete: (resource, params) => data.delete(apiUrl, httpClient, resource, params),
        // NO SUPPORT API
        deleteMany: async () => {
            throw Error('No support deleteMany');
        },
        getManyReference: async () => {
            throw Error('No support getManyReference');
        },
        updateMany: async () => {
            throw Error('No support updateMany');
        },
    };
};
