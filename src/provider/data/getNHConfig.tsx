import { Result } from '../../types';

const getNHConfig = async (
    apiUrl: string,
    httpClient: (url: any, options?: any) => Promise<any>
) => {
    const options = {
        user: { authenticated: true, token: `Bearer ${localStorage.getItem('token')}` },
    };
    const url = `${apiUrl}/nocalhost/templates`;
    return httpClient(url, options).then((result: Result) => {
        return {
            data: result.json.data,
        };
    });
};

export default getNHConfig;
