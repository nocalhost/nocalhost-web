import { Select } from 'antd';
import React from 'react';
import { UserType } from '../../../services';

const { Option } = Select;

export const SelectOwnerUser = (props: { user: Array<UserType> }) => {
    return (
        <Select
            style={{ width: 140 }}
            showSearch
            placeholder="所有者"
            filterOption={(input, option) =>
                (input &&
                    option &&
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0) ||
                false
            }
        >
            {props.user.map(({ id, name }) => (
                <Option value={id} key={id}>
                    {name}
                </Option>
            ))}
        </Select>
    );
};

export const SelectCooperator = (props: { user: Array<UserType> }) => {
    return (
        <Select
            mode="multiple"
            placeholder="共享用户(选填)"
            // defaultValue={'a10'}
            style={{ width: '100%' }}
        >
            {props.user.map(({ id, name }) => (
                <Option value={id} key={id}>
                    {name}
                </Option>
            ))}
        </Select>
    );
};
