import * as React from 'react';
import { List, Datagrid, TextField, ShowButton } from 'react-admin';

const ClusterList = (props: any) => {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="cluster_name" />
                <TextField source="marks" />
                <TextField source="info" />
                <TextField source="users_count" />
                <TextField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export default ClusterList;
