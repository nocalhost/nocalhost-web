import { Result } from '../../types';

const getMeshAppInfo = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>,
    id: string
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = `${apiUrl}/dev_space/${id}/mesh_apps_info`;
    return httpClient(url, options).then((result: Result) => {
        return {
            data: result.json.data,
        };
    });
};

export default getMeshAppInfo;
