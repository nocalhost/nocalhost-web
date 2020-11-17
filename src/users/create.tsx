import React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
    BooleanInput,
    CreateProps,
} from 'react-admin';

const UserCreate: FC<CreateProps> = (props) => {
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
