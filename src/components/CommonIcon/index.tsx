import React, { useState } from 'react';
import { Tooltip } from 'antd';
import Icon from '@ant-design/icons';
import styled from 'styled-components';
import { useEffect } from 'react';

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
    fontSize?: string | number;
    color?: string;
    marginLeft?: string | number;
    marginRight?: string | number;
}

interface PropsType {
    HoverIcon?: React.ComponentType;
    NormalIcon: React.ComponentType;
    style?: StyleType;
    title?: string;
    placement?: TooltipPlacement;
}

function CommonIcon(props: PropsType) {
    const { HoverIcon, NormalIcon, style, title, placement = 'top' } = props;
    const [isSelect, setIsSelect] = useState(false);
    useEffect(() => {
        setIsSelect(false);
    }, [HoverIcon, NormalIcon]);
    return !HoverIcon ? (
        <Tooltip title={title} placement={placement}>
            <Icon component={NormalIcon} style={style}></Icon>
        </Tooltip>
    ) : title ? (
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
