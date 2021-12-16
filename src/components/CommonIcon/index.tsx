import React, { ReactNode, useState } from 'react';
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
    opacity?: number;
}

interface PropsType {
    HoverIcon?: React.ComponentType;
    NormalIcon: React.ComponentType;
    style?: StyleType;
    title?: string | ReactNode;
    placement?: TooltipPlacement;
    className?: string;
}

function CommonIcon(props: PropsType) {
    const { HoverIcon, NormalIcon, style, title, placement = 'top', className } = props;
    const [isSelect, setIsSelect] = useState(false);
    useEffect(() => {
        setIsSelect(false);
    }, [HoverIcon, NormalIcon]);
    return !HoverIcon ? (
        <Tooltip title={title} placement={placement}>
            <Icon component={NormalIcon} style={style} className={className}></Icon>
        </Tooltip>
    ) : title ? (
        <Tooltip title={title} placement={placement}>
            <IconBox onMouseEnter={() => setIsSelect(true)} onMouseLeave={() => setIsSelect(false)}>
                <Icon
                    component={isSelect ? HoverIcon : NormalIcon}
                    style={style}
                    className={className}
                ></Icon>
            </IconBox>
        </Tooltip>
    ) : (
        <IconBox onMouseEnter={() => setIsSelect(true)} onMouseLeave={() => setIsSelect(false)}>
            <Icon
                component={isSelect ? HoverIcon : NormalIcon}
                style={style}
                className={className}
            ></Icon>
        </IconBox>
    );
}
export default CommonIcon;
