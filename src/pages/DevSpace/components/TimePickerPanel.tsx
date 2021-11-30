import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import { ReactComponent as IconSleep } from '../../../images/icon/icon_title_sleep.svg';
import { ReactComponent as IconWakeup } from '../../../images/icon/icon_title_wakeup.svg';
import classNames from 'classnames';

import { IOption } from '../../../types/index';

const TimePanel = styled.div`
    width: 420px;
    height: 352px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 3px 12px 0 rgba(40, 47, 55, 0.1), 0 0.5px 1.5px 0 rgba(40, 47, 55, 0.05);

    .title {
        height: 50px;
        padding: 0 65px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #36435c;
        border-bottom: 1px solid #f3f6fa;

        .sleep,
        .wake-up {
            display: flex;
            align-items: center;
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            font-weight: 600;
        }
    }

    .content {
        flex: 1;
        display: flex;

        .left,
        .right {
            flex-basis: 50%;
            display: flex;
        }

        .left {
            border-right: 1px solid #f3f6fa;
        }
    }

    .btn-box {
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: #f3f6fa;
    }
`;
const SelectWrap = styled.div`
    width: 70px;
    height: 252px;
    display: flex;
    overflow-y: hidden;

    ul {
        overflow-y: auto;
        flex: 1;

        &::after {
            display: block;
            content: '';
            height: 216px;
        }

        &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }
    }

    li {
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        color: #a0a9b6;
        cursor: pointer;

        &.selected {
            padding-left: 26px;
            color: #36435c;
            box-shadow: inset 0 1px 0 0 rgb(243, 246, 250), inset 0 -1px 0 0 rgb(243, 246, 250);
        }

        &.week {
            padding-left: 0;
        }

        &:hover {
            background: #f3f6fa;
        }
    }
`;

interface IProp {
    handleHide: () => void;
    handleSelect: (sleep: IOption[], wake: IOption[]) => void;
}

const generateArr = (num: number): IOption[] => {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(
            i < 10
                ? {
                      label: `0${i}`,
                      value: `0${i}`,
                  }
                : {
                      label: `${i}`,
                      value: `${i}`,
                  }
        );
    }
    return arr;
};

const HOUR_ARR = generateArr(24);
const MIN_ARR = generateArr(60);

const SelectPanel = ({
    data,
    handleSelect,
    type,
    defaultIndex = 0,
}: {
    data: IOption[];
    handleSelect: (index: number, type: string) => void;
    type: string;
    defaultIndex?: number;
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(defaultIndex);
    const ulRef = useRef<any>();

    const { t } = useTranslation();

    const handleSelectItem = (index: number) => {
        setCurrentIndex(index);
        ulRef.current.scrollTop = index * 36;
        handleSelect(index, type);
    };

    useEffect(() => {
        ulRef.current.scrollTop = defaultIndex * 36;
    }, []);

    return (
        <SelectWrap>
            <ul ref={ulRef}>
                {data.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={classNames({
                                selected: index === currentIndex,
                                week: type === 'week',
                            })}
                            onClick={() => handleSelectItem(index)}
                        >
                            {`${item.label}${
                                index !== currentIndex
                                    ? ''
                                    : type === 'hour'
                                    ? t('resources.cost.hour')
                                    : type === 'min'
                                    ? t('resources.cost.min')
                                    : ''
                            }`}
                        </li>
                    );
                })}
            </ul>
        </SelectWrap>
    );
};

const TimePickerPanel = ({ handleHide, handleSelect }: IProp) => {
    const { t } = useTranslation();
    const [sleepTime, setSleepTime] = useState<IOption[]>([
        {
            label: t('resources.cost.mon'),
            value: 1,
        },
        {
            label: '20',
            value: '20',
        },
        {
            label: '00',
            value: '00',
        },
    ]);
    const [wakeTime, setWakeTime] = useState<IOption[]>([
        {
            label: t('resources.cost.tues'),
            value: 2,
        },
        {
            label: '08',
            value: '08',
        },
        {
            label: '00',
            value: '00',
        },
    ]);

    const WEEK_ARR = [
        {
            label: t('resources.cost.mon'),
            value: 1,
        },
        {
            label: t('resources.cost.tues'),
            value: 2,
        },
        {
            label: t('resources.cost.wed'),
            value: 3,
        },
        {
            label: t('resources.cost.thur'),
            value: 4,
        },
        {
            label: t('resources.cost.fri'),
            value: 5,
        },
        {
            label: t('resources.cost.sat'),
            value: 6,
        },
        {
            label: t('resources.cost.sun'),
            value: 0,
        },
    ];

    const handleConfirm = () => {
        handleHide && handleHide();
        handleSelect(sleepTime, wakeTime);
    };

    const handleCancel = () => {
        handleHide && handleHide();
    };

    const onSelectSleep = (index: number, type: string) => {
        const current = sleepTime.slice(0);
        switch (type) {
            case 'week':
                current.splice(0, 1, WEEK_ARR[index]);
                break;
            case 'hour':
                current.splice(1, 1, HOUR_ARR[index]);
                break;
            case 'min':
                current.splice(2, 1, HOUR_ARR[index]);
                break;
        }
        setSleepTime(current);
    };

    const onSelectWakeup = (index: number, type: string) => {
        const current = wakeTime.slice();
        switch (type) {
            case 'week':
                current.splice(0, 1, WEEK_ARR[index]);
                break;
            case 'hour':
                current.splice(1, 1, HOUR_ARR[index]);
                break;
            case 'min':
                current.splice(2, 1, HOUR_ARR[index]);
                break;
        }
        setWakeTime(current);
    };

    return (
        <TimePanel>
            <div className="title">
                <div className="sleep">
                    <Icon component={IconSleep} style={{ fontSize: 20, marginRight: 4 }} />
                    <span>{t('resources.cost.sleepTime')}</span>
                </div>
                <div className="wake-up">
                    <Icon component={IconWakeup} style={{ fontSize: 20, marginRight: 4 }} />
                    <span>{t('resources.cost.wakeTime')}</span>
                </div>
            </div>
            <div className="content">
                <div className="left">
                    <SelectPanel data={WEEK_ARR} type="week" handleSelect={onSelectSleep} />
                    <SelectPanel
                        data={HOUR_ARR}
                        type="hour"
                        defaultIndex={20}
                        handleSelect={onSelectSleep}
                    />
                    <SelectPanel data={MIN_ARR} type="min" handleSelect={onSelectSleep} />
                </div>
                <div className="right">
                    <SelectPanel
                        data={WEEK_ARR}
                        type="week"
                        defaultIndex={1}
                        handleSelect={onSelectWakeup}
                    />
                    <SelectPanel
                        data={HOUR_ARR}
                        type="hour"
                        defaultIndex={8}
                        handleSelect={onSelectWakeup}
                    />
                    <SelectPanel data={MIN_ARR} type="min" handleSelect={onSelectWakeup} />
                </div>
            </div>
            <div className="btn-box">
                <Button onClick={handleCancel} style={{ marginRight: 12 }}>
                    {t('common.bt.cancel')}
                </Button>
                <Button onClick={handleConfirm} type="primary">
                    {t('common.bt.confirm')}
                </Button>
            </div>
        </TimePanel>
    );
};

export default TimePickerPanel;
