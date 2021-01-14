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
    Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Notification, useLogin, useNotify, useTranslate } from 'react-admin';
import Logo from '../images/logo-white.png';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles(() => ({
    layout: {
        backgroundImage: 'linear-gradient(180deg, #0078F9 0%, #fff 200%);',
        minHeight: '100vh',
    },
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        height: 60,
        background: 'rgba(9,10,10,0.7)',
    },
    docsbutton: {
        color: '#fff',
        height: 36,
        padding: '0 20px',
        borderRadius: 4,
        transition: 'all ease-in-out 0.2s',
        textTransform: 'none',
        '&:hover': {
            background: 'rgba(0,128,255,0.5)',
        },
        '&:active': {
            background: 'rgb(0,128,255)',
        },
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 20px 80px',
    },
    h1: {
        fontSize: 36,
        margin: '80px auto 60px',
        color: '#fff',
        fontWeight: 500,
    },
    box: {
        maxWidth: 440,
        width: '100%',
        background: '#fff',
        borderRadius: 20,
        boxShadow: '0px 1px 1px 0px rgba(0,0,0,0.14), 0px 6px 10px 0px rgba(0,0,0,0.10)',
        display: 'flex',
        padding: '36px 40px 40px',
        boxSizing: 'border-box',
    },
    card: {
        boxShadow: 'none',
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 30,
    },
    form: {
        padding: '0 0 30px',
    },
    input: {
        marginTop: 20,
    },
    actions: {
        padding: 0,
    },
    hint: {
        marginTop: 30,
        fontSize: 13,
        display: 'flex',
        alignItems: 'center',
        transition: 'all ease-in-out 0.2s',
    },
    infoicon: {
        fontSize: 14,
        marginRight: 4,
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
        variant="outlined"
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
        <Box className={classes.layout}>
            <div className={classes.navbar}>
                <Link href="https://nocalhost.dev">
                    <img src={Logo} height="48" />
                </Link>
                <Button
                    href="https://nocalhost.dev/getting-started/"
                    className={classes.docsbutton}
                >
                    Docs
                </Button>
            </div>
            <Form
                onSubmit={handleSubmit}
                validate={validate}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <div className={classes.main}>
                            <Typography variant="h1" gutterBottom className={classes.h1}>
                                Nocalhost Web Dashboard
                            </Typography>
                            <div className={classes.box}>
                                <Card className={classes.card}>
                                    <Typography variant="h2" gutterBottom className={classes.title}>
                                        Sign in
                                    </Typography>
                                    <div className={classes.form}>
                                        <div className={classes.input}>
                                            <Field
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
                                            size="large"
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
                                    <Link
                                        href="https://nocalhost.dev/FAQ/default-account"
                                        target="_blank"
                                        className={classes.hint}
                                    >
                                        <InfoIcon color="primary" className={classes.infoicon} />
                                        Get the default admin account
                                    </Link>
                                </Card>
                                <Notification />
                            </div>
                        </div>
                    </form>
                )}
            />
        </Box>
    );
};

export default Login;
