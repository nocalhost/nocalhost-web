import React from 'react';
import { FieldProps, sanitizeFieldRestProps } from 'react-admin';
import { get } from 'lodash';
import { Typography } from '@material-ui/core';

const ResourceLimitField = (props: FieldProps) => {
    const { record, ...rest } = props;
    const cpu = get(record, 'cpu' || 0);
    const memory = get(record, 'memory' || 0);
    return (
        <Typography component="span" variant="body2" {...sanitizeFieldRestProps(rest)}>
            CPU: {`${cpu}`} MEM: {`${memory}`}
        </Typography>
    );
};

ResourceLimitField.defaultProps = {
    label: 'resources.space.fields.resource_limit',
    addLabel: true,
};

export default ResourceLimitField;
