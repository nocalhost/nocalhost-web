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
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import searchToObj from '../utils/searchToObj';
import KubeConfigButton from '../components/KubeconfigButton';

const Empty = () => {
    const hash = window.location.hash;
    const search = hash.substring(hash.indexOf('?'));
    const p = searchToObj(search);
    const translate = useTranslate();
    return (
        <Box textAlign="center" m={1}>
            <Typography variant="h4" paragraph>
                {translate('resources.space.empty.title')}
            </Typography>
            <Typography variant="body1">{translate('resources.space.empty.content')}</Typography>
            <SpaceCreateButton application={p.application} />
        </Box>
    );
};

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

const StatusField = (record: any) => {
    const translate = useTranslate();
    return (
        <div>
            {record.status === 1
                ? translate('resources.space.status.deployed')
                : translate('resources.space.status.undeployed')}
        </div>
    );
};

const SpaceCreateButton = (record: any) => (
    <Button
        icon={<AddIcon />}
        to={`space/create?application=${record.application}`}
        label={'resources.space.actions.create'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
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

const SpaceList: FC<ListProps> = (props) => (
    <List
        {...props}
        empty={<Empty />}
        title={<Title />}
        bulkActionButtons={false}
        pagination={false}
        exporter={false}
        actions={<ListActions />}
    >
        <Datagrid>
            <StatusField label="resources.space.fields.status" source="status" sortable={false} />
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
            <TextField
                label="resources.space.fields.created_at"
                source="created_at"
                sortable={false}
            />
            <ReferenceField
                label="resources.space.fields.cluster"
                source="cluster_id"
                reference="cluster"
                sortable={false}
            >
                <TextField source="cluster_name" />
            </ReferenceField>
            <TextField label="resources.space.fields.cpu" source="cpu" sortable={false} />
            <TextField label="resources.space.fields.memory" source="memory" sortable={false} />
            <SpaceShowButton />
            <KubeConfigButton />
            <DeleteButton undoable={false} />
        </Datagrid>
    </List>
);

const SpaceShowButton = ({ record }: any) => (
    <Button
        to={`/space/${record.id}/show?cluster_id=${record.cluster_id}`}
        label={'resources.space.actions.show'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

export default SpaceList;
