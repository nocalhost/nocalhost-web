import * as React from 'react';
import { List, Datagrid, TextField, EmailField, EditButton, ShowButton } from 'react-admin';

const UserList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <EmailField source="email" />
            <TextField source="cluster_count" />
            <TextField source="status" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export default UserList;
