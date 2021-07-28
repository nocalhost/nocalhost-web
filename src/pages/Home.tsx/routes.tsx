import Application from '../Application';
import User from '../User';
import Clusters from '../Clusters';
export const routes = [
    {
        path: '/dashboard/application',
        exact: true,
        component: Application,
    },
    {
        path: '/dashboard/user',
        exact: true,
        component: User,
        adminPage: true,
    },
    {
        path: '/dashboard/clusters',
        exact: true,
        component: Clusters,
    },
];
