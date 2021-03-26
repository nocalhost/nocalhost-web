import { DeleteParams } from 'react-admin';
import { REQUEST_TIMEOUT } from '../../constants';

const deleteMethod = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    resource: string,
    params: DeleteParams
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    let url = `${apiUrl}/${resource}/${params.id}`;
    if (resource === 'devspace') {
        url = `${apiUrl}/dev_space/${params.id}`;
    }
    return httpClient(`${url}`, {
        method: 'DELETE',
        timeout: resource === 'cluster' ? REQUEST_TIMEOUT : 0,
        ...options,
    }).then(({ json }) => ({ data: json }));
};

export default deleteMethod;
