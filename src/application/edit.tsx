import React, { useCallback, FC, useEffect, useState } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    EditProps,
    FormDataConsumer,
    Record,
    useTranslate,
    useDataProvider,
    ArrayInput,
    SimpleFormIterator,
} from 'react-admin';
import { validateText } from '../common/validation';
import form from '../common/form';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    resource: {
        width: '256px',
    },
    fullWidth: {
        width: '100%',
    },
});

const Title = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <span>
            {translate('resources.application.name', { smart_count: 1 })}{' '}
            {record ? `"${record.context.application_name}"` : ''}
        </span>
    );
};

const ApplicationEdit: FC<EditProps> = (props: EditProps) => {
    const [config, setConfg] = useState('');
    const dataProvider = useDataProvider();
    const fetchNHConfig = useCallback(async () => {
        const { data } = await dataProvider.getNHConfig('config');
        setConfg(data.template);
    }, []);
    useEffect(() => {
        fetchNHConfig();
    }, []);
    const classes = useStyles();
    const translate = useTranslate();
    const transform = (data: Record) => {
        let context = data.context;
        context = { ...context, resource_dir: [] };
        if (data.context.source === 'git') {
            context = {
                ...context,
                resource_dir:
                    data.dirs && data.dirs.length > 0
                        ? data.dirs.map((d: { dir: string }) => d.dir).filter((dir: string) => dir)
                        : [],
            };
        }
        if (data.context.source === 'local') {
            context = {
                ...context,
                application_url: ' ',
            };
        }
        // eslint-disable-next-line
        // @ts-ignore
        const result: Record = {
            status: 1,
            context: JSON.stringify(context),
        };
        return result;
    };

    return (
        <Edit transform={transform} title={<Title />} {...props}>
            <SimpleForm {...form}>
                <TextInput
                    label="resources.application.fields.application_name"
                    source="context.application_name"
                    validate={validateText}
                />
                <FormDataConsumer>
                    {({ formData }) =>
                        formData.context.source === 'helm_repo' && (
                            <Typography variant="subtitle2" gutterBottom>
                                {translate('resources.application.tips.helm_repo')}
                            </Typography>
                        )
                    }
                </FormDataConsumer>
                <SelectInput
                    source="context.source"
                    label="resources.application.fields.source"
                    initialValue="git"
                    validate={validateText}
                    choices={[
                        { id: 'git', name: 'Git' },
                        { id: 'helm_repo', name: 'Helm Repo' },
                        { id: 'local', name: 'Local' },
                    ]}
                />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <SelectInput
                                {...rest}
                                source="context.install_type"
                                label="resources.application.fields.install_type"
                                initialValue="rawManifest"
                                validate={validateText}
                                choices={[
                                    { id: 'rawManifest', name: 'Manifest' },
                                    { id: 'helm_chart', name: 'Helm Chart' },
                                    { id: 'kustomize', name: 'Kustomize' },
                                ]}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'local' && (
                            <SelectInput
                                validate={validateText}
                                {...rest}
                                label="resources.application.fields.install_type"
                                source="context.install_type"
                                initialValue="rawManifest"
                                choices={[
                                    { id: 'rawManifestLocal', name: 'Manifest' },
                                    { id: 'helmLocal', name: 'Helm Chart' },
                                    { id: 'kustomize', name: 'Kustomize' },
                                ]}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <TextInput
                                {...rest}
                                label="resources.application.fields.git_repo_url"
                                source="context.application_url"
                                validate={validateText}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <>
                                <Typography variant="subtitle2" gutterBottom>
                                    {translate('resources.application.tips.config_path')}
                                </Typography>
                                <TextInput
                                    {...rest}
                                    label="resources.application.fields.config_path"
                                    source="context.application_config_path"
                                    placeholder="config.yaml"
                                />
                            </>
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'helm_repo' && (
                            <TextInput
                                {...rest}
                                label="resources.application.fields.helm_repo_url"
                                source="context.application_url"
                                validate={validateText}
                            />
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'helm_repo' && (
                            <>
                                <TextInput
                                    {...rest}
                                    label="resources.application.fields.nocalhost_config"
                                    source="context.nocalhost_config"
                                    multiline
                                    fullWidth={true}
                                    rowsMax={22}
                                    className={classes.fullWidth}
                                    placeholder={config}
                                />
                                <Typography variant="subtitle2" gutterBottom>
                                    {translate('resources.application.tips.helm_chart_name')}
                                </Typography>
                            </>
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData }) =>
                        formData.context.source === 'git' &&
                        ['helm_chart', 'kustomize', 'rawManifest'].includes(
                            formData.context.install_type
                        ) && (
                            <>
                                <Typography variant="subtitle2" gutterBottom>
                                    {translate('resources.application.tips.resource_dir')}
                                </Typography>
                                <ArrayInput
                                    source="dirs"
                                    label="resources.application.fields.resource_dir"
                                >
                                    <SimpleFormIterator>
                                        <TextInput
                                            label="resources.application.fields.resource_dir"
                                            source="dir"
                                            defaultValue="."
                                        />
                                    </SimpleFormIterator>
                                </ArrayInput>
                            </>
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Edit>
    );
};

export default ApplicationEdit;
