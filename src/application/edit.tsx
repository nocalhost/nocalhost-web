import React, { FC } from 'react';
import {
    Edit,
    SimpleForm,
    BooleanInput,
    TextInput,
    SelectInput,
    EditProps,
    FormDataConsumer,
    Record,
} from 'react-admin';

const ApplicationEdit: FC<EditProps> = (props: EditProps) => {
    const transform = (data: Record) => {
        // eslint-disable-next-line
        // @ts-ignore
        const result: Record = {
            status: data.status ? 1 : 0,
            context: JSON.stringify(data.context),
        };
        return result;
    };

    return (
        <Edit transform={transform} {...props}>
            <SimpleForm>
                <TextInput source="context.application_name" />
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
                <TextInput source="context.application_url" />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <TextInput source="context.resource_dir" {...rest} />
                        )
                    }
                </FormDataConsumer>
                <BooleanInput
                    format={(status: number) => status === 1}
                    parse={(inputValue: boolean) => (inputValue ? 1 : 0)}
                    label="isActive"
                    source="status"
                />
            </SimpleForm>
        </Edit>
    );
};

export default ApplicationEdit;
