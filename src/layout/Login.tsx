import React from 'react';
import { useState } from 'react';
import { Field, withTypes } from 'react-final-form';
import { useLocation } from 'react-router-dom';

import {
    Button,
    Card,
    CardActions,
    CircularProgress,
    TextField,
    Typography,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Notification, useLogin, useNotify, useTranslate } from 'react-admin';
import Logo from '../images/logo-vertical-black.png';

const useStyles = makeStyles(() => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#0080ff',
        backgroundSize: 'cover',
    },
    left: { width: 300 },
    text: { textAlign: 'center', marginTop: '1rem' },
    right: { width: 300 },
    box: {
        minWidth: 600,
        marginTop: '6em',
        background: '#fff',
        boxShadow:
            '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
        display: 'flex',
    },
    logo: { marginTop: '3rem', marginLeft: 80 },
    card: { boxShadow: 'none' },
    avatar: {
        marginTop: '1.5em',
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {},
    hint: {
        marginTop: '1em',
        marginBottom: '1.5em',
        display: 'flex',
        justifyContent: 'center',
    },
    form: {
        padding: '0 1em 1em 1em',
    },
    input: {
        marginTop: '1em',
    },
    actions: {
        padding: '0 1em 1em 1em',
    },
}));

const renderInput = ({
    meta: { touched, error } = { touched: false, error: undefined },
    input: { ...inputProps },
    ...props
}) => (
    <TextField
        error={!!(touched && error)}
        helperText={touched && error}
        {...inputProps}
        {...props}
        fullWidth
    />
);

interface FormValues {
    email?: string;
    password?: string;
}

const { Form } = withTypes<FormValues>();

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();
    const classes = useStyles();
    const notify = useNotify();
    const login = useLogin();
    const location = useLocation<{ nextPathname: string } | null>();

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);
        login(auth, location.state ? location.state.nextPathname : '/').catch((error: Error) => {
            setLoading(false);
            notify(
                typeof error === 'string'
                    ? error
                    : typeof error === 'undefined' || !error.message
                    ? 'ra.auth.sign_in_error'
                    : error.message,
                'warning'
            );
        });
    };

    const validate = (values: FormValues) => {
        const errors: FormValues = {};
        if (!values.email) {
            errors.email = translate('ra.validation.required');
        }
        if (!values.password) {
            errors.password = translate('ra.validation.required');
        }
        return errors;
    };

    return (
        <Form
            onSubmit={handleSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} noValidate>
                    <div className={classes.main}>
                        <div className={classes.box}>
                            <div className={classes.left}>
                                <div className={classes.logo}>
                                    <img src={Logo} width="140" />
                                </div>
                                <Typography
                                    className={classes.text}
                                    variant="button"
                                    display="block"
                                    gutterBottom
                                >
                                    <Link href="https://nocalhost.dev" target="_blank">
                                        Learn how to use Nocalhost
                                    </Link>
                                </Typography>
                            </div>
                            <div className={classes.right}>
                                <Card className={classes.card}>
                                    <div className={classes.avatar}>
                                        <Typography variant="h6" gutterBottom>
                                            Login Nocalhost Admin
                                        </Typography>
                                    </div>
                                    <div className={classes.form}>
                                        <div className={classes.input}>
                                            <Field
                                                autoFocus
                                                name="email"
                                                // eslint-disable-next-line
                                                // @ts-ignore
                                                component={renderInput}
                                                label={translate('ra.auth.email')}
                                                disabled={loading}
                                            />
                                        </div>
                                        <div className={classes.input}>
                                            <Field
                                                name="password"
                                                // eslint-disable-next-line
                                                // @ts-ignore
                                                component={renderInput}
                                                label={translate('ra.auth.password')}
                                                type="password"
                                                disabled={loading}
                                            />
                                        </div>
                                    </div>
                                    <CardActions className={classes.actions}>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="primary"
                                            disabled={loading}
                                            fullWidth
                                        >
                                            {loading && (
                                                <CircularProgress size={25} thickness={2} />
                                            )}
                                            {translate('ra.auth.sign_in')}
                                        </Button>
                                    </CardActions>
                                    <div className={classes.hint}>
                                        <Link
                                            href="https://nocalhost.dev/FAQ/default-account"
                                            target="_blank"
                                        >
                                            Get Default Admin Account
                                        </Link>
                                    </div>
                                </Card>
                                <Notification />
                            </div>
                        </div>
                    </div>
                </form>
            )}
        />
    );
};

export default Login;
