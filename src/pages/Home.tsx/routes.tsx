import Application from '../Application';
import ApplicationAuthorize from '../ApplicationAuthorize';
import User from '../User';
export const routes = [
    {
        path: '/dashboard/application',
        exact: true,
        component: Application,
    },
    {
        path: '/dashboard/application/authorize/:id',
        exact: true,
        component: ApplicationAuthorize,
    },
    {
        path: '/dashboard/user',
        exact: true,
        component: User,
        adminPage: true,
    },
];
