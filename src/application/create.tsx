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

const ApplicationCreate: FC<CreateProps> = (props: CreateProps) => {
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
        <Create {...props} transform={transform}>
            <SimpleForm>
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
        </Create>
    );
};

export default ApplicationCreate;
