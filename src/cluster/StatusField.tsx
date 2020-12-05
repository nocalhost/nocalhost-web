import React from 'react';
import { FieldProps, sanitizeFieldRestProps } from 'react-admin';
import { get } from 'lodash';
import { Typography, Tooltip } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    fields: { cursor: 'pointer' },
    okIcon: { color: 'green' },
    failedIcon: { color: 'red', transform: 'rotate(45deg)' },
}));

const StatusField = (props: FieldProps) => {
    const classes = useStyles();
    const { record, ...rest } = props;
    const isReady = get(record, 'is_ready');
    const not_ready_message = get(record, 'not_ready_message');
    if (not_ready_message) {
        return (
            <Tooltip title={not_ready_message} arrow>
                <Typography
                    className={classes.fields}
                    component="span"
                    variant="body2"
                    {...sanitizeFieldRestProps(rest)}
                >
                    {isReady ? (
                        <CheckCircleOutlineIcon className={classes.okIcon} />
                    ) : (
                        <ControlPointIcon className={classes.failedIcon} />
                    )}
                </Typography>
            </Tooltip>
        );
    } else {
        return (
            <Typography component="span" variant="body2" {...sanitizeFieldRestProps(rest)}>
                {isReady ? (
                    <CheckCircleOutlineIcon className={classes.okIcon} />
                ) : (
                    <ControlPointIcon className={classes.failedIcon} />
                )}
            </Typography>
        );
    }
};

StatusField.defaultProps = { source: 'status', addLabel: true };

export default StatusField;
