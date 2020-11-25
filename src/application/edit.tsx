import React, { FC } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    SelectInput,
    EditProps,
    FormDataConsumer,
    Record,
} from 'react-admin';
import form from '../common/form';

const Title = ({ record }: any) => {
    return <span>Application {record ? `"${record.context.application_name}"` : ''}</span>;
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
                <TextInput label="Application Name" source="context.application_name" />
                <SelectInput
                    source="context.source"
                    label="Source"
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
                                label="Install Type"
                                initialValue="manifest"
                                choices={[
                                    { id: 'manifest', name: 'Manifest' },
                                    { id: 'helm_chart', name: 'Helm Chart' },
                                ]}
                            />
                        )
                    }
                </FormDataConsumer>
                <TextInput label="Application Url" source="context.application_url" />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <TextInput
                                label="Resource Dir"
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
