import { fetchUtils, DataProvider, HttpError } from 'react-admin';
import data from './data';

const timeout: number = 5000;
const httpClient = function (url: any, options?: fetchUtils.Options | undefined) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(
                new HttpError('Request timeout, please check your networks and try again.', 408)
            );
        }, timeout);
        fetchUtils.fetchJson(url, options).then(resolve, reject);
    });
};

export default (apiUrl: string): DataProvider => {
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
