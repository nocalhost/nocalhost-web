import React from 'react';
import { FC } from 'react';
import {
    List,
    ListProps,
    Datagrid,
    TextField,
    EmailField,
    EditButton,
    useTranslate,
} from 'react-admin';

const StatusField = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <div>
            {record.status === 1
                ? translate('resources.users.status.active')
                : translate('resources.users.status.inactive')}
        </div>
    );
};

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
