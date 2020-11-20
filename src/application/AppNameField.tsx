import React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';

import { Application } from '../types';

const AppNameField: FC<FieldProps<Application>> = (props: FieldProps) => {
    if (!props.record) {
        return null;
    }
    return <div>{props.record.context.application_name}</div>;
};

AppNameField.defaultProps = {
    source: 'context',
    addLabel: true,
};

export default AppNameField;
