import { Application, Cluster } from '../../types';

export const deserializeApplication = (data: Application) => ({
    ...data,
    id: data.id,
    context: JSON.parse(data.context),
});

export const deserializeCluster = (data: Cluster) => {
    if (!data.info) {
        return data;
    }
    return {
        ...data,
        info: JSON.parse(data.info),
    };
};
