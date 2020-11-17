import React from 'react';
import { FC } from 'react';
import { List, Datagrid, TextField, ShowButton, ListProps } from 'react-admin';
import ClusterVersionField from './ClusterVersionField';
import NodesField from './NodesFields';

const ClusterList: FC<ListProps> = (props) => {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="cluster_name" />
                <TextField source="marks" />
                <ClusterVersionField label="Cluster version" source="info" />
                <NodesField label="Nodes count" source="info" />
                <TextField source="users_count" />
                <TextField source="created_at" />
                <ShowButton />
            </Datagrid>
        </List>
    );
};

export default ClusterList;
