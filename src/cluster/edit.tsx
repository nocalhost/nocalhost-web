import React from 'react';
import { FC } from 'react';
import { Edit, SimpleForm, TextInput, EditProps, FormDataConsumer } from 'react-admin';
import StorageClassInput from './storage-class-input';
import { validateText } from '../common/validation';

const ClusterEdit: FC<EditProps> = (props) => {
    const transform = (data: any) => ({
        ...data,
        storage_class: data.storage_class ? data.storage_class : '',
    });
    return (
        <Edit {...props} undoable={false} transform={transform}>
            <SimpleForm redirect="list">
                <TextInput
                    label="resources.cluster.fields.name"
                    source="name"
                    validate={validateText}
                    disabled
                />
                <FormDataConsumer>
                    {({ formData, ...rest }) => <StorageClassInput formData={formData} {...rest} />}
                </FormDataConsumer>
            </SimpleForm>
        </Edit>
    );
};

export default ClusterEdit;
