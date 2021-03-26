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
    useTranslate,
    usePermissions,
} from 'react-admin';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import KubeConfigButton from '../components/KubeconfigButton';
import Empty from '../components/Empty';
import DateField from '../components/DateField';
import SpaceResetButton from '../components/SpaceResetButton';
import ResourceLimitButton from '../components/ResourceLimitButton';

const ListActions = (props: any) => {
    const { ...rest } = props;
    return (
        <TopToolbar {...sanitizeListRestProps(rest)}>
            <SpaceCreateButton />
        </TopToolbar>
    );
};

const SpaceCreateButton = () => (
    <Button
        icon={<AddIcon />}
        to={`/devspace/create`}
        label={'ra.action.create'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    >
        <AddIcon />
    </Button>
);

const Title = () => {
    const translate = useTranslate();
    return <span>{translate('resources.space.name', { smart_count: 2 })}</span>;
};

const SpaceList: FC<ListProps> = (props) => {
    const { permissions } = usePermissions();
    return (
        <List
            {...props}
            empty={<Empty createUrl={`/devspace/create`} returnUrl={`/devspace`} />}
            title={<Title />}
            bulkActionButtons={false}
            pagination={false}
            exporter={false}
            actions={permissions === 'admin' && <ListActions />}
        >
            <Datagrid>
                <TextField
                    label="resources.space.fields.space_name"
                    source="space_name"
                    sortable={false}
                />
                {permissions === 'admin' && (
                    <ReferenceField
                        label="resources.space.fields.user"
                        source="user_id"
                        reference="users"
                        sortable={false}
                    >
                        <TextField source="name" />
                    </ReferenceField>
                )}
                <TextField
                    label="resources.space.fields.namespace"
                    source="namespace"
                    sortable={false}
                />
                <DateField sortable={false} source="created_at" />
                {permissions === 'admin' && (
                    <ReferenceField
                        label="resources.space.fields.cluster"
                        source="cluster_id"
                        reference="cluster"
                        sortable={false}
                    >
                        <TextField source="name" />
                    </ReferenceField>
                )}
                <ResourceLimitButton />
                <SpaceShowButton />
                <KubeConfigButton />
                <SpaceResetButton />
                {permissions === 'admin' && (
                    <DeleteButton redirect={`/devspace`} undoable={false} />
                )}
            </Datagrid>
        </List>
    );
};

const SpaceShowButton = ({ record }: any) => (
    <Button
        to={`/devspace/${record.id}/show?cluster=${record.cluster_id}`}
        label={'ra.action.show'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

export default SpaceList;
