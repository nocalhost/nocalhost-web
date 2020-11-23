import React from 'react';
import { FC } from 'react';
import { List, Datagrid, TextField, ShowButton, ListProps, Button } from 'react-admin';
import { Link } from 'react-router-dom';
import ClusterVersionField from './ClusterVersionField';
import NodesField from './NodesFields';

const ClusterList: FC<ListProps> = (props) => {
    return (
        <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
            <Datagrid rowClick="edit">
                <TextField source="id" sortable={false} />
                <TextField source="cluster_name" sortable={false} />
                <TextField source="marks" sortable={false} />
                <ClusterVersionField label="Cluster version" source="info" sortable={false} />
                <NodesField label="Nodes count" source="info" sortable={false} />
                <TextField source="users_count" sortable={false} />
                <TextField source="created_at" sortable={false} />
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
