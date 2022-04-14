import { Select } from 'antd';
import React from 'react';

import { UserType } from '../../../services';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

export const SelectOwnerUser = (props: {
    user: Array<UserType>;
    value: number;
    disabled?: boolean;
    onChange: (user: number) => void;
}) => {
    const { value, user, onChange, disabled } = props;

    return (
        <Select
            style={{ width: 140 }}
            showSearch
            defaultValue={value}
            disabled={disabled}
            filterOption={(input, option) =>
                (input &&
                    option &&
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
                false
            }
            onChange={(value) => onChange(value)}
        >
            {user.map(({ id, name }) => (
                <Option value={id} key={id}>
                    {name}
                </Option>
            ))}
        </Select>
    );
};

export const SelectCooperator = (props: {
    user: Array<UserType>;
    value: UserType['id'][];
    disabled?: boolean;
    onChange: (user: UserType['id'][]) => void;
}) => {
    const { value, user, onChange, disabled } = props;

    const { t } = useTranslation();

    return (
        <Select
            showSearch
            disabled={disabled}
            mode="multiple"
            placeholder={t('resources.devSpace.import.tips.cooperator')}
            defaultValue={value}
            style={{ width: '100%' }}
            filterOption={(input, option) =>
                (input &&
                    option &&
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
                false
            }
            onChange={(value) => onChange(value)}
        >
            {user.map(({ id, name }) => (
                <Option value={id} key={id}>
                    {name}
                </Option>
            ))}
        </Select>
    );
};
