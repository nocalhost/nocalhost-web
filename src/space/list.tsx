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
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const Empty = () => {
    return <div>empty</div>;
};

const ListActions = (props: any) => {
    const { ...rest } = props;
    return (
        <TopToolbar {...sanitizeListRestProps(rest)}>
            <SpaceCreateButton application={props.filterValues.application} />
        </TopToolbar>
    );
};

const StatusField = (record: any) => <div>{record.status === 1 ? 'deployed' : 'not deployed'}</div>;

const SpaceCreateButton = (record: any) => (
    <Button
        icon={<AddIcon />}
        to={`space/create?application=${record.application}`}
        label={`Create Space`}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

const Title = () => {
    const listContext = useListContext();
    const { data, loading } = useGetOne('application', listContext.filterValues.application);
    if (loading || !data) {
        return <span>Space</span>;
    }
    return <span>Application {data.context.application_name} Space</span>;
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
            <StatusField source="status" sortable={false} />
            <ReferenceField source="user_id" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="namespace" sortable={false} />
            <TextField source="created_at" sortable={false} />
            <ReferenceField source="cluster_id" reference="cluster">
                <TextField source="cluster_name" />
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

export default SpaceList;
