import React from 'react';
import { FC } from 'react';
import { InputProps, TextInput } from 'react-admin';

const AppNameInput: FC<InputProps> = () => {
    return <TextInput source="context" label="Application Name" />;
};

AppNameInput.defaultProps = {
    addField: true,
    source: 'context',
    resource: 'application',
};

export default AppNameInput;
