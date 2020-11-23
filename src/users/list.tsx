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
    <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
        <Datagrid rowClick="edit">
            <TextField source="id" sortable={false} />
            <TextField source="name" sortable={false} />
            <EmailField source="email" sortable={false} />
            <TextField source="cluster_count" sortable={false} />
            <TextField source="status" sortable={false} />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);

export default UserList;
