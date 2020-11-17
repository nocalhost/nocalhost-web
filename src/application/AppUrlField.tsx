import React from 'react';
import { FC } from 'react';
import { FieldProps } from 'react-admin';

import { Application, ApplicationContext } from '../types';

const AppUrlField: FC<FieldProps<Application>> = (props: FieldProps) => {
    if (!props.record) {
        return null;
    }
    const context: ApplicationContext = JSON.parse(props.record.context);
    return <div>{context.application_url}</div>;
};

AppUrlField.defaultProps = {
    source: 'context',
    addLabel: true,
};

export default AppUrlField;
