import { Application, Cluster } from '../../types';

export const deserializeApplication = (data: Application) => {
    const context = JSON.parse(data.context);
    return {
        ...data,
        context,
        dirs:
            context.resource_dir && context.resource_dir.length > 0
                ? context.resource_dir.map((d: string) => {
                      return {
                          dir: d,
                      };
                  })
                : [],
    };
};

export const deserializeCluster = (data: Cluster) => {
    if (!data.info) {
        return data;
    }
    return {
        ...data,
        info: JSON.parse(data.info),
    };
};
