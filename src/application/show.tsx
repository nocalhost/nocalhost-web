import React from 'react';
import { FC } from 'react';
import { Show, SimpleShowLayout, TextField, BooleanField, ShowProps } from 'react-admin';

const Title = ({ record }: any) => {
    return <span>Application {record ? `"${record.context.application_name}"` : ''}</span>;
};

const ApplicationShow: FC<ShowProps> = (props) => {
    return (
        <Show {...props} title={<Title />}>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField label="Application Name" source="context.application_name" />
                <TextField label="Source" source="context.source" />
                <TextField label="Install Type" source="context.install_type" />
                <TextField label="Application Url" source="context.application_url" />
                <TextField label="Resource Dir" source="context.resource_dir" />
                <BooleanField source="status" />
            </SimpleShowLayout>
        </Show>
    );
};

export default ApplicationShow;
