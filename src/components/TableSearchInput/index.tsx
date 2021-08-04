import React, { useState } from 'react';
import { Input, InputWrap } from './style-components';
import { SearchOutlined } from '@ant-design/icons';

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
            <SearchOutlined style={{ fontSize: '16px', color: '#818d98' }} />
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
