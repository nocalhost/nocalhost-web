import React from 'react';
import { FC } from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
    ShowProps,
    useShowController,
    useTranslate,
} from 'react-admin';

const Title = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <span>
            {translate('resources.application.name', { smart_count: 1 })}{' '}
            {record ? `"${record.context.application_name}"` : ''}
        </span>
    );
};

const ApplicationShow: FC<ShowProps> = (props) => {
    const { record } = useShowController(props);
    return (
        <Show {...props} title={<Title />}>
            <SimpleShowLayout>
                <TextField
                    label="resources.application.fields.application_name"
                    source="context.application_name"
                />
                <TextField label="resources.application.fields.source" source="context.source" />
                {record && record.context.source === 'git' && (
                    <TextField
                        label="resources.application.fields.install_type"
                        source="context.install_type"
                    />
                )}
                <TextField
                    label="resources.application.fields.application_url"
                    source="context.application_url"
                />
                {record && record.context.source === 'git' && (
                    <TextField
                        label="resources.application.fields.resource_dir"
                        source="context.resource_dir"
                    />
                )}
                <BooleanField label="resources.application.fields.status" source="status" />
            </SimpleShowLayout>
        </Show>
    );
};

export default ApplicationShow;
