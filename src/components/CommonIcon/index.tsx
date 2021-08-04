import React, { useState } from 'react';
import { Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';

export const IconBox = styled.div`
    cursor: pointer;
`;

type TooltipPlacement =
    | 'top'
    | 'left'
    | 'right'
    | 'bottom'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom';
interface StyleType {
    fontSize?: string;
    color?: string;
}

interface PropsType {
    HoverIcon: React.ComponentType;
    NormalIcon: React.ComponentType;
    style?: StyleType;
    title?: string;
    placement?: TooltipPlacement;
}

function CommonIcon(props: PropsType) {
    const { HoverIcon, NormalIcon, style, title, placement = 'top' } = props;
    const [isSelect, setIsSelect] = useState(false);
    return title ? (
        <Tooltip title={title} placement={placement}>
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
