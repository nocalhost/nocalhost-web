import React from 'react';
import { FC } from 'react';
import { InputProps, TextInput, useInput } from 'react-admin';

const AppNameInput: FC<InputProps> = (props: InputProps) => {
    const input = useInput(props);
    console.log(input);
    return <TextInput source="context.application_name" label="Application Name" />;
};

AppNameInput.defaultProps = {
    addField: true,
    source: 'context.application_name',
    resource: 'application',
};

export default AppNameInput;
