import React, { useState } from 'react';
import { Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';

export const IconBox = styled.div`
    cursor: pointer;
`;

interface StyleType {
    fontSize?: string;
    color?: string;
}

interface PropsType {
    HoverIcon: React.ComponentType;
    NormalIcon: React.ComponentType;
    style?: StyleType;
    title?: string;
}

function CommonIcon(props: PropsType) {
    const { HoverIcon, NormalIcon, style, title } = props;
    const [isSelect, setIsSelect] = useState(false);
    return title ? (
        <Tooltip title={title} placement="top">
            <IconBox onMouseEnter={() => setIsSelect(true)} onMouseLeave={() => setIsSelect(false)}>
                <Icon component={isSelect ? HoverIcon : NormalIcon} style={style}></Icon>
            </IconBox>
        </Tooltip>
    ) : (
        <IconBox onMouseEnter={() => setIsSelect(true)} onMouseLeave={() => setIsSelect(false)}>
            <Icon component={isSelect ? HoverIcon : NormalIcon} style={style}></Icon>
        </IconBox>
    );
}
export default CommonIcon;
