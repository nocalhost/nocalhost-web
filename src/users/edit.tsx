import React from 'react';
import { FC } from 'react';
import {
    Edit,
    EditProps,
    SimpleForm,
    TextInput,
    Record,
    PasswordInput,
    BooleanInput,
    useTranslate,
} from 'react-admin';
import form from '../common/form';
import { validateText, validateEmail } from '../common/validation';

const Title = ({ record }: any) => {
    const translate = useTranslate();
    return (
        <span>
            {translate('resources.users.name', { smart_count: 1 })}{' '}
            {record ? `"${record.name}"` : ''}
        </span>
    );
};

const UserEdit: FC<EditProps> = (props) => {
    const transform = (data: Record) => {
        // eslint-disable-next-line
        // @ts-ignore
        const result: Record = {
            status: data.status ? 1 : 0,
            is_admin: data.is_admin ? 1 : 0,
            ...data,
        };
        return result;
    };
    const validateUserUpdate = (values: any) => {
        const errors: any = {};
        if (values.password) {
            if (!values.confirm_password) {
                errors.confirm_password = ['nh.validation.required.confirm_password'];
            }
            if (values.password !== values.confirm_password) {
                errors.confirm_password = ['nh.validation.confirm_password_error'];
            }
        }
        return errors;
    };
    return (
        <Edit {...props} undoable={false} transform={transform} title={<Title />}>
            <SimpleForm validate={validateUserUpdate} {...form}>
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
                <BooleanInput
                    format={(is_admin: number) => is_admin === 1}
                    parse={(inputValue: boolean) => (inputValue ? 1 : 0)}
                    label="resources.users.fields.is_admin"
                    source="is_admin"
                />
            </SimpleForm>
        </Edit>
    );
};

export default UserEdit;
