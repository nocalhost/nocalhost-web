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
} from 'react-admin';
import form from '../common/form';

const Title = ({ record }: any) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;
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
