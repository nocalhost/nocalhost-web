import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import { ReactComponent as IconSleep } from '../../../images/icon/icon_title_sleep.svg';
import { ReactComponent as IconWakeup } from '../../../images/icon/icon_title_wakeup.svg';

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
            color: #36435c;
            box-shadow: inset 0 1px 0 0 rgb(243, 246, 250), inset 0 -1px 0 0 rgb(243, 246, 250);
        }

        &:hover {
            background: #f3f6fa;
        }
    }
`;

interface IProp {
    handleHide: () => void;
}

const WEEK_ARR = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const generateArr = (num: number): string[] => {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(i < 10 ? `0${i}` : `${i}`);
    }
    return arr;
};

const HOUR_ARR = generateArr(24);
const MIN_ARR = generateArr(60);

const SelectPanel = ({ data }: { data: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const ulRef = useRef<any>();

    const handleSelectItem = (index: number) => {
        setCurrentIndex(index);
        ulRef.current.scrollTop = index * 36;
    };

    return (
        <SelectWrap>
            <ul ref={ulRef}>
                {data.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className={index === currentIndex ? 'selected' : ''}
                            onClick={() => handleSelectItem(index)}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </SelectWrap>
    );
};

const TimePickerPanel = ({ handleHide }: IProp) => {
    const { t } = useTranslation();

    const handleConfirm = () => {
        handleHide && handleHide();
    };

    const handleCancel = () => {
        handleHide && handleHide();
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
                    <SelectPanel data={WEEK_ARR} />
                    <SelectPanel data={HOUR_ARR} />
                    <SelectPanel data={MIN_ARR} />
                </div>
                <div className="right">
                    <SelectPanel data={WEEK_ARR} />
                    <SelectPanel data={HOUR_ARR} />
                    <SelectPanel data={MIN_ARR} />
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
