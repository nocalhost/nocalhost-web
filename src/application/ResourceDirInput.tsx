import React from 'react';
import { TextInput, useTranslate } from 'react-admin';
import { Typography } from '@material-ui/core';
import { validateText } from '../common/validation';

const ResourcesDirInput = () => {
    const translate = useTranslate();
    return (
        <>
            <Typography variant="subtitle2" gutterBottom>
                {translate('resources.application.tips.resource_dir')}
            </Typography>
            <TextInput
                label="Resource Dir"
                source="context.resource_dir"
                defaultValue="."
                validate={validateText}
            />
        </>
    );
};

export default ResourcesDirInput;
