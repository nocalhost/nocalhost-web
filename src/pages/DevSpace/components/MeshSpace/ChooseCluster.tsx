import React from 'react';

import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

import Icon from '@ant-design/icons';
import { ReactComponent as IconCluster } from '../../../../images/icon/icon_cluster.svg';

const Cluster = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(-180deg, rgb(235, 250, 255) 0%, rgb(255, 255, 255) 100%);

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;

        .icon-wrap {
            width: 100px;
            height: 100px;
            margin-bottom: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgb(255, 255, 255);
            border-radius: 8px;
            box-shadow: inset -1px -1px 0 0 rgba(0, 27, 187, 0.1),
                inset 1px 1px 0 0 rgba(237, 88, 237, 0.05), 0 10px 30px 0 rgba(9, 15, 70, 0.14);
        }

        span {
            color: rgb(54, 67, 92);
            font-family: PingFangSC-Semibold;
            font-size: 18px;
        }
    }
`;

const ChooseCluster = () => {
    const { t } = useTranslation();
    return (
        <Cluster>
            <div className="content">
                <div className="icon-wrap">
                    <Icon component={IconCluster} style={{ fontSize: 70 }} />
                </div>
                <span>{t('resources.meshSpace.selectCluster')}</span>
            </div>
        </Cluster>
    );
};

export default ChooseCluster;
