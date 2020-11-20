import React, { FC, useEffect } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    EditProps,
    FormDataConsumer,
    useEditController,
} from 'react-admin';
import AppNameInput from './AppNameInput';
import AppUrlInput from './AppUrlInput';
import SourceInput from './SourceInput';
import InstallTypeInput from './InstallTypeInput';
import ResourceDirInput from './ResourceDirInput';

const ApplicationEdit: FC<EditProps> = (props: EditProps) => {
    const { record, resource } = useEditController(props);
    // console.log(record);
    // console.log(resource);

    useEffect(() => {
        if (record) {
            console.log(record);
            console.log(resource);
            //eslint-disable-next-line
            //@ts-ignore
            const contextStr = record['context'];
            const context = JSON.parse(contextStr);
            console.log(context);
            const newRecord = { ...record, ...context };
            console.log(newRecord);
        }
    }, [record]);

    return (
        <Edit {...props}>
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
