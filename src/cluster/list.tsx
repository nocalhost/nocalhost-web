import React from 'react';
import { FC } from 'react';
import { List, Datagrid, TextField, ShowButton, ListProps, Button } from 'react-admin';
import { Link } from 'react-router-dom';
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
                <SpaceShowButton />
            </Datagrid>
        </List>
    );
};

const SpaceShowButton = ({ record }: any) => (
    <Button
        to={`space/${record.id}/show`}
        label={`show space`}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

export default ClusterList;
