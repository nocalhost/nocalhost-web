import React from 'react';
import { Admin, Resource } from 'react-admin';
import users from './users';
import cluster from './cluster';
import application from './application';
import Dashboard from './Dashboard';
import space from './space';
import auth from './provider/authProvider';
import data from './provider/dataProvider';
import { Layout } from './layout';
import './App.css';

function App() {
    // eslint-disable-next-line
    // @ts-ignore
    const apiUrl = window._env_.API_HOST || window.location.origin;
    // eslint-disable-next-line
    // @ts-ignore
    const currentCommitId = window._env_.GIT_COMMIT_SHA;
    // eslint-disable-next-line
    console.log('Current Version: ', currentCommitId);

    const dataProvider = data(`${apiUrl}/v1`);
    const authProvider = auth(`${apiUrl}/v1`);
    return (
        <Admin
            dashboard={Dashboard}
            layout={Layout}
            authProvider={authProvider}
            dataProvider={dataProvider}
        >
            <Resource name="cluster" {...cluster} />
            <Resource name="application" {...application} />
            <Resource name="users" {...users} />
            <Resource name="space" {...space} />
        </Admin>
    );
}

export default App;
