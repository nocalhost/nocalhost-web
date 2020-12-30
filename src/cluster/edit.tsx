import React from 'react';
import { FC } from 'react';
import {
    Edit,
    SimpleForm,
    TextInput,
    EditProps,
    useTranslate,
    FormDataConsumer,
} from 'react-admin';
import StorageClassInput from './storage-class-input';
import { Base64 } from 'js-base64';
import { validateText } from '../common/validation';
import { Typography } from '@material-ui/core';

const ClusterEdit: FC<EditProps> = (props) => {
    const transform = (data: any) => ({
        ...data,
        kubeconfig: Base64.encode(data.kubeconfig, false),
        storage_class: data.storage_class ? data.storage_class : '',
    });
    return (
        <Edit {...props} transform={transform}>
            <SimpleForm redirect="list">
                <TextInput
                    label="resources.cluster.fields.name"
                    source="name"
                    validate={validateText}
                    disabled
                />
                <KubeConfigInput />
            </SimpleForm>
        </Edit>
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
                disabled
            />
            <FormDataConsumer>
                {({ formData, ...rest }) => <StorageClassInput formData={formData} {...rest} />}
            </FormDataConsumer>
        </>
    );
};

export default ClusterEdit;
