import React from 'react';
import { FC } from 'react';
import users from '../users';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const Users: FC<Props> = ({ value }: any) => {
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/users"
            icon={users.icon}
            title={translate('resources.users.name', { smart_count: 2 })}
            subtitle={value}
        />
    );
};

export default Users;
