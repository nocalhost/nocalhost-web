import React, { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps, FormDataConsumer, Record } from 'react-admin';
import AppNameInput from './AppNameInput';
import AppUrlInput from './AppUrlInput';
import SourceInput from './SourceInput';
import InstallTypeInput from './InstallTypeInput';
import ResourceDirInput from './ResourceDirInput';

const ApplicationEdit: FC<EditProps> = (props: EditProps) => {
    const transform = (data: Record) => {
        // eslint-disable-next-line
        // @ts-ignore
        const result: Record = {
            status: data.status,
            context: JSON.stringify(data.context),
        };
        return result;
    };

    return (
        <Edit transform={transform} {...props}>
            <SimpleForm>
                <AppNameInput source="context.application_name" />
                <SourceInput source="context.source" />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <InstallTypeInput source="context.install_type" {...rest} />
                        )
                    }
                </FormDataConsumer>
                <AppUrlInput source="context.application_url" />
                <FormDataConsumer>
                    {({ formData, ...rest }) =>
                        formData.context.source === 'git' && (
                            <ResourceDirInput source="context.resource_dir" {...rest} />
                        )
                    }
                </FormDataConsumer>
                <TextInput source="status" />
            </SimpleForm>
        </Edit>
    );
};

export default ApplicationEdit;
