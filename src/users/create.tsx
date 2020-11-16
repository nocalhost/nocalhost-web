import * as React from 'react';
import { Create, SimpleForm, TextInput, PasswordInput, BooleanInput } from 'react-admin';

const UserCreate = (props: any) => {
    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="email" />
                <TextInput source="name" />
                <PasswordInput source="password" />
                <PasswordInput source="confirm_password" />
                <BooleanInput
                    format={(status: number) => status === 1}
                    parse={(inputValue: boolean) => (inputValue ? 1 : 0)}
                    label="isActive"
                    source="status"
                />
            </SimpleForm>
        </Create>
    );
};

export default UserCreate;
