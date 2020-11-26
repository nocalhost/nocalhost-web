import React, { FC } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    EditProps,
    FormDataConsumer,
    Record,
    useTranslate,
} from 'react-admin';
import { validateText } from '../common/validation';
import form from '../common/form';

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
        <Edit transform={transform} title={<Title />} {...props}>
            <SimpleForm {...form}>
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
                                {...rest}
                                source="context.install_type"
                                label="resources.application.fields.install_type"
                                initialValue="manifest"
                                validate={validateText}
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
                                label="resources.application.fields.resource_dir"
                                source="context.resource_dir"
                                validate={validateText}
                                {...rest}
                            />
                        )
                    }
                </FormDataConsumer>
            </SimpleForm>
        </Edit>
    );
};

export default ApplicationEdit;
