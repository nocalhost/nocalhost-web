import React from 'react';
import { FC, useEffect, useCallback } from 'react';
import {
    List,
    Datagrid,
    TextField,
    ShowButton,
    ListProps,
    ReferenceField,
    Button,
    useDataProvider,
} from 'react-admin';
import { Link } from 'react-router-dom';
import KubeConfigButton from '../components/KubeconfigButton';
import DateField from '../components/DateField';
import StatusField from './StatusField';
import { Cluster } from '../types';

const ClusterList: FC<ListProps> = (props: ListProps) => {
    const dataProvider = useDataProvider();
    const fetchClusters = useCallback(async () => {
        await dataProvider.getList<Cluster>('cluster', {
            filter: {},
            sort: { field: 'date', order: 'DESC' },
            pagination: { page: 1, perPage: 50 },
        });
    }, [dataProvider]);

    useEffect(() => {
        const timer = setInterval(() => {
            fetchClusters();
        }, 5000);
        return () => clearInterval(timer);
    }, []);
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
