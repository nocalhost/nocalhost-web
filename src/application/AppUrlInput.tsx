import React from 'react';
import { FC } from 'react';
import { InputProps, TextInput } from 'react-admin';

const AppUrlInput: FC<InputProps> = () => {
    return <TextInput source="context" label="Application Url" />;
};

AppUrlInput.defaultProps = {
    addField: true,
    source: 'context',
    resource: 'application',
};

export default AppUrlInput;
