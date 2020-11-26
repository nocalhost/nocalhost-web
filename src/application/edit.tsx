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
        // eslint-disable-next-line
        // @ts-ignore
        const result: Record = {
            status: 1,
            context: JSON.stringify(data.context),
        };
        return result;
    };

    return (
        <Edit transform={transform} title={<Title />} {...props}>
            <SimpleForm {...form}>
                <TextInput
                    label="resources.application.fields.application_name"
                    source="context.application_name"
                />
                <SelectInput
                    source="context.source"
                    label="resources.application.fields.source"
                    initialValue="git"
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
                />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <TextInput
                                label="resources.application.fields.resource_dir"
                                source="context.resource_dir"
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
