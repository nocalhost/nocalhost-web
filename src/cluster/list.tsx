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

const SpaceShowButton = ({ record }: any) => {
    const filter = `filter=%7B%22cluster%22%3A%22${record.id}%22%7D`;
    return (
        <Button
            to={`/dev_space?${filter}`}
            label={`list space`}
            onClick={(e) => e.stopPropagation()}
            component={Link}
        />
    );
};

export default ClusterList;
