import React from 'react';
import { FC } from 'react';
import {
    List,
    ListProps,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    ShowButton,
} from 'react-admin';

const UserList: FC<ListProps> = (props) => (
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
