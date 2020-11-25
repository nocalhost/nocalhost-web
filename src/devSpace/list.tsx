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
    useListContext,
    useGetOne,
} from 'react-admin';
import { Link } from 'react-router-dom';

const Empty = () => {
    return <div>empty</div>;
};

const ListActions = (props: any) => {
    const { ...rest } = props;
    return <TopToolbar {...sanitizeListRestProps(rest)}></TopToolbar>;
};

const StatusField = (record: any) => <div>{record.status === 1 ? 'deployed' : 'not deployed'}</div>;

const Title = () => {
    const listContext = useListContext();
    const { data, loading } = useGetOne('cluster', listContext.filterValues.cluster);
    if (loading || !data) {
        return <span>Dev Space</span>;
    }
    return <span>Cluster {data.name} Dev Space</span>;
};

const DevSpaceList: FC<ListProps> = (props) => (
    <List
        {...props}
        title={<Title />}
        empty={<Empty />}
        bulkActionButtons={false}
        pagination={false}
        exporter={false}
        actions={<ListActions />}
    >
        <Datagrid>
            <TextField source="id" sortable={false} />
            <StatusField source="status" sortable={false} />
            <ReferenceField source="user_id" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="namespace" sortable={false} />
            <TextField source="created_at" sortable={false} />
            <ReferenceField source="application_id" reference="application">
                <TextField source="context.application_name" />
            </ReferenceField>
            <TextField source="cpu" sortable={false} />
            <TextField source="memory" sortable={false} />
            <SpaceShowButton />
            <DeleteButton undoable={false} />
        </Datagrid>
    </List>
);

const SpaceShowButton = ({ record }: any) => (
    <Button
        to={`/space/${record.id}/show?cluster_id=${record.cluster_id}`}
        label={`Show Space`}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

export default DevSpaceList;
