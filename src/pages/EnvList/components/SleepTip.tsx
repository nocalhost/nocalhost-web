import React from 'react';

import { useTranslation } from 'react-i18next';

import { Button } from 'antd';

import styled from 'styled-components';
import { ReactComponent as IconTip } from '../../../images/icon/icon_label_tips.svg';

import Icon from '@ant-design/icons';

const TipBox = styled.div`
    width: 306px;
    padding: 16px;

    .content {
        display: flex;

        svg {
            g {
                path:nth-child(1) {
                    fill: #faad14;
                }
            }
        }

        .desc {
            flex: 1;
        }
    }

    .btn-box {
        margin-top: 16px;
        display: flex;
        justify-content: flex-end;
    }
`;

const SleepTip = () => {
    const { t } = useTranslation();
    return (
        <TipBox>
            <div className="content">
                <Icon component={IconTip} style={{ fontSize: 20, marginRight: 8, marginTop: 2 }} />
                <div className="desc">{t('resources.cost.wakeUpTip', { time: 55 })}</div>
            </div>
            <div className="btn-box">
                <Button style={{ marginRight: 6 }}>{t('common.bt.cancel')}</Button>
                <Button type="primary">{t('common.bt.confirm')}</Button>
            </div>
        </TipBox>
    );
};

export default SleepTip;
