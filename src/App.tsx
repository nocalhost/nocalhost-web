import React from 'react';
import { Admin, Resource } from 'react-admin';
import users from './users';
import cluster from './cluster';
import application from './application';
import Dashboard from './Dashboard';
import authProvider from './provider/authProvider';
import dataProvider from './provider/dataProvider';
import { Layout } from './layout';
import './App.css';

function App() {
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
