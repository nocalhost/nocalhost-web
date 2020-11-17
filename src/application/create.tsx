import React from 'react';
import { FC } from 'react';
import { Create, SimpleForm, TextInput, CreateProps } from 'react-admin';
import AppNameInput from './AppNameInput';
import AppUrlInput from './AppUrlInput';

const ApplicationCreate: FC<CreateProps> = (props: CreateProps) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <AppNameInput source="context" />
                <AppUrlInput source="context" />
                <TextInput source="context" />
                <TextInput source="status" />
            </SimpleForm>
        </Create>
    );
};

export default ApplicationCreate;
