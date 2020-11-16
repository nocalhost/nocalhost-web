import * as React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const ApplicationEdit = (props: any) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <TextInput source="context" />
                <TextInput source="status" />
            </SimpleForm>
        </Edit>
    );
};

export default ApplicationEdit;
