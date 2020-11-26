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
import { validateText, validateEmail } from '../common/validation';

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
        if (!values.password) {
            errors.password = ['nh.validation.required.password'];
        }
        if (!values.confirm_password) {
            errors.confirm_password = ['nh.validation.required.confirm_password'];
        }
        if (values.password !== values.confirm_password) {
            errors.confirm_password = ['nh.validation.confirm_password_error'];
        }
        return errors;
    };
    return (
        <Create transform={transform} {...props}>
            <SimpleForm redirect="list" validate={validateUserCreation}>
                <TextInput source="email" validate={validateEmail} />
                <TextInput source="name" validate={validateText} />
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
