import React, { useState } from 'react';
import { Select } from 'antd';
import Icon from '@ant-design/icons';

import styled from 'styled-components';
import { ReactComponent as IconCooperation } from '../../../images/icon/icon_label_cooperator.svg';
import { ReactComponent as IconViewer } from '../../../images/icon/icon_label_viewer.svg';

const ContentWrap = styled.div`
    display: flex;
    align-items: center;
`;

const options = [
    {
        label: 'Viewer',
        value: 'Viewer',
    },
    {
        label: 'Cooperator',
        value: 'Cooperator',
    },
];

interface PropParam {
    defaultValue?: string;
    user_id: any;
    onChange: (value: string, user_id: string) => void;
}

const ShareType = (props: PropParam) => {
    const { defaultValue = 'Cooperator', user_id, onChange } = props;
    const [currentType, setCurrentType] = useState('Cooperator');
    const handleChange = (value: any) => {
        // handleChange
        setCurrentType(value);
        onChange(value, user_id);
    };
    return (
        <ContentWrap>
            <Icon
                component={currentType === 'Cooperator' ? IconCooperation : IconViewer}
                style={{ fontSize: 20, marginRight: 8 }}
            />
            <Select
                defaultValue={defaultValue}
                bordered={false}
                style={{ width: 100 }}
                options={options}
                onChange={handleChange}
            ></Select>
        </ContentWrap>
    );
};

export default ShareType;
