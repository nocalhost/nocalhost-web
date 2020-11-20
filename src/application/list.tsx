import React from 'react';
import { FC } from 'react';
import { List, Datagrid, TextField, EditButton, ListProps } from 'react-admin';

const ApplicationList: FC<ListProps> = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField label="App Name" source="context.application_name" />
            <TextField label="App Url" source="context.application_url" />
            <TextField source="status" />
            <EditButton />
        </Datagrid>
    </List>
);

export default ApplicationList;
