import React from 'react';
import { FC } from 'react';
import { Create, SimpleForm, TextInput, CreateProps, useTranslate } from 'react-admin';
import { Base64 } from 'js-base64';
import { validateText } from '../common/validation';
import { Typography } from '@material-ui/core';

const ClusterCreate: FC<CreateProps> = (props) => {
    const transform = (data: any) => ({
        ...data,
        kubeconfig: Base64.encode(data.kubeconfig, false),
    });
    return (
        <Create {...props} transform={transform}>
            <SimpleForm redirect="list">
                <TextInput
                    label="resources.cluster.fields.cluster_name"
                    source="name"
                    validate={validateText}
                />
                <TextInput
                    label="resources.cluster.fields.marks"
                    source="marks"
                    validate={validateText}
                />
                <KubeConfigInput />
            </SimpleForm>
        </Create>
    );
};

const KubeConfigInput = () => {
    const translate = useTranslate();
    return (
        <>
            <Typography variant="h6" gutterBottom>
                {translate('resources.cluster.fields.kubeconfig')}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                {translate('resources.cluster.tips.kubeconfig')}
            </Typography>
            <Typography variant="body2" gutterBottom>
                <code>
                    kubectl config use-context dev-cluster <br />
                    kubectl config view --minify --raw --flatten
                </code>
            </Typography>
            <TextInput
                label="resources.cluster.fields.kubeconfig"
                multiline
                fullWidth={true}
                source="kubeconfig"
                validate={validateText}
            />
        </>
    );
};

export default ClusterCreate;
