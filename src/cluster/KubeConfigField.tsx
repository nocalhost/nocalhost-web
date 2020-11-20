import React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';

import { Cluster } from '../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({ kube: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }));

const KubeConfigField: FC<FieldProps<Cluster>> = (props: FieldProps) => {
    const classes = useStyles();
    if (!props.record) {
        return null;
    }
    return <pre className={classes.kube}>{props.record.kubeconfig}</pre>;
};

KubeConfigField.defaultProps = {
    source: 'kubeconfig',
    addLabel: true,
};

export default KubeConfigField;
