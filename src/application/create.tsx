import React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    SelectInput,
    CreateProps,
    FormDataConsumer,
    Record,
    ArrayInput,
    SimpleFormIterator,
    useTranslate,
} from 'react-admin';
import { validateText } from '../common/validation';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    resource: {
        width: '256px',
    },
});

const ApplicationCreate: FC<CreateProps> = (props: CreateProps) => {
    const classes = useStyles();
    const translate = useTranslate();
    const transform = (data: Record) => {
        let context = data.context;
        context = { ...context, resource_dir: [context.resource_dir] };
        if (data.context.source === 'git' && data.context.install_type === 'helm_chart') {
            context = {
                ...context,
                resource_dir:
                    data.dirs && data.dirs.length > 0
                        ? data.dirs.map((d: { dir: string }) => d.dir)
                        : ['.'],
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
        <Create {...props} transform={transform}>
            <SimpleForm redirect="list">
                <TextInput
                    label="resources.application.fields.application_name"
                    source="context.application_name"
                    validate={validateText}
                />
                <SelectInput
                    source="context.source"
                    label="resources.application.fields.source"
                    initialValue="git"
                    validate={validateText}
                    choices={[
                        { id: 'git', name: 'Git' },
                        { id: 'helm_repo', name: 'Helm Repo' },
                    ]}
                />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <SelectInput
                                validate={validateText}
                                {...rest}
                                label="resources.application.fields.install_type"
                                source="context.install_type"
                                initialValue="manifest"
                                choices={[
                                    { id: 'manifest', name: 'Manifest' },
                                    { id: 'helm_chart', name: 'Helm Chart' },
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
                    {({ formData }) =>
                        formData.context.source === 'git' &&
                        formData.context.install_type === 'manifest' && (
                            <>
                                <Typography variant="subtitle2" gutterBottom>
                                    {translate('resources.application.tips.resource_dir')}
                                </Typography>
                                <TextInput
                                    label="resources.application.fields.resource_dir"
                                    source="context.resource_dir"
                                    defaultValue="."
                                    className={classes.resource}
                                    validate={validateText}
                                />
                            </>
                        )
                    }
                </FormDataConsumer>
                <FormDataConsumer>
                    {({ formData }) =>
                        formData.context.source === 'git' &&
                        formData.context.install_type === 'helm_chart' && (
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
        </Create>
    );
};

export default ApplicationCreate;
