import React from 'react';
import { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps } from 'react-admin';
import AppNameInput from './AppNameInput';
import AppUrlInput from './AppUrlInput';

const ApplicationEdit: FC<EditProps> = (props: EditProps) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <AppNameInput source="context" />
                <AppUrlInput source="context" />
                <TextInput source="context" />
                <TextInput source="status" />
            </SimpleForm>
        </Edit>
    );
};

export default ApplicationEdit;
