import React, { forwardRef } from 'react';
import { AppBar, useLocale, useSetLocale, UserMenu, useTranslate } from 'react-admin';
import { IconButton, Typography, MenuItem, ListItemIcon } from '@material-ui/core';
import TranslateIcon from '@material-ui/icons/Translate';
import DescriptionIcon from '@material-ui/icons/Description';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, Theme } from '@material-ui/core/styles';

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

const useMenuStyles = makeStyles(
    (theme: Theme) => ({
        menuItem: {
            color: theme.palette.text.secondary,
            '& > a': {
                textDecoration: 'none',
                color: 'inherit',
            },
        },
        icon: { minWidth: theme.spacing(5) },
    }),
    { name: 'RaLogout' }
);

const Menu = forwardRef<any>((props: any, ref: any) => {
    const translate = useTranslate();
    const classes = useMenuStyles(props);
    return (
        <>
            <MenuItem className={classes.menuItem} ref={ref}>
                <ListItemIcon className={classes.icon}>
                    <HomeIcon />
                </ListItemIcon>
                <a href="https://nocalhost.dev" target="_blank" rel="noreferrer">
                    {translate('nh.layout.menu.home')}
                </a>
            </MenuItem>
            <MenuItem className={classes.menuItem} ref={ref}>
                <ListItemIcon className={classes.icon}>
                    <DescriptionIcon />
                </ListItemIcon>
                <a href="https://nocalhost.dev/getting-started/" target="_blank" rel="noreferrer">
                    {translate('nh.layout.menu.document')}
                </a>
            </MenuItem>
        </>
    );
});

Menu.displayName = 'Menu';

const CustomUserMenu = (props: any) => (
    <UserMenu {...props}>
        <Menu />
    </UserMenu>
);

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
        <AppBar {...props} elevation={1} userMenu={<CustomUserMenu />}>
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
