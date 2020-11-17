import React from 'react';
import { FC } from 'react';
import { Create, SimpleForm, TextInput, CreateProps } from 'react-admin';
import { Base64 } from 'js-base64';

const ClusterCreate: FC<CreateProps> = (props) => {
    const transform = (data: any) => ({
        ...data,
        kubeconfig: Base64.encode(data.kubeconfig, false),
    });
    return (
        <Create {...props} transform={transform}>
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="marks" />
                <TextInput multiline fullWidth={true} source="kubeconfig" />
            </SimpleForm>
        </Create>
    );
};

export default ClusterCreate;
