import React from 'react';
import { FC } from 'react';
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    ShowButton,
    ListProps,
    Button,
} from 'react-admin';
import { Link } from 'react-router-dom';
import DateField from '../components/DateField';

const SourceField = ({ record }: any) => (
    <div>{record.context.source === 'git' ? 'Git' : 'Helm'}</div>
);

const ApplicationList: FC<ListProps> = (props) => (
    <List {...props} bulkActionButtons={false} pagination={false} exporter={false}>
        <Datagrid>
            <TextField
                label="resources.application.fields.application_name"
                source="context.application_name"
                sortable={false}
            />
            <SourceField
                label="resources.application.fields.source"
                source="context.source"
                sortable={false}
            />
            <ReferenceField
                label="resources.application.fields.user"
                source="user_id"
                reference="users"
                sortable={false}
            >
                <TextField source="name" />
            </ReferenceField>
            <DateField sortable={false} source="created_at" />
            <ShowButton />
            <EditButton />
            <SpaceListButton />
            <SpaceCreateButton />
        </Datagrid>
    </List>
);

const SpaceCreateButton = ({ record }: any) => (
    <Button
        to={`space/create?application=${record.id}`}
        label={'resources.space.actions.create'}
        onClick={(e) => e.stopPropagation()}
        component={Link}
    />
);

const SpaceListButton = ({ record }: any) => {
    return (
        <Button
            to={`space?application=${record.id}`}
            label={'resources.space.actions.list'}
            onClick={(e) => e.stopPropagation()}
            component={Link}
        />
    );
};

export default ApplicationList;
