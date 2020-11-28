import React from 'react';
import { FC } from 'react';
import { FieldProps, sanitizeFieldRestProps } from 'react-admin';
import { Typography } from '@material-ui/core';
import { Cluster, ClusterInfo } from '../types';

const NodesField: FC<FieldProps<Cluster>> = (props: FieldProps) => {
    const { record, ...rest } = props;
    if (!record) {
        return null;
    }
    if (record.info.length <= 0) {
        return null;
    }
    const context: ClusterInfo = JSON.parse(record.info);
    return (
        <Typography component="span" variant="body2" {...sanitizeFieldRestProps(rest)}>
            {context.nodes}
        </Typography>
    );
};

NodesField.defaultProps = {
    source: 'info',
    addLabel: true,
};

export default NodesField;
