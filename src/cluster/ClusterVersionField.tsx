import React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';

import { Cluster, ClusterInfo } from '../types';

const ClusterVersionField: FC<FieldProps<Cluster>> = (props: FieldProps) => {
    if (!props.record) {
        return null;
    }
    if (props.record.info.length <= 0) {
        return null;
    }
    const context: ClusterInfo = JSON.parse(props.record.info);
    return <div>{context.cluster_version}</div>;
};

ClusterVersionField.defaultProps = {
    source: 'info',
    addLabel: true,
};

export default ClusterVersionField;
