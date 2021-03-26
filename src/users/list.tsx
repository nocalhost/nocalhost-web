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
    Button,
    Link,
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

const UserTypeField = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <div>
            {record.is_admin === 1
                ? translate('resources.users.userType.admin')
                : translate('resources.users.userType.user')}
        </div>
    );
};

const DevspaceCountButton = ({ record }: any) => {
    return (
        <Button
            to={`/devspace?user_id=${record.id}`}
            label={`${record.cluster_count}`}
            onClick={(e) => e.stopPropagation()}
            component={Link}
        ></Button>
    );
};

const UserList: FC<ListProps> = (props) => (
    <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
        <Datagrid>
            <TextField source="name" sortable={false} />
            <EmailField source="email" sortable={false} />
            <DevspaceCountButton source="cluster_count" sortable={false}></DevspaceCountButton>
            <StatusField source="status" sortable={false} />
            <UserTypeField
                source="is_admin"
                label="resources.users.fields.userType"
                sortable={false}
            />
            <EditButton />
        </Datagrid>
    </List>
);

export default UserList;
