import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserType } from '../../../services';

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

export interface NsType {
    Name: string;
    Cluster: string;
    IstioEnabled: number;
    owner?: number;
    collaborator: Array<number>;
    state: 'import' | 'error' | 'default';
    is_basespace: number;
    error?: string;
}

export const SelectCooperator = (props: {
    user: Array<UserType>;
    value: UserType['id'][];
    owner: NsType['owner'];
    disabled?: boolean;
    onChange: (user: UserType['id'][]) => void;
}) => {
    const { value, user, owner, onChange, disabled } = props;

    const { t } = useTranslation();

    const [values, setValues] = useState<UserType['id'][]>();

    useEffect(() => {
        setValues(value);
    }, [value]);

    return (
        <Select
            showSearch
            disabled={disabled}
            mode="multiple"
            placeholder={t('resources.devSpace.import.tips.cooperator')}
            value={values}
            style={{ width: '100%' }}
            filterOption={(input, option) =>
                (input &&
                    option &&
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
                false
            }
            onChange={(value) => onChange(value)}
        >
            {user.map(({ id, name }) => {
                if (id === owner) {
                    return null;
                }

                return (
                    <Option value={id} key={id}>
                        {name}
                    </Option>
                );
            })}
        </Select>
    );
};
