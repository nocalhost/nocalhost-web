import React from 'react';
import { FC } from 'react';
import { List, ListProps, Datagrid, TextField, EmailField, EditButton } from 'react-admin';

const StatusField = ({ record }: any) => <div>{record.status === 1 ? 'Avtive' : 'Inactive'}</div>;

const UserList: FC<ListProps> = (props) => (
    <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
        <Datagrid>
            <TextField source="name" sortable={false} />
            <EmailField source="email" sortable={false} />
            <TextField source="cluster_count" sortable={false} />
            <StatusField source="status" sortable={false} />
            <EditButton />
        </Datagrid>
    </List>
);

export default UserList;
