import React from 'react';
import { FC } from 'react';
import { InputProps, SelectInput } from 'react-admin';

const SourceInput: FC<InputProps> = () => {
    return (
        <SelectInput
            source="context.source"
            label="Source"
            initialValue="git"
            choices={[
                { id: 'git', name: 'Git' },
                { id: 'helm_repo', name: 'Helm Repo' },
            ]}
        />
    );
};

SourceInput.defaultProps = {
    addField: true,
    source: 'context.source',
    resource: 'application',
};

export default SourceInput;
