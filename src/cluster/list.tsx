import React from 'react';
import { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    ShowButton,
    ListProps,
    ReferenceField,
    Button,
} from 'react-admin';
import { Link } from 'react-router-dom';
import ClusterVersionField from './ClusterVersionField';
import NodesField from './NodesFields';
import KubeConfigButton from '../components/KubeconfigButton';

const ClusterList: FC<ListProps> = (props: ListProps) => {
    return (
        <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
            <Datagrid>
                <TextField
                    label="resources.cluster.fields.cluster_name"
                    source="cluster_name"
                    sortable={false}
                />
                <TextField label="resources.cluster.fields.marks" source="marks" sortable={false} />
                <ClusterVersionField
                    label="resources.cluster.fields.cluster_version"
                    source="info"
                    sortable={false}
                />
                <NodesField
                    label="resources.cluster.fields.nodes_count"
                    source="info"
                    sortable={false}
                />
                <TextField
                    label="resources.cluster.fields.users_count"
                    source="users_count"
                    sortable={false}
                />
                <ReferenceField
                    label="resources.cluster.fields.user"
                    source="user_id"
                    reference="users"
                    sortable={false}
                >
                    <TextField source="name" />
                </ReferenceField>
                <TextField
                    label="resources.cluster.fields.created_at"
                    source="created_at"
                    sortable={false}
                />
                <ShowButton />
                <KubeConfigButton />
                <SpaceShowButton />
            </Datagrid>
        </List>
    );
};

const SpaceShowButton = ({ record }: any) => {
    return (
        <Button
            to={`/dev_space?cluster=${record.id}`}
            label={'resources.devSpace.actions.list'}
            onClick={(e) => e.stopPropagation()}
            component={Link}
        />
    );
};

export default ClusterList;
