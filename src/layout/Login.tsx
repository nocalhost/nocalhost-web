import React from 'react';
import { useState } from 'react';
import { Field, withTypes } from 'react-final-form';
import { useLocation } from 'react-router-dom';

import { Avatar, Button, Card, CardActions, CircularProgress, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import { Notification, useLogin, useNotify } from 'react-admin';

const useStyles = makeStyles(() => ({
    main: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundImage:
            'radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    card: {
        minWidth: 300,
        marginTop: '6em',
    },
    avatar: {
        margin: '1em',
        display: 'flex',
        justifyContent: 'center',
    },
    icon: {},
    hint: {
        marginTop: '1em',
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
                    ? 'Authentication failed, please retry'
                    : error.message,
                'warning'
            );
        });
    };

    const validate = (values: FormValues) => {
        const errors: FormValues = {};
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
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
                        <Card className={classes.card}>
                            <div className={classes.avatar}>
                                <Avatar className={classes.icon}>
                                    <LockIcon />
                                </Avatar>
                            </div>
                            <div className={classes.hint}>Hint: admin@admin.com / 123456</div>
                            <div className={classes.form}>
                                <div className={classes.input}>
                                    <Field
                                        autoFocus
                                        name="email"
                                        // eslint-disable-next-line
                                        // @ts-ignore
                                        component={renderInput}
                                        label={'Email'}
                                        disabled={loading}
                                    />
                                </div>
                                <div className={classes.input}>
                                    <Field
                                        name="password"
                                        // eslint-disable-next-line
                                        // @ts-ignore
                                        component={renderInput}
                                        label={'Password'}
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
                                    {loading && <CircularProgress size={25} thickness={2} />}
                                    {'Sign in'}
                                </Button>
                            </CardActions>
                        </Card>
                        <Notification />
                    </div>
                </form>
            )}
        />
    );
};

export default Login;
