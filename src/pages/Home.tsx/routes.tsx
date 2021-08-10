import Application from '../Application';
import ApplicationAuthorize from '../ApplicationAuthorize';
import Overview from '../OverView';
import User from '../User';
import Clusters from '../Clusters';
import EnvList from '../EnvList';
import DevSpace from '../DevSpace';
import DevSpaceOperation from '../DevSpace/components/DevspaceOperation';
export const routes = [
    {
        path: '/dashboard/overview',
        exact: true,
        component: Overview,
    },
    {
        path: '/dashboard/application',
        exact: true,
        component: Application,
    },
    {
        path: '/dashboard/application/authorize/:id',
        exact: true,
        component: ApplicationAuthorize,
        adminPage: true,
    },
    {
        path: '/dashboard/user',
        exact: true,
        component: User,
    },
    {
        path: '/dashboard/clusters',
        exact: true,
        component: Clusters,
    },
    {
        path: '/dashboard/clusters-env-list/:id',
        component: EnvList,
    },
    {
        path: '/dashboard/devspace/',
        component: DevSpace,
    },
    {
        path: '/dashboard/space-operation',
        component: DevSpaceOperation,
    },
];
