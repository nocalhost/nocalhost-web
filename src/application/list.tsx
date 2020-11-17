import React from 'react';
import { FC } from 'react';
import { List, Datagrid, TextField, EditButton, ListProps } from 'react-admin';
import AppUrlField from './AppUrlField';
import AppNameField from './AppNameField';

const ApplicationList: FC<ListProps> = (props) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <AppNameField label="App Name" source="context" />
            <AppUrlField label="App Url" source="context" />
            <TextField source="status" />
            <EditButton />
        </Datagrid>
    </List>
);

export default ApplicationList;
