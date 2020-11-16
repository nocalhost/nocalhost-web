import * as React from 'react';
import { List, Datagrid, TextField, EditButton } from 'react-admin';

const ApplicationList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="context" />
            <TextField source="status" />
            <EditButton />
        </Datagrid>
    </List>
);

export default ApplicationList;
