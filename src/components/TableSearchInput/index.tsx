import React from 'react';
import { Input, InputWrap } from './style-components';
import { SearchOutlined } from '@ant-design/icons';

function TableSearchInput() {
    return (
        <InputWrap>
            <SearchOutlined style={{ fontSize: '16px', color: '#818d98' }} />
            <Input placeholder="搜索用户名称" />
        </InputWrap>
    );
}

export default TableSearchInput;
