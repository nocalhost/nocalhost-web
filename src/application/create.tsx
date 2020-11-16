import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const ApplicationCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="context" />
                <TextInput source="status" />
            </SimpleForm>
        </Create>
    );
};

export default ApplicationCreate;
