import React from 'react';
import { FC } from 'react';
import { List, Datagrid, TextField, EditButton, ListProps, Button } from 'react-admin';
import { Link } from 'react-router-dom';

const ApplicationList: FC<ListProps> = (props) => (
    <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
        <Datagrid rowClick="edit">
            <TextField source="id" sortable={false} />
            <TextField label="App Name" source="context.application_name" sortable={false} />
            <TextField label="App Url" source="context.application_url" sortable={false} />
            <TextField source="status" sortable={false} />
            <EditButton />
            <SpaceCreateButton />
        </Datagrid>
    </List>
);

const SpaceCreateButton = ({ record }: any) => (
    <Button
        to={`space/create?application_id=${record.id}`}
        label={`Create Space`}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

export default ApplicationList;
