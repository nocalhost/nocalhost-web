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
} from 'react-admin';
import { validateText } from '../common/validation';

const ApplicationCreate: FC<CreateProps> = (props: CreateProps) => {
    const transform = (data: Record) => {
        let context = {};
        if (data.context.source === 'helm_repo') {
            context = {
                application_name: data.context.application_name,
                source: data.context.source,
                application_url: data.context.application_url,
                install_type: 'manifest',
                resource_dir: '/tmp',
            };
        } else {
            context = data.context;
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
                <TextInput
                    label="resources.application.fields.application_url"
                    source="context.application_url"
                    validate={validateText}
                />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <TextInput
                                label="Resource Dir"
                                source="context.resource_dir"
                                validate={validateText}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Create>
    );
};

export default ApplicationCreate;
