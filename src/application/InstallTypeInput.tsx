import React from 'react';
import { FC } from 'react';
import { InputProps, SelectInput } from 'react-admin';

const InstallTypeInput: FC<InputProps> = () => {
    return (
        <SelectInput
            source="context.install_type"
            label="Install Type"
            initialValue="manifest"
            choices={[
                { id: 'manifest', name: 'Manifest' },
                { id: 'helm_chart', name: 'Helm Chart' },
            ]}
        />
    );
};

InstallTypeInput.defaultProps = {
    addField: true,
    source: 'context.install_type',
    resource: 'application',
};

export default InstallTypeInput;
