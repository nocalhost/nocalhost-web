import React, { useState } from 'react';
import { Input, InputWrap } from './style-components';
import Icon from '@ant-design/icons';
import { ReactComponent as IconSearch } from '../../images/icon/icon_search.svg';
interface PropsType {
    // value: string;
    onConfirm(a: string): void;
    placeholder?: string;
}

function TableSearchInput(props: PropsType) {
    const { placeholder, onConfirm } = props;
    const [value, setValue] = useState('');
    const onChange = (e: any) => {
        setValue(e.target.value);
    };
    const handleConfirm = (e: any) => {
        if (e.keyCode === 13) {
            onConfirm(value);
        }
    };
    return (
        <InputWrap>
            <Icon component={IconSearch} style={{ fontSize: '16px', color: '#818d98' }}></Icon>
            <Input
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                onKeyUp={handleConfirm}
            />
        </InputWrap>
    );
}

export default TableSearchInput;
