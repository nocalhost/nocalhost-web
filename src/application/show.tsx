import React from 'react';
import { FC } from 'react';
import {
    Show,
    SimpleShowLayout,
    TextField,
    ShowProps,
    useShowController,
    useTranslate,
    FieldProps,
} from 'react-admin';
import { get } from 'lodash';
import { Typography } from '@material-ui/core';

const Title = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <span>
            {translate('resources.application.name', { smart_count: 1 })}{' '}
            {record ? `"${record.context.application_name}"` : ''}
        </span>
    );
};

const ResourceDirField = (props: FieldProps) => {
    const { record, source } = props;
    const value = get(record, source || 0);
    return (
        <>
            {value.map((v: string) => {
                return <Typography key={v}>{v}</Typography>;
            })}
        </>
    );
};

ResourceDirField.defaultProps = { source: 'context.resource_dir', addLabel: true };

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
                {record && record.context.source === 'git' && (
                    <TextField
                        label="resources.application.fields.git_repo_url"
                        source="context.application_url"
                    />
                )}
                {record && record.context.source === 'helm_repo' && (
                    <TextField
                        label="resources.application.fields.helm_repo_url"
                        source="context.application_url"
                    />
                )}
                {record && record.context.source === 'git' && (
                    <ResourceDirField label="resources.application.fields.resource_dir" />
                )}
            </SimpleShowLayout>
        </Show>
    );
};

export default ApplicationShow;
