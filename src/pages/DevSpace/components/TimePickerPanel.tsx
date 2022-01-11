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
        position: relative;

        &::before,
        &::after {
            display: block;
            content: '';
            width: 100%;
            height: 1px;
            position: absolute;
            background: rgb(243, 246, 250);
            top: 108px;
        }

        &::after {
            top: 144px;
        }

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
        padding-right: 12px;
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
            color: #36435c;
            // box-shadow: inset 0 1px 0 0 rgb(243, 246, 250), inset 0 -1px 0 0 rgb(243, 246, 250);
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
    handleSelect: (sleep: IOption[], wake: IOption[], index?: number) => void;
    index?: number;
    defaultValue?: { start: IOption[]; end: IOption[] };
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
    const timeRef = useRef<any>();

    const { t } = useTranslation();

    const handleSelectItem = (index: number) => {
        const len = data.length;
        const selectIndex = len + (index % len);
        setCurrentIndex(selectIndex);
        ulRef.current.scrollTop = (selectIndex - 3) * 36;
        handleSelect(index % len, type);
    };

    const handleScroll = (e: any) => {
        const len = data.length;
        const scrollTop = e.target.scrollTop;
        const itemHeight = 36;
        if (scrollTop === 0) {
            ulRef.current.scrollTop = len * itemHeight;
        } else if (scrollTop >= itemHeight * len * 2) {
            ulRef.current.scrollTop = len * itemHeight;
        } else {
            //
        }
    };

    useEffect(() => {
        return () => {
            clearTimeout(timeRef.current);
        };
    });

    useEffect(() => {
        const len = data.length;
        ulRef.current.scrollTop = (defaultIndex + len - 3) * 36;
        setCurrentIndex(defaultIndex + len);
    }, [defaultIndex]);

    return (
        <SelectWrap>
            <ul ref={ulRef} onScroll={handleScroll}>
                {[...data, ...data, ...data].map((item, index) => {
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

const TimePickerPanel = ({ handleHide, handleSelect, index, defaultValue }: IProp) => {
    const { t } = useTranslation();

    const WEEK_ARR = [
        {
            label: t('resources.cost.Sun'),
            value: 0,
        },
        {
            label: t('resources.cost.Mon'),
            value: 1,
        },
        {
            label: t('resources.cost.Tues'),
            value: 2,
        },
        {
            label: t('resources.cost.Wed'),
            value: 3,
        },
        {
            label: t('resources.cost.Thur'),
            value: 4,
        },
        {
            label: t('resources.cost.Fri'),
            value: 5,
        },
        {
            label: t('resources.cost.Sat'),
            value: 6,
        },
    ];

    const defaultStartDay = Number(defaultValue?.start?.[0]?.value ?? 1);
    const defaultStartTime = defaultValue?.start?.[1]?.value ?? '20:00';
    const defaultStartHour = Number(String(defaultStartTime).split(':')[0]);
    const defaultStartMin = Number(String(defaultStartTime).split(':')[1]);

    const defaultEndTime = defaultValue?.end?.[1]?.value ?? '08:00';
    const defaultEndHour = Number(String(defaultEndTime).split(':')[0]);
    const defaultEndMin = Number(String(defaultEndTime).split(':')[1]);
    const [defaultEndDay, setDefaultEndDay] = useState<number>(
        Number(defaultValue?.end?.[0]?.value ?? 2)
    );

    const [sleepTime, setSleepTime] = useState<IOption[]>([
        {
            label: WEEK_ARR[defaultStartDay].label,
            value: WEEK_ARR[defaultStartDay].value,
        },
        {
            label: HOUR_ARR[defaultStartHour].label,
            value: HOUR_ARR[defaultStartHour].value,
        },
        {
            label: MIN_ARR[defaultStartMin].label,
            value: MIN_ARR[defaultStartMin].value,
        },
    ]);
    const [wakeTime, setWakeTime] = useState<IOption[]>([
        {
            label: WEEK_ARR[defaultEndDay].label,
            value: WEEK_ARR[defaultEndDay].value,
        },
        {
            label: HOUR_ARR[defaultEndHour].label,
            value: HOUR_ARR[defaultEndHour].value,
        },
        {
            label: MIN_ARR[defaultEndMin].label,
            value: MIN_ARR[defaultEndMin].value,
        },
    ]);

    const handleConfirm = () => {
        handleHide && handleHide();
        handleSelect(sleepTime, wakeTime, index);
    };

    const handleCancel = () => {
        handleHide && handleHide();
    };

    const onSelectSleep = (index: number, type: string) => {
        const current = sleepTime.slice(0);
        const currWakeTime = wakeTime.slice();
        switch (type) {
            case 'week': {
                current.splice(0, 1, WEEK_ARR[index]);
                const nextDay = index < 6 ? index + 1 : 0;
                currWakeTime.splice(0, 1, WEEK_ARR[nextDay]);
                setWakeTime(currWakeTime);
                setDefaultEndDay(nextDay);
                break;
            }
            case 'hour':
                current.splice(1, 1, HOUR_ARR[index]);
                break;
            case 'min':
                current.splice(2, 1, MIN_ARR[index]);
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
                current.splice(2, 1, MIN_ARR[index]);
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
                    <SelectPanel
                        data={WEEK_ARR}
                        type="week"
                        handleSelect={onSelectSleep}
                        defaultIndex={+defaultStartDay}
                    />
                    <SelectPanel
                        data={HOUR_ARR}
                        type="hour"
                        defaultIndex={defaultStartHour}
                        handleSelect={onSelectSleep}
                    />
                    <SelectPanel
                        data={MIN_ARR}
                        type="min"
                        defaultIndex={defaultStartMin}
                        handleSelect={onSelectSleep}
                    />
                </div>
                <div className="right">
                    <SelectPanel
                        data={WEEK_ARR}
                        type="week"
                        defaultIndex={defaultEndDay}
                        handleSelect={onSelectWakeup}
                    />
                    <SelectPanel
                        data={HOUR_ARR}
                        type="hour"
                        defaultIndex={defaultEndHour}
                        handleSelect={onSelectWakeup}
                    />
                    <SelectPanel
                        data={MIN_ARR}
                        type="min"
                        defaultIndex={defaultEndMin}
                        handleSelect={onSelectWakeup}
                    />
                </div>
            </div>
            <div className="btn-box">
                <Button onClick={handleCancel} style={{ marginRight: 12, borderRadius: 4 }}>
                    {t('common.bt.cancel')}
                </Button>
                <Button onClick={handleConfirm} type="primary" style={{ borderRadius: 4 }}>
                    {t('common.bt.confirm')}
                </Button>
            </div>
        </TimePanel>
    );
};

export default TimePickerPanel;
