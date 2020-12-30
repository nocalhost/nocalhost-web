import React from 'react';
import { FC } from 'react';
import {
    List,
    ListProps,
    Datagrid,
    TextField,
    Button,
    ReferenceField,
    DeleteButton,
    useGetOne,
    useTranslate,
} from 'react-admin';
import { Link } from 'react-router-dom';
import searchToObj from '../utils/searchToObj';
import KubeConfigButton from '../components/KubeconfigButton';
import Empty from '../components/Empty';
import DateField from '../components/DateField';
import ResourceLimitField from '../components/ResourceLimitField';
import SpaceResetButton from '../components/SpaceResetButton';

const Title = () => {
    const translate = useTranslate();
    const hash = window.location.hash;
    const search = hash.substring(hash.indexOf('?'));
    const p = searchToObj(search);
    const { data, loading } = useGetOne('cluster', p.cluster);
    if (loading || !data) {
        return <span>{translate('resources.devSpace.name', { smart_count: 2 })}</span>;
    }
    return (
        <span>
            {translate('resources.cluster.name', { smart_count: 1 })} {`"${data.name}"`}{' '}
            {translate('resources.devSpace.name', { smart_count: 2 })}
        </span>
    );
};

const DevSpaceList: FC<ListProps> = (props) => {
    const hash = window.location.hash;
    const search = hash.substring(hash.indexOf('?'));
    const p = searchToObj(search);
    return (
        <List
            {...props}
            title={<Title />}
            bulkActionButtons={false}
            pagination={false}
            exporter={false}
            empty={<Empty returnUrl={'/cluster'} />}
            hasCreate={true}
        >
            <Datagrid>
                <TextField
                    label="resources.devSpace.fields.space_name"
                    source="space_name"
                    sortable={false}
                />
                <ReferenceField
                    label="resources.devSpace.fields.user"
                    source="user_id"
                    reference="users"
                    sortable={false}
                >
                    <TextField source="name" />
                </ReferenceField>
                <TextField
                    label="resources.devSpace.fields.namespace"
                    source="namespace"
                    sortable={false}
                />
                <DateField sortable={false} source="created_at" />
                <ReferenceField
                    label="resources.devSpace.fields.application"
                    source="application_id"
                    reference="application"
                    sortable={false}
                >
                    <TextField source="context.application_name" />
                </ReferenceField>
                <ResourceLimitField sortable={false} />
                <SpaceShowButton />
                <KubeConfigButton />
                <SpaceResetButton />
                <DeleteButton redirect={`/dev_space?cluster=${p.cluster}`} undoable={false} />
            </Datagrid>
        </List>
    );
};

const SpaceShowButton = ({ record }: any) => (
    <Button
        to={`/space/${record.id}/show?cluster=${record.cluster_id}`}
        label={'resources.devSpace.actions.show'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

export default DevSpaceList;
