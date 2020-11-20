import React from 'react';
import { FC } from 'react';
import { Create, SimpleForm, TextInput, CreateProps, FormDataConsumer, Record } from 'react-admin';
import AppNameInput from './AppNameInput';
import AppUrlInput from './AppUrlInput';
import SourceInput from './SourceInput';
import InstallTypeInput from './InstallTypeInput';
import ResourceDirInput from './ResourceDirInput';

const ApplicationCreate: FC<CreateProps> = (props: CreateProps) => {
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
        <Create {...props} transform={transform}>
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
        </Create>
    );
};

export default ApplicationCreate;
