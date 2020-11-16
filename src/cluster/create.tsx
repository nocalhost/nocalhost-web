import * as React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const ClusterCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="marks" />
                <TextInput source="kubeconfig" />
            </SimpleForm>
        </Create>
    );
};

export default ClusterCreate;
