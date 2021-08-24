import React, { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';
import { Tooltip } from 'antd';

import { useTranslation } from 'react-i18next';

import Icon from '@ant-design/icons';
import { ReactComponent as IconCluster } from '../../../../images/icon/icon_cluster.svg';
import { ReactComponent as IconSpace } from '../../../../images/icon/icon_normal_devspace.svg';
import { ReactComponent as IconWorkLoad } from '../../../../images/icon/image_normal_applicationService.svg';
import { ReactComponent as IconBlueWorkLoad } from '../../../../images/icon/image_active_blue_applicationService.svg';
import { ReactComponent as ImageEmpty } from '../../../../images/icon/image_empty_space.svg';
import { ReactComponent as ImageComputerUp } from '../../../../images/mesh-icon/image_computerUp.svg';
import { ReactComponent as ImageComputerDown } from '../../../../images/mesh-icon/image_computerDown.svg';
import { ReactComponent as IconExplain } from '../../../../images/icon/icon_label_explain.svg';
import { ReactComponent as IconDeployment } from '../../../../images/icon//icon_deployments.svg';
import { ReactComponent as IconDaemonset } from '../../../../images/icon/icon_daemonset.svg';
import { ReactComponent as IconJob } from '../../../../images/icon/icon_jobs.svg';
import { ReactComponent as IconCronjob } from '../../../../images/icon/icon_cronjob.svg';
import { ReactComponent as IconStatefulSet } from '../../../../images/icon/icon_statefulsets.svg';
import { ReactComponent as WayLine } from '../../../../images/mesh-icon/way1.svg';
import { ReactComponent as BlueArrow } from '../../../../images/mesh-icon/arrow_blue.svg';
import { ReactComponent as IconTracingHeader } from '../../../../images/icon/icon_normal_tracingHeaders.svg';
import WayLeftDown from '../../../../images/mesh-icon/way_leftDown.svg';
import WayLeftUp from '../../../../images/mesh-icon/way_leftUp.svg';
import WayRightDown from '../../../../images/mesh-icon/way_rightDown.svg';
import WayRightUp from '../../../../images/mesh-icon/way_rightUp.svg';
import wayOrLine from '../../../../images/mesh-icon/way4.svg';
import CommonIcon from '../../../../components/CommonIcon';

const ICON_MAP: {
    [index: string]: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {
            title?: string | undefined;
        }
    >;
} = {
    Deployment: IconDeployment,
    DaemontSet: IconDaemonset,
    Job: IconJob,
    CronJob: IconCronjob,
    StatefulSet: IconStatefulSet,
};

// eslint-disable-next-line no-undef
const SpaceIcon = styled.div<{ end: boolean }>`
    g {
        stroke: ${(props) => (props.end ? '#0080ff' : 'rgb(121, 135, 156);')};
    }
`;

// eslint-disable-next-line no-undef
const WayLeft = styled.div<{ wayLeftWidth: number }>`
    width: ${(props) => props.wayLeftWidth}px;
    transform: translateX(-${(props) => props.wayLeftWidth}px);
    /* height: 40px; */
    position: absolute;
    height: 40px;
    bottom: -40px;
    left: 50%;
    display: flex;
    .wayLeftDown {
        background-image: url(${WayLeftDown});
        width: 25px;
        height: 40px;
    }
    .wayOrLine {
        background-image: url(${wayOrLine});
        width: ${(props) => props.wayLeftWidth - 50}px;
        position: relative;
        top: 15px;
        height: 10px;
    }
    .wayLeftUp {
        background-image: url(${WayLeftUp});
        width: 25px;
        height: 40px;
    }
`;
// eslint-disable-next-line no-undef
const WayRight = styled.div<{ wayRightWidth: number }>`
    width: ${(props) => props.wayRightWidth}px;
    transform: translateX(${(props) => props.wayRightWidth}px);
    /* height: 40px; */
    position: absolute;
    height: 40px;
    bottom: -40px;
    right: 50%;
    display: flex;
    .wayRightDown {
        background-image: url(${WayRightDown});
        width: 25px;
        height: 40px;
    }
    .wayOrLine {
        background-image: url(${wayOrLine});
        width: ${(props) => props.wayRightWidth - 50}px;
        position: relative;
        top: 15px;
        height: 10px;
    }
    .wayRightUp {
        background-image: url(${WayRightUp});
        width: 25px;
        height: 40px;
    }
`;

// eslint-disable-next-line no-undef
const ContentWrap = styled.div<{ hiddenIcon: boolean }>`
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
        height: 102px;
        display: flex;
        /* justify-content: center; */
        flex-direction: column;
        position: relative;
        align-items: center;
        .computerUp {
            position: relative;
            z-index: 0;
        }
        .computerDown {
            position: relative;
            z-index: 2;
        }
        &::after {
            opacity: ${(props) => (props.hiddenIcon ? 0 : 1)};
            content: '';
            background: linear-gradient(
                -90deg,
                rgba(22, 118, 238, 0) 0%,
                rgb(22, 118, 238) 50%,
                rgba(22, 118, 238, 0) 100%
            );
            width: 50px;
            height: 1px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 11px;
            z-index: 2;
            animation: width-an 2s 0s 1 linear;
            animation-iteration-count: infinite;
        }
        .wayLine {
            position: absolute;
            bottom: -80px;
            left: 50%;
            transform: translateX(-50%);
        }
        .blueArrow {
            position: absolute;
            z-index: 1;
            top: 18px;
            animation: run-to-bottom 3s 0.1s 1 linear, run-to-top 3s 4.1s 1 linear;
            animation-fill-mode: forwards;
        }
    }

    @keyframes width-an {
        0% {
            width: 50px;
        }
        50% {
            width: 104px;
        }
        100% {
            width: 50px;
        }
    }
    @keyframes run-to-bottom {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(160px);
        }
    }

    @keyframes run-to-top {
        0% {
            transform: translateY(160px) rotate(180deg);
        }
        100% {
            transform: translateY(0) rotate(180deg);
        }
    }

    .content {
        background: #eff4f9;
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 16px 24px;

        .icon-wrap {
            display: flex;
            align-items: center;

            span {
                margin-left: 10px;
                color: rgb(54, 67, 92);
                font-family: PingFangSC-Semibold;
                font-size: 16px;
                font-weight: 600;
            }
        }

        .tracing-header {
            position: relative;
            margin-top: 16px;
            height: 82px;
            padding: 16px;
            background: rgb(239, 244, 249);
            border-radius: 4px;
            box-shadow: inset -1px -1px 0 0 rgba(40, 47, 55, 0.05),
                inset 1px 1px 0 0 rgba(255, 255, 255, 0.75),
                -10px -10px 12px 0 rgba(255, 255, 255, 0.6), 12px 12px 12px 0 rgba(40, 47, 55, 0.05);

            .content {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #ffffff;

                .desc {
                    background: rgb(239, 244, 249);
                    border-radius: 4px;
                    height: 30px;
                    padding: 0 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: rgb(121, 135, 156);
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    font-weight: normal;
                }
            }
        }

        .main {
            position: relative;
            z-index: 2;
            margin-top: 16px;
            padding: 16px;
            flex: 1;
            display: flex;
            background: rgb(239, 244, 249);
            border-radius: 4px;
            box-shadow: inset -1px -1px 0 0 rgba(40, 47, 55, 0.05),
                inset 1px 1px 0 0 rgba(255, 255, 255, 0.75),
                -10px -10px 12px 0 rgba(255, 255, 255, 0.6), 12px 12px 12px 0 rgba(40, 47, 55, 0.05);

            .title {
                display: flex;
                align-items: center;

                span {
                    margin-left: 8px;
                    color: rgb(54, 67, 92);
                    font-family: PingFangSC-Semibold;
                    font-size: 14px;
                    font-weight: 600;
                }
            }
            .workload-container,
            .selected-workload-container {
                flex: 2;
                display: flex;
                flex-direction: column;
                .service-box {
                    border-radius: 4px;
                    position: relative;
                    .wayOrLine {
                        position: absolute;
                        right: -40px;
                        width: 39px;
                        height: 10px;
                        background-image: url(${wayOrLine});
                        top: 50%;
                        transform: translateY(-10px);
                    }
                }
                .service-box,
                .selected-box {
                    padding: 12px 20px;
                    margin-top: 16px;
                    background: #ffffff;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    align-content: flex-start;

                    .workload-item {
                        margin-bottom: 12px;
                        height: 60px;

                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }

                    .workload-info {
                        width: 110px;
                        margin-top: 4px;
                        padding: 0 8px;
                        background: rgb(221, 230, 239);
                        border-radius: 12px;
                        height: 22px;
                        display: flex;
                        align-items: center;
                        cursor: pointer;

                        .name {
                            flex: 1;
                            margin-left: 6px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            word-break: keep-all;
                        }
                    }
                }

                .service-box,
                .selected-box {
                    flex: 2;

                    .empty-box {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        span {
                            margin-top: 8px;
                            display: inline-block;
                            width: 118px;
                            color: rgb(121, 135, 156);
                            font-family: PingFangSC-Regular;
                            font-size: 12px;
                            font-weight: normal;
                            text-align: center;
                        }
                    }
                }

                .selected-box {
                    flex: 1;
                }
            }

            .selected-workload-container {
                flex: 1;
                margin-left: 40px;
            }
        }
    }
`;

interface IProps {
    clusterName: string;
    currentSpace: any;
    appList: any;
    selectedAppList: any;
    currentStep: number;
    headerInfo: HeaderInfo | undefined;
}

interface HeaderInfo {
    key: string;
    value: string;
}

const BaseSpace = ({
    clusterName,
    currentSpace,
    appList,
    selectedAppList,
    currentStep,
    headerInfo,
}: IProps) => {
    const { t } = useTranslation();
    const firstBlueArrow = useRef<SVGSVGElement>(null);
    const timer = useRef<number | null>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const workLoadRef = useRef<HTMLDivElement>(null);
    const selectBoxRef = useRef<HTMLDivElement>(null);
    // const secondBlueArrow = useRef<SVGSVGElement>(null);
    const [showBlueArrayIndex, setShowBlueArrayIndex] = useState(0);
    const [animationEnd, setAnimationEnd] = useState(false);
    const [wayLeftWidth, setWayLeftWidth] = useState(0);
    const [wayRightWidth, setWayRightWidth] = useState(0);

    useEffect(() => {
        if (currentSpace && appList.length > 0) {
            setShowBlueArrayIndex(1);
        } else {
            setShowBlueArrayIndex(2);
        }
    }, [currentSpace, clusterName, appList]);
    const firstAnimationHandle = () => {
        firstBlueArrow?.current?.addEventListener('webkitAnimationEnd', function (...args: any) {
            if (args[0]?.animationName === 'run-to-bottom') {
                setAnimationEnd(true);
            }
            if (args[0]?.animationName === 'run-to-top') {
                timer.current && clearTimeout(timer.current);
                timer.current = null;
                setShowBlueArrayIndex(2);
                timer.current = window.setTimeout(() => {
                    setShowBlueArrayIndex(1);
                }, 500);
            }
        });
        firstBlueArrow?.current?.addEventListener('webkitAnimationStart', function (...args: any) {
            if (args[0]?.animationName === 'run-to-top') {
                setAnimationEnd(false);
            }
        });
    };
    useEffect(() => {
        firstAnimationHandle();
    }, [showBlueArrayIndex]);
    useEffect(() => {
        if (currentStep === 1) {
            setAnimationEnd(false);
            const headWidth = headRef?.current?.offsetWidth || 0;
            const workLoadWidth = workLoadRef?.current?.offsetWidth || 0;
            const selectBoxWidth = selectBoxRef?.current?.offsetWidth || 0;
            const width: number = Math.ceil(headWidth / 2 - workLoadWidth / 2);
            const rightWidth: number = Math.ceil(headWidth / 2 - selectBoxWidth / 2);
            setWayLeftWidth(width);
            setWayRightWidth(rightWidth);
        } else {
            firstAnimationHandle();
        }
    }, [currentStep]);
    return (
        <ContentWrap hiddenIcon={currentSpace && appList.length > 0}>
            <div className="header">
                {showBlueArrayIndex === 1 && currentStep == 0 && (
                    <BlueArrow className="blueArrow" ref={firstBlueArrow}></BlueArrow>
                )}
                <ImageComputerUp className="computerUp" />
                <ImageComputerDown className="computerDown" />
                <div className="wayLine">
                    <WayLine></WayLine>
                </div>
            </div>
            <div className="content">
                <div className="icon-wrap">
                    <Icon component={IconCluster} style={{ fontSize: 40 }} />
                    <span>{clusterName}</span>
                </div>
                {currentStep === 1 && (
                    <div className="tracing-header" ref={headRef}>
                        <WayLeft wayLeftWidth={wayLeftWidth}>
                            <div className="wayLeftDown"></div>
                            <div className="wayOrLine"></div>
                            <div className="wayLeftUp"></div>
                        </WayLeft>
                        <WayRight wayRightWidth={wayRightWidth}>
                            <div className="wayRightUp"></div>
                            <div className="wayOrLine"></div>
                            <div className="wayRightDown"></div>
                        </WayRight>
                        <div className="content">
                            <div className="desc">
                                {headerInfo ? (
                                    <Icon
                                        component={IconTracingHeader}
                                        style={{ fontSize: 16, marginRight: 4 }}
                                    />
                                ) : (
                                    <CommonIcon
                                        NormalIcon={IconExplain}
                                        style={{ fontSize: 16, marginRight: 6 }}
                                        title="xxxxxxx"
                                    ></CommonIcon>
                                )}

                                {headerInfo
                                    ? `cluster:${headerInfo?.key}=${headerInfo?.value}`
                                    : t('resources.meshSpace.setTracingHeader')}
                            </div>
                        </div>
                    </div>
                )}
                <div className="main" style={currentStep === 1 ? { marginTop: '40px' } : {}}>
                    <div className="workload-container" ref={workLoadRef}>
                        <div className="title">
                            <Icon component={IconSpace} style={{ fontSize: 32 }} />
                            <span>
                                {currentSpace
                                    ? currentSpace.space_name
                                    : t('resources.meshSpace.basicSpace')}
                            </span>
                        </div>
                        <div
                            className="service-box"
                            style={
                                !animationEnd
                                    ? { border: '1px solid transparent' }
                                    : {
                                          border: '1px solid rgba(0, 128, 255, 0.5)',
                                          boxShadow: '0px 0px 10px 0px rgba(0, 128, 255, 0.2)',
                                      }
                            }
                        >
                            <div className="wayOrLine"></div>
                            {!currentSpace && (
                                <div className="empty-box">
                                    <ImageEmpty />
                                    <span>{t('resources.meshSpace.selectBasicService')}</span>
                                </div>
                            )}
                            {appList.map((item: any, key: number) => {
                                return (
                                    <div key={key} className="workload-item">
                                        <div>
                                            {animationEnd ? (
                                                <Icon
                                                    component={IconBlueWorkLoad}
                                                    style={{ fontSize: 32 }}
                                                ></Icon>
                                            ) : (
                                                <Icon
                                                    component={IconWorkLoad}
                                                    style={{ fontSize: 32 }}
                                                />
                                            )}
                                        </div>
                                        <div
                                            className="workload-info"
                                            style={
                                                animationEnd
                                                    ? { background: 'rgb(199, 227, 255)' }
                                                    : {}
                                            }
                                        >
                                            <SpaceIcon end={animationEnd}>
                                                <Icon
                                                    component={
                                                        ICON_MAP[item.kind] || IconDeployment
                                                    }
                                                />
                                            </SpaceIcon>
                                            <Tooltip title={`${item.appName}:${item.name}`}>
                                                <div
                                                    className="name"
                                                    style={
                                                        animationEnd
                                                            ? { color: 'rgb(0, 128, 255)' }
                                                            : { color: 'rgb(121, 135, 156)' }
                                                    }
                                                >{`${item.appName}:${item.name}`}</div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {currentStep === 1 && (
                        <div className="selected-workload-container">
                            <div className="title">
                                <Icon component={IconSpace} style={{ fontSize: 32 }} />
                                <span>
                                    {currentSpace
                                        ? currentSpace.space_name
                                        : t('resources.meshSpace.basicSpace')}
                                </span>
                            </div>

                            <div className="selected-box" ref={selectBoxRef}>
                                {selectedAppList.length === 0 && (
                                    <div className="empty-box">
                                        <ImageEmpty />
                                        <span>{t('resources.meshSpace.selectBasicService')}</span>
                                    </div>
                                )}
                                {selectedAppList.map((item: any, key: number) => {
                                    return (
                                        <div key={key} className="workload-item">
                                            <div>
                                                <Icon
                                                    component={IconWorkLoad}
                                                    style={{ fontSize: 32 }}
                                                />
                                            </div>
                                            <div className="workload-info">
                                                <Icon
                                                    component={
                                                        ICON_MAP[item.kind] || IconDeployment
                                                    }
                                                />
                                                <Tooltip title={item.name}>
                                                    <div className="name">{item.name}</div>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </ContentWrap>
    );
};

export default BaseSpace;