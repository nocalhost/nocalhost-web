import React from 'react';
import { FC } from 'react';
import {
    Create,
    SimpleForm,
    TextInput,
    PasswordInput,
    BooleanInput,
    CreateProps,
    Record,
} from 'react-admin';

const UserCreate: FC<CreateProps> = (props) => {
    const transform = (data: Record) => {
        // eslint-disable-next-line
        // @ts-ignore
        const result: Record = {
            status: data.status ? 1 : 0,
            ...data,
        };
        return result;
    };
    const validateUserCreation = (values: any) => {
        const errors: any = {};
        if (!values.email) {
            errors.email = ['The Email is required'];
        }
        if (!values.name) {
            errors.name = ['The Name is required'];
        }
        if (!values.password) {
            errors.password = ['The Password is required'];
        }
        if (!values.confirm_password) {
            errors.confirm_password = ['The Confirm Password is required'];
        }
        return errors;
    };
    return (
        <Create transform={transform} {...props}>
            <SimpleForm validate={validateUserCreation}>
                <TextInput source="email" />
                <TextInput source="name" />
                <PasswordInput source="password" />
                <PasswordInput source="confirm_password" />
                <BooleanInput
                    format={(status: number) => status === 1}
                    parse={(inputValue: boolean) => (inputValue ? 1 : 0)}
                    label="resources.users.fields.status"
                    source="status"
                />
            </SimpleForm>
        </Create>
    );
};

export default UserCreate;
