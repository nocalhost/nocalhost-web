/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import CommonIcon from '../../components/CommonIcon';

import { ReactComponent as VClusterIcon } from '../../images/icon/icon_vcluster.svg';

const C = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 6px;
    padding: 0 4px;
    height: 20px;
    line-height: 20px;
    min-width: 48px;
    background: rgb(233, 237, 241);
    border-radius: 10px;
    font-size: 12px;

    &:hover {
        box-shadow: 0px 0px 1px 0px rgba(54, 67, 92, 0.04), 0px 2px 4px 0px rgba(54, 67, 92, 0.2);
    }
    svg {
        width: 20px;
        height: 20px;
        path {
            fill: #b6c2cc;
        }
        circle {
            display: none;
        }
    }
`;
interface BlockProps {
    count: number;
}
const Block: React.FunctionComponent<BlockProps> = (props) => {
    return (
        <C>
            <VClusterIcon />
            <span>· {props.count}</span>
        </C>
    );
};

export function VClusterAggregate(props: BlockProps) {
    const { t } = useTranslation();

    return (
        <CommonIcon
            NormalIcon={Block.bind(null, props)}
            title={`${t('resources.dashboard.vClusterName')} · ${props.count}`}
            style={{ fontSize: 16, marginLeft: 6 }}
        />
    );
}
