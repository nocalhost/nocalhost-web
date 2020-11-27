import * as React from 'react';
import { FC } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Inbox from '@material-ui/icons/Inbox';
import { useTranslate, useListContext, useResourceContext } from 'ra-core';
import inflection from 'inflection';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import { Button } from 'react-admin';

const useStyles = makeStyles(
    (theme) => ({
        message: {
            textAlign: 'center',
            opacity: theme.palette.type === 'light' ? 0.5 : 0.8,
            margin: '0 1em',
            color: theme.palette.type === 'light' ? 'inherit' : theme.palette.text.primary,
        },
        icon: {
            width: '9em',
            height: '9em',
        },
        toolbar: {
            textAlign: 'center',
            marginTop: '2em',
        },
        returnButton: { marginLeft: '20px' },
    }),
    { name: 'RaEmpty' }
);

const Empty: FC<EmptyProps> = (props: EmptyProps) => {
    const { basePath } = useListContext(props);
    let resource = useResourceContext(props);
    if (resource === 'dev_space') {
        resource = 'space';
    }
    const classes = useStyles(props);
    const translate = useTranslate();

    const resourceName = translate(`resources.${resource}.forcedCaseName`, {
        smart_count: 0,
        _: inflection.humanize(
            translate(`resources.${resource}.name`, {
                smart_count: 0,
                _: inflection.pluralize(resource),
            }),
            true
        ),
    });

    const emptyMessage = translate('ra.page.empty', { name: resourceName });
    const inviteMessage = translate('ra.page.invite');

    return (
        <>
            <div className={classes.message}>
                <Inbox className={classes.icon} />
                <Typography variant="h4" paragraph>
                    {translate(`resources.${resource}.empty`, {
                        _: emptyMessage,
                    })}
                </Typography>
                {props.createUrl && (
                    <Typography variant="body1">
                        {translate(`resources.${resource}.invite`, {
                            _: inviteMessage,
                        })}
                    </Typography>
                )}
            </div>
            <div className={classes.toolbar}>
                {props.createUrl && (
                    <Button
                        variant="contained"
                        alignIcon="left"
                        label={'ra.action.create'}
                        basePath={basePath}
                        to={props.createUrl}
                        onClick={(e) => e.stopPropagation()}
                        component={Link}
                    >
                        <AddIcon />
                    </Button>
                )}
                {props.returnUrl && (
                    <Button
                        className={classes.returnButton}
                        variant="contained"
                        alignIcon="left"
                        label={'ra.action.back'}
                        basePath={basePath}
                        to={props.returnUrl}
                        onClick={(e) => e.stopPropagation()}
                        component={Link}
                        color="default"
                    >
                        <ArrowBackIcon />
                    </Button>
                )}
            </div>
        </>
    );
};

export interface EmptyProps {
    resource?: string;
    createUrl?: string;
    returnUrl?: string;
}

export default Empty;
