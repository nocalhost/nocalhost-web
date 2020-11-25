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

const SpaceCreateButton = (record: any) => (
    <Button
        icon={<AddIcon />}
        to={`space/create?application_id=${record.application}`}
        label={`Create Space`}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

const SpaceList: FC<ListProps> = (props) => (
    <List
        {...props}
        empty={<Empty />}
        bulkActionButtons={false}
        pagination={false}
        exporter={false}
        actions={<ListActions />}
    >
        <Datagrid>
            <TextField source="id" sortable={false} />
            <ReferenceField source="application_id" reference="application">
                <TextField source="context.application_name" />
            </ReferenceField>
            <ReferenceField source="cluster_id" reference="cluster">
                <TextField source="cluster_name" />
            </ReferenceField>
            <TextField source="cpu" sortable={false} />
            <TextField source="memory" sortable={false} />
            <TextField source="namespace" sortable={false} />
            <TextField source="status" sortable={false} />
            <ReferenceField source="user_id" reference="users">
                <TextField source="name" />
            </ReferenceField>
            <TextField source="created_at" sortable={false} />
            <SpaceShowButton />
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
