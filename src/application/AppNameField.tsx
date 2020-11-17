import React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';

import { Application, ApplicationContext } from '../types';

const AppNameField: FC<FieldProps<Application>> = (props: FieldProps) => {
    if (!props.record) {
        return null;
    }
    const context: ApplicationContext = JSON.parse(props.record.context);
    return <div>{context.application_name}</div>;
};

AppNameField.defaultProps = {
    source: 'context',
    addLabel: true,
};

export default AppNameField;
