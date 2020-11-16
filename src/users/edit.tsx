import * as React from 'react';
import { Edit, SimpleForm, TextInput, PasswordInput, BooleanInput } from 'react-admin';

const Title = ({ record }: any) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;
};

const UserEdit = (props: any) => {
    return (
        <Edit {...props} title={<Title />}>
            <SimpleForm>
                <TextInput disabled source="id" />
                <TextInput source="email" />
                <TextInput source="name" />
                <PasswordInput source="password" />
                <PasswordInput source="confirm_password" />
                <BooleanInput
                    format={(status: number) => {
                        return status === 1;
                    }}
                    parse={(inputValue: boolean) => {
                        return inputValue ? 1 : 0;
                    }}
                    label="isActive"
                    source="status"
                />
            </SimpleForm>
        </Edit>
    );
};

export default UserEdit;
