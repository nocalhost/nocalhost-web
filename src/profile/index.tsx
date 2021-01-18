import React from 'react';
import { useCallback, FC, useEffect, useState } from 'react';
import { SimpleForm, TextInput, PasswordInput, useDataProvider } from 'react-admin';
import { validateText, validateEmail } from '../common/validation';

import { Toolbar, SaveButton } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    inlineBlock: { display: 'inline-flex', marginRight: '1rem' },
});

const CustomToolbar = (props: any) => {
    const dataProvider = useDataProvider();
    const fetchData = useCallback(async (obj) => {
        await dataProvider.update<User>('users', obj);
        localStorage.setItem('username', obj.data.email);
        location.reload();
    }, []);
    return (
        <Toolbar {...props} classes={useStyles()}>
            <SaveButton
                onSave={(values: any) => {
                    fetchData({ id: values.id, data: values, previousData: props.record });
                }}
            />
        </Toolbar>
    );
};

interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    is_admin: number;
    status: number;
    avatar: string;
}

const Profile: FC = () => {
    const [user, setUser] = useState({
        id: 0,
        name: '',
        email: '',
        phone: '',
        is_admin: 0,
        status: 0,
        avatar: '',
    });
    const dataProvider = useDataProvider();
    const fetchData = useCallback(async () => {
        const { data } = await dataProvider.getOne<User>('profile', { id: 'profile' });
        setUser(data);
    }, []);
    useEffect(() => {
        fetchData();
    }, []);
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
    const classes = useStyles();
    return (
        <SimpleForm validate={validateUserUpdate} toolbar={<CustomToolbar />} record={user}>
            <TextInput
                source="email"
                validate={validateEmail}
                label="resources.profile.fields.email"
                className={classes.inlineBlock}
            />
            <TextInput
                source="name"
                validate={validateText}
                label="resources.profile.fields.name"
                className={classes.inlineBlock}
            />
            <PasswordInput source="password" label="resources.profile.fields.password" />
            <PasswordInput
                source="confirm_password"
                label="resources.profile.fields.confirm_password"
            />
        </SimpleForm>
    );
};

export default Profile;
