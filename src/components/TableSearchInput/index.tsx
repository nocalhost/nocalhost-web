import React, { useState, useRef } from 'react';
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
    const timer = useRef<number | null>();
    const onChange = (e: any) => {
        setValue(e.target.value);
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = window.setTimeout(() => {
            onConfirm(e.target.value);
        }, 1000);
    };
    return (
        <InputWrap>
            <Icon component={IconSearch} style={{ fontSize: '16px', color: '#818d98' }}></Icon>
            <Input value={value} placeholder={placeholder} onChange={onChange} />
        </InputWrap>
    );
}

export default TableSearchInput;
