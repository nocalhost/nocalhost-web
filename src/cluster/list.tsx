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
    EditButton,
} from 'react-admin';
import { Link } from 'react-router-dom';
import DateField from '../components/DateField';

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
                <TextField source="storage_class" />
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
                <EditButton />
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
