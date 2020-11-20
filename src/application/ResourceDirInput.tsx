import React from 'react';
import { FC } from 'react';
import { InputProps, TextInput } from 'react-admin';

const ResourceDirInput: FC<InputProps> = () => {
    return <TextInput source="context.resource_dir" label="Resource Dir" />;
};

ResourceDirInput.defaultProps = {
    addField: true,
    source: 'context.resource_dir',
    resource: 'application',
};

export default ResourceDirInput;
