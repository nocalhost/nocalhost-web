import React from 'react';
import { FC } from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    ShowProps,
    useShowController,
} from 'react-admin';

const Title = ({ record }: any) => {
    return <span>Application {record ? `"${record.context.application_name}"` : ''}</span>;
};

const ApplicationShow: FC<ShowProps> = (props) => {
    const { record } = useShowController(props);
    return (
        <Show {...props} title={<Title />}>
            <SimpleShowLayout>
                <TextField source="id" />
                <TextField label="Application Name" source="context.application_name" />
                <TextField label="Source" source="context.source" />
                {record && record.context.source === 'git' && (
                    <TextField label="Install Type" source="context.install_type" />
                )}
                <TextField label="Application Url" source="context.application_url" />
                {record && record.context.source === 'git' && (
                    <TextField label="Resource Dir" source="context.resource_dir" />
                )}
                <BooleanField source="status" />
            </SimpleShowLayout>
        </Show>
    );
};

export default ApplicationShow;
