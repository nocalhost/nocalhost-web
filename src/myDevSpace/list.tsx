import React from 'react';
import { FC } from 'react';
import { List, ListProps, Datagrid, TextField, Button } from 'react-admin';
import { Link } from 'react-router-dom';
import KubeConfigButton from '../components/KubeconfigButton';
import DateField from '../components/DateField';
import SpaceResetButton from '../components/SpaceResetButton';

const SpaceList: FC<ListProps> = (props) => {
    return (
        <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
            <Datagrid>
                <TextField
                    label="resources.myDevSpace.fields.space_name"
                    source="space_name"
                    sortable={false}
                />
                <TextField
                    source="application_name"
                    label="resources.myDevSpace.fields.application"
                    sortable={false}
                />
                <TextField
                    source="user_name"
                    label="resources.myDevSpace.fields.user"
                    sortable={false}
                />
                <TextField
                    label="resources.myDevSpace.fields.namespace"
                    source="namespace"
                    sortable={false}
                />
                <DateField sortable={false} source="created_at" />
                <TextField
                    source="cluster_name"
                    label="resources.myDevSpace.fields.cluster"
                    sortable={false}
                />
                <SpaceShowButton />
                <KubeConfigButton />
                <SpaceResetButton />
            </Datagrid>
        </List>
    );
};

const SpaceShowButton = ({ record }: any) => (
    <Button
        to={`/myDevSpace/${record.id}/show`}
        label={'ra.action.show'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

export default SpaceList;
