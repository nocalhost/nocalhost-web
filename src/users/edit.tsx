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
            ...data,
        };
        return result;
    };
    return (
        <Edit {...props} undoable={false} transform={transform} title={<Title />}>
            <SimpleForm {...form}>
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
        </Edit>
    );
};

export default UserEdit;
