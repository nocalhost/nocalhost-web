import React from 'react';
import { FieldProps, sanitizeFieldRestProps } from 'react-admin';
import { get } from 'lodash';
import { Typography } from '@material-ui/core';
import moment from 'moment';

const DateField = (props: FieldProps) => {
    const { record, source, ...rest } = props;
    const value = get(record, source || 0);
    const time = moment(value).format('YYYY-MM-DD hh:mm:ss');
    return (
        <Typography component="span" variant="body2" {...sanitizeFieldRestProps(rest)}>
            {time}
        </Typography>
    );
};

DateField.defaultProps = { source: 'created_at', addLabel: true };

export default DateField;
