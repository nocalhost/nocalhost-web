import { DeleteParams } from 'react-admin';

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
    if (resource === 'space') {
        url = `${apiUrl}/dev_space/${params.id}`;
    }
    return httpClient(`${url}`, {
        method: 'DELETE',
        ...options,
    }).then(({ json }) => ({ data: json }));
};

export default deleteMethod;
