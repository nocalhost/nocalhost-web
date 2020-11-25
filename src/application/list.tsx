import React from 'react';
import { FC } from 'react';
import { List, Datagrid, TextField, EditButton, ShowButton, ListProps, Button } from 'react-admin';
import { Link } from 'react-router-dom';

const ApplicationList: FC<ListProps> = (props) => (
    <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
        <Datagrid>
            <TextField source="id" sortable={false} />
            <TextField label="App Name" source="context.application_name" sortable={false} />
            <TextField label="App Url" source="context.application_url" sortable={false} />
            <TextField source="status" sortable={false} />
            <ShowButton />
            <EditButton />
            <SpaceListButton />
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

const SpaceListButton = ({ record }: any) => {
    const filter = `filter=%7B%22application%22%3A%22${record.id}%22%7D`;
    return (
        <Button
            to={`space?${filter}`}
            label={`Space List`}
            onClick={(e) => e.stopPropagation()}
            component={Link}
        />
    );
};

export default ApplicationList;
