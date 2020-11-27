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
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'DELETE',
        ...options,
    }).then(({ json }) => ({ data: json }));
};

export default deleteMethod;
