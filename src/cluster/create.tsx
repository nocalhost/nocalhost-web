import React from 'react';
import { FC } from 'react';
import { Create, SimpleForm, TextInput, CreateProps } from 'react-admin';
import { Base64 } from 'js-base64';
import { validateText } from '../common/validation';

const ClusterCreate: FC<CreateProps> = (props) => {
    const transform = (data: any) => ({
        ...data,
        kubeconfig: Base64.encode(data.kubeconfig, false),
    });
    return (
        <Create {...props} transform={transform}>
            <SimpleForm>
                <TextInput
                    label="resources.cluster.fields.cluster_name"
                    source="name"
                    required={true}
                    validate={validateText}
                />
                <TextInput
                    label="resources.cluster.fields.marks"
                    source="marks"
                    required={true}
                    validate={validateText}
                />
                <TextInput
                    label="resources.cluster.fields.kubeconfig"
                    multiline
                    fullWidth={true}
                    source="kubeconfig"
                    required={true}
                    validate={validateText}
                />
            </SimpleForm>
        </Create>
    );
};

export default ClusterCreate;
