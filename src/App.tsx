import React from 'react';
import { Admin, Resource } from 'react-admin';
import { PostList, PostEdit, PostCreate } from './posts';
import { UserList } from './users';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import Dashboard from './Dashboard';
import authProvider from './authProvider';
import './App.css';

import jsonServerProvider from 'ra-data-json-server';
const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

function App() {
    return (
        <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
            <Resource
                name="posts"
                list={PostList}
                edit={PostEdit}
                create={PostCreate}
                icon={PostIcon}
            />
            <Resource name="users" list={UserList} icon={UserIcon} />
        </Admin>
    );
}

export default App;
