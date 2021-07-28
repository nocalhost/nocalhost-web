import Application from '../Application';
import User from '../User';
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
];
