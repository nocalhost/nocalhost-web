import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, message } from 'antd';
import styled from 'styled-components';
import { ReactComponent as IconTip } from '../../../images/icon/icon_label_tips.svg';

import Icon from '@ant-design/icons';
import moment from 'moment';

import HTTP from '../../../api/fetch';
import { ISpaceData } from '../../../types';

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

const SleepTip = ({
    record,
    handleSleepTipVisible,
}: {
    record: ISpaceData;
    handleSleepTipVisible: (id: number, visible: boolean, refresh?: boolean) => void;
}) => {
    const { t } = useTranslation();

    const handleClose = () => {
        handleSleepTipVisible(record.id, false);
    };

    const handleConfirm = () => {
        const { id } = record;
        if (record.sleep_status === 'asleep') {
            wakeUpFn(id);
        } else {
            forceSleep(id);
        }
        handleSleepTipVisible(record?.id, false, true);
    };

    const formatTime = (time: string | Date) => {
        // @ts-ignore
        const y = new moment(time);
        const min = moment().diff(y, 'minutes');
        return `${min}min`;
    };

    // sleep
    const forceSleep = async (id: number) => {
        const res = await HTTP.post(`dev_space/${id}/sleep`, {}, { is_v2: true });
        if (res.code === 0) {
            message.success(t('common.message.operate'));
        }
    };

    // wake up
    const wakeUpFn = async (id: number) => {
        const res = await HTTP.post(`dev_space/${id}/wakeup`, {}, { is_v2: true });
        if (res.code === 0) {
            message.success(t('common.message.operate'));
        }
    };

    return (
        <TipBox>
            <div className="content">
                <Icon component={IconTip} style={{ fontSize: 20, marginRight: 8, marginTop: 2 }} />
                <div className="desc">
                    {record.sleep_status === 'asleep'
                        ? t('resources.cost.wakeUpTip', {
                              time: formatTime(record.sleep_at),
                          })
                        : t('resources.cost.sleepTip')}
                </div>
            </div>
            <div className="btn-box">
                <Button onClick={handleClose} style={{ marginRight: 6 }}>
                    {t('common.bt.cancel')}
                </Button>
                <Button onClick={handleConfirm} type="primary">
                    {t('common.bt.confirm')}
                </Button>
            </div>
        </TipBox>
    );
};

export default SleepTip;
