import React from 'react';
import { FC } from 'react';
import {
    List,
    ListProps,
    Datagrid,
    TextField,
    Button,
    TopToolbar,
    sanitizeListRestProps,
    ReferenceField,
    DeleteButton,
    useGetOne,
    useTranslate,
} from 'react-admin';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import searchToObj from '../utils/searchToObj';
import KubeConfigButton from '../components/KubeconfigButton';
import Empty from '../components/Empty';
import DateField from '../components/DateField';
import SpaceResetButton from '../components/SpaceResetButton';
import ResourceLimitButton from '../components/ResourceLimitButton';

const ListActions = (props: any) => {
    const { ...rest } = props;
    const hash = window.location.hash;
    const search = hash.substring(hash.indexOf('?'));
    const p = searchToObj(search);
    return (
        <TopToolbar {...sanitizeListRestProps(rest)}>
            <SpaceCreateButton application={p.application} />
        </TopToolbar>
    );
};

const SpaceCreateButton = (record: any) => (
    <Button
        icon={<AddIcon />}
        to={`space/create?application=${record.application}`}
        label={'ra.action.create'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    >
        <AddIcon />
    </Button>
);

const Title = () => {
    const translate = useTranslate();
    const hash = window.location.hash;
    const search = hash.substring(hash.indexOf('?'));
    const p = searchToObj(search);
    const { data, loading } = useGetOne('application', p.application);
    if (loading || !data) {
        return <span>{translate('resources.space.name', { smart_count: 2 })}</span>;
    }
    return (
        <span>
            {translate('resources.application.name', { smart_count: 1 })}{' '}
            {`"${data.context.application_name}"`}{' '}
            {translate('resources.space.name', { smart_count: 2 })}
        </span>
    );
};

const SpaceList: FC<ListProps> = (props) => {
    const hash = window.location.hash;
    const search = hash.substring(hash.indexOf('?'));
    const p = searchToObj(search);
    return (
        <List
            {...props}
            empty={
                <Empty
                    createUrl={`space/create?application=${p.application}`}
                    returnUrl={`/application`}
                />
            }
            title={<Title />}
            bulkActionButtons={false}
            pagination={false}
            exporter={false}
            actions={<ListActions />}
        >
            <Datagrid>
                <TextField
                    label="resources.space.fields.space_name"
                    source="space_name"
                    sortable={false}
                />
                <ReferenceField
                    label="resources.space.fields.user"
                    source="user_id"
                    reference="users"
                    sortable={false}
                >
                    <TextField source="name" />
                </ReferenceField>
                <TextField
                    label="resources.space.fields.namespace"
                    source="namespace"
                    sortable={false}
                />
                <DateField sortable={false} source="created_at" />
                <ReferenceField
                    label="resources.space.fields.cluster"
                    source="cluster_id"
                    reference="cluster"
                    sortable={false}
                >
                    <TextField source="name" />
                </ReferenceField>
                <ResourceLimitButton />
                <SpaceShowButton />
                <KubeConfigButton />
                <SpaceResetButton />
                <DeleteButton redirect={`/space?application=${p.application}`} undoable={false} />
            </Datagrid>
        </List>
    );
};

const SpaceShowButton = ({ record }: any) => (
    <Button
        to={`/space/${record.id}/show?cluster=${record.cluster_id}`}
        label={'ra.action.show'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

export default SpaceList;
