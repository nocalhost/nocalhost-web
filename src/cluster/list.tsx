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
import KubeConfigButton from '../components/KubeconfigButton';
import DateField from '../components/DateField';
import StatusField from './StatusField';

const ClusterList: FC<ListProps> = (props: ListProps) => {
    return (
        <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
            <Datagrid>
                <TextField source="name" sortable={false} />
                <TextField
                    label="resources.cluster.fields.cluster_version"
                    source="info.cluster_version"
                    sortable={false}
                />
                <StatusField sortable={false} />
                <TextField
                    label="resources.cluster.fields.nodes_count"
                    source="info.nodes"
                    sortable={false}
                />
                <TextField source="users_count" sortable={false} />
                <ReferenceField
                    label="resources.cluster.fields.user"
                    source="user_id"
                    reference="users"
                    sortable={false}
                >
                    <TextField source="name" />
                </ReferenceField>
                <DateField sortable={false} source="created_at" />
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
