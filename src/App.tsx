import React from 'react';
import { Admin, Resource } from 'react-admin';
import users from './users';
import cluster from './cluster';
import application from './application';
import Dashboard from './Dashboard';
import auth from './provider/authProvider';
import data from './provider/dataProvider';
import { Layout } from './layout';
import './App.css';

function App() {
    // eslint-disable-next-line
    // @ts-ignore
    const apiUrl = window._env_.API_HOST || 'http://127.0.0.1:8080';
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
        </Admin>
    );
}

export default App;
