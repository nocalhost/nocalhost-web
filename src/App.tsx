import React from 'react';
import { Admin, Resource } from 'react-admin';
import { UserList, UserCreate, UserEdit } from './users/index';
import { ClusterList, ClusterShow, ClusterCreate } from './cluster/index';
import { ApplicationList, ApplicationCreate, ApplicationEdit } from './application/index';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './provider/authProvider';
import dataProvider from './provider/dataProvider';
import './App.css';

function App() {
    return (
        <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource name="cluster" show={ClusterShow} create={ClusterCreate} list={ClusterList} />
            <Resource
                name="application"
                list={ApplicationList}
                edit={ApplicationEdit}
                create={ApplicationCreate}
            />
            <Resource
                name="users"
                list={UserList}
                edit={UserEdit}
                create={UserCreate}
                icon={UserIcon}
            />
        </Admin>
    );
}

export default App;
