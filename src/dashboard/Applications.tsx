import React from 'react';
import { FC } from 'react';
import application from '../application';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const Applications: FC<Props> = ({ value }: any) => {
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/application"
            icon={application.icon}
            title={translate('resources.application.name', { smart_count: 2 })}
            subtitle={value}
        />
    );
};

export default Applications;
