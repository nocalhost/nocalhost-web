import React from 'react';
import { AppBar, useLocale, useSetLocale } from 'react-admin';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    title: {
        flex: 1,
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    },
    spacer: {
        flex: 1,
    },
});

const CustomAppBar = (props: any) => {
    const classes = useStyles();

    const locale = useLocale();
    const setLocale = useSetLocale();

    const toggleLang = () => {
        if (locale === 'en') {
            setLocale('zh');
        } else {
            setLocale('en');
        }
    };

    return (
        <AppBar {...props} elevation={1}>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.title}
                id="react-admin-title"
            />
            <span className={classes.spacer} />
            <IconButton color="inherit" onClick={toggleLang}>
                <TranslateIcon />
            </IconButton>
        </AppBar>
    );
};

export default CustomAppBar;
