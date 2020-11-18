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
    // eslint-disable-next-line no-undef
    const apiUrl = process.env.API_HOST || 'http://127.0.0.1:8080/v1';
    const dataProvider = data(apiUrl);
    const authProvider = auth(apiUrl);
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
