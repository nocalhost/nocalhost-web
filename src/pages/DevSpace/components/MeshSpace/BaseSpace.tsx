import React, { useEffect, useState, useRef } from 'react';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import Icon from '@ant-design/icons';
import { ReactComponent as IconCluster } from '../../../../images/icon/icon_cluster.svg';
import { ReactComponent as IconSpace } from '../../../../images/icon/icon_normal_devspace.svg';
import IconWorkLoad from '../../../../images/icon/image_normal_applicationService.svg';
import IconBlueWorkLoad from '../../../../images/icon/image_active_blue_applicationService.svg';
import IconGreenWorkLoad from '../../../../images/icon/image_active_green_applicationService.svg';
import ImageEmpty from '../../../../images/icon/image_empty_space.svg';
import { ReactComponent as ImageComputerUp } from '../../../../images/mesh-icon/image_computerUp.svg';
import { ReactComponent as ImageComputerDown } from '../../../../images/mesh-icon/image_computerDown.svg';
import { ReactComponent as IconExplain } from '../../../../images/icon/icon_label_explain.svg';
import { ReactComponent as IconDeployment } from '../../../../images/icon//icon_deployments.svg';
import { ReactComponent as IconDaemonset } from '../../../../images/icon/icon_daemonset.svg';
import { ReactComponent as IconJob } from '../../../../images/icon/icon_jobs.svg';
import { ReactComponent as IconCronjob } from '../../../../images/icon/icon_cronjob.svg';
import { ReactComponent as IconStatefulSet } from '../../../../images/icon/icon_statefulsets.svg';
import { ReactComponent as WayLine } from '../../../../images/mesh-icon/way1.svg';
import { ReactComponent as BlueArrow } from '../../../../images/mesh-icon/arrow.svg';
import { ReactComponent as IconTracingHeader } from '../../../../images/icon/icon_normal_tracingHeaders.svg';
import { ReactComponent as IconActiveTracingHeader } from '../../../../images/icon/icon_active_tracingHeaders.svg';

import CommonIcon from '../../../../components/CommonIcon';

import { ReactComponent as IconPath } from '../../../../images/mesh-icon/icon_path.svg';
import {
    windowAnimationStartHandle,
    windowAnimationEndHandle,
    removeWindowAnimationEndHandle,
} from './windowAnimationHandle';
import {
    ContentWrap,
    WayLeft,
    WayRight,
    SelectIcon,
    SpaceIcon,
} from './baseSpace-style-components';

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

interface IProps {
    clusterName: string;
    currentSpace: any;
    appList: any;
    selectedAppList: any;
    currentStep: number;
    headerInfo: HeaderInfo | undefined;
    shareSpace: any;
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
    shareSpace,
}: IProps) => {
    const { t } = useTranslation();
    const firstBlueArrow = useRef<SVGSVGElement>(null);
    const timer = useRef<number | null>(null);
    const resetTimer = useRef<number | null>(null);
    const headRef = useRef<HTMLDivElement>(null);
    const workLoadRef = useRef<HTMLDivElement>(null);
    const selectBoxRef = useRef<HTMLDivElement>(null);
    const secondBlueArrow = useRef<SVGSVGElement>(null);
    const threeBlueArrow = useRef<SVGSVGElement>(null);
    const wayOrLineRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const [showBlueArrayIndex, setShowBlueArrayIndex] = useState(0);
    const [animationEnd, setAnimationEnd] = useState(false);
    const [wayLeftWidth, setWayLeftWidth] = useState(0);
    const [wayRightWidth, setWayRightWidth] = useState(0);
    const [selectBoxWidth, setSelectBoxWidth] = useState(0);
    const [selectBoxHeight, setSelectBoxHeight] = useState(0);
    const [workLoadWidth, setWorkLoadWidth] = useState(0);
    const [selectAnimationEnd, setSelectAnimationEnd] = useState(false);
    const [selectAnimationSpaceEnd, setSelectAnimationSpaceEnd] = useState(false);
    const [greenCluster, setGreenCluster] = useState(false);
    useEffect(() => {
        if (currentSpace && appList.length > 0) {
            if (currentStep === 0) {
                setShowBlueArrayIndex(1);
            } else {
                setShowBlueArrayIndex(2);
            }
        } else {
            setShowBlueArrayIndex(0);
        }
    }, [currentSpace, clusterName, appList]);
    const firstAnimationHandle = () => {
        windowAnimationEndHandle(firstBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'run-to-bottom') {
                setAnimationEnd(true);
            }
            if (args[0]?.animationName === 'run-to-top') {
                timer.current && clearTimeout(timer.current);
                timer.current = null;
                setShowBlueArrayIndex(0);
                timer.current = window.setTimeout(() => {
                    setShowBlueArrayIndex(1);
                }, 500);
            }
        });
        windowAnimationStartHandle(firstBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'run-to-top') {
                setAnimationEnd(false);
            }
        });
    };
    const secondAnimationHandle = () => {
        windowAnimationEndHandle(secondBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'blue-cubic-last-left') {
                setAnimationEnd(true);
            }

            if (args[0]?.animationName === 'back-blue-to-bottom') {
                timer.current && clearTimeout(timer.current);
                timer.current = null;
                if (headerInfo) {
                    setShowBlueArrayIndex(3);
                } else {
                    setShowBlueArrayIndex(0);
                    timer.current = window.setTimeout(() => {
                        setShowBlueArrayIndex(2);
                    }, 500);
                }
            }
        });
        windowAnimationStartHandle(secondBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'back-cubic-last-left') {
                setAnimationEnd(false);
            }
        });
    };
    const threeAnimationHandle = () => {
        windowAnimationEndHandle(threeBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'green-cubic-last-right') {
                setSelectAnimationEnd(true);
            }
            if (args[0]?.animationName === 'back-green-last-line-left') {
                setSelectAnimationEnd(true);
            }

            if (args[0]?.animationName === 'green-last-line-left') {
                setSelectAnimationSpaceEnd(true);
            }
            if (args[0]?.animationName === 'blue-to-bottom') {
                setGreenCluster(true);
            }
            // if (args[0]?.animationName === 'back-green-cubic-bottom') {
            //     setGreenCluster(true);
            // }
            if (args[0]?.animationName === 'back-blue-to-bottom') {
                setShowBlueArrayIndex(2);
            }
        });

        windowAnimationStartHandle(threeBlueArrow?.current, function (...args: any) {
            if (args[0]?.animationName === 'back-green-cubic-last-right') {
                setSelectAnimationEnd(false);
            }
            if (args[0]?.animationName === 'green-last-line-left') {
                setSelectAnimationEnd(false);
            }
            if (args[0]?.animationName === 'back-green-last-line-left') {
                setSelectAnimationSpaceEnd(false);
            }
            if (args[0]?.animationName === 'back-blue-to-bottom') {
                setGreenCluster(false);
            }
            if (args[0]?.animationName === 'green-cubic-bottom') {
                setGreenCluster(false);
            }
        });
    };
    const handleDomStyle = () => {
        const headWidth = headRef?.current?.offsetWidth || 0;
        // const headHeight = headRef?.current?.offsetHeight || 0;
        const workLoadWidth = workLoadRef?.current?.offsetWidth || 0;
        const selectBoxWidth = selectBoxRef?.current?.offsetWidth || 0;
        const selectBoxHeight = selectBoxRef?.current?.offsetHeight || 0;
        const width: number = Math.ceil(headWidth / 2 - workLoadWidth / 2);
        const rightWidth: number = Math.ceil(headWidth / 2 - selectBoxWidth / 2);
        // const mainRefTop = mainRef?.current?.offsetTop || 0;
        setWayLeftWidth(width);
        setWayRightWidth(rightWidth);
        setSelectBoxWidth(selectBoxWidth);
        setWorkLoadWidth(workLoadWidth);
        setSelectBoxHeight(selectBoxHeight);
    };
    useEffect(() => {
        if (currentStep === 1) {
            setShowBlueArrayIndex(2);
            setAnimationEnd(false);
            handleDomStyle();
            windowResize();
        } else {
            setShowBlueArrayIndex(1);
        }
    }, [currentStep]);
    const windowResize = () => {
        let flag = false;
        window.addEventListener('resize', function () {
            if (!flag) {
                setShowBlueArrayIndex(0);
                flag = true;
            }
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }
            resetTimer.current = window.setTimeout(() => {
                flag = false;
                handleDomStyle();
                setShowBlueArrayIndex(2);
            }, 300);
        });
    };
    useEffect(() => {
        if (showBlueArrayIndex === 1 && currentStep == 0 && appList.length > 0) {
            firstAnimationHandle();
        }
    }, [currentStep, appList, showBlueArrayIndex]);
    useEffect(() => {
        if (
            currentStep == 1 &&
            wayLeftWidth > 0 &&
            appList.length > 0 &&
            showBlueArrayIndex === 2
        ) {
            secondAnimationHandle();
        }
    }, [currentStep, wayLeftWidth, appList, showBlueArrayIndex]);
    useEffect(() => {
        if (
            currentStep == 1 &&
            wayRightWidth > 0 &&
            appList.length > 0 &&
            showBlueArrayIndex === 3
        ) {
            threeAnimationHandle();
        }
    }, [currentStep, wayRightWidth, appList, showBlueArrayIndex]);
    useEffect(() => {
        if (secondBlueArrow?.current) {
            removeWindowAnimationEndHandle(secondBlueArrow?.current, function (...args: any) {
                if (args[0]?.animationName === 'blue-cubic-last-left') {
                    setAnimationEnd(true);
                }

                if (args[0]?.animationName === 'back-blue-to-bottom') {
                    timer.current && clearTimeout(timer.current);
                    timer.current = null;
                    if (headerInfo) {
                        setShowBlueArrayIndex(3);
                    } else {
                        setShowBlueArrayIndex(0);
                        timer.current = window.setTimeout(() => {
                            setShowBlueArrayIndex(2);
                        }, 500);
                    }
                }
            });
            secondAnimationHandle();
        }
    }, [headerInfo]);
    return (
        <ContentWrap
            hiddenIcon={currentSpace && appList.length > 0}
            wayLeftWidth={wayLeftWidth - 50}
            wayRightWidth={wayRightWidth - 50}
            selectBoxWidth={selectBoxWidth}
            selectBoxHeight={selectBoxHeight}
            workLoadWidth={workLoadWidth}
        >
            <div className="header">
                {showBlueArrayIndex === 1 && currentStep == 0 && appList.length > 0 && (
                    <BlueArrow className="blueArrow" ref={firstBlueArrow}></BlueArrow>
                )}
                {currentStep == 1 &&
                    wayLeftWidth > 0 &&
                    appList.length > 0 &&
                    showBlueArrayIndex === 2 && (
                        <BlueArrow className="secondBlueArrow" ref={secondBlueArrow}></BlueArrow>
                    )}
                {currentStep == 1 && wayRightWidth > 0 && showBlueArrayIndex === 3 && (
                    <BlueArrow className="threeBlueArrow" ref={threeBlueArrow}></BlueArrow>
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
                        <div className="content">
                            <div
                                className="desc"
                                style={
                                    greenCluster && !!headerInfo
                                        ? {
                                              background: 'rgb(186, 237, 212)',
                                              boxShadow: '0px 0px 8px 0px rgba(18, 167, 92, 0.1)',
                                          }
                                        : {}
                                }
                            >
                                {headerInfo ? (
                                    greenCluster ? (
                                        <Icon
                                            component={IconActiveTracingHeader}
                                            style={{ fontSize: 16, marginRight: 4 }}
                                        />
                                    ) : (
                                        <Icon
                                            component={IconTracingHeader}
                                            style={{ fontSize: 16, marginRight: 4 }}
                                        />
                                    )
                                ) : (
                                    <CommonIcon
                                        NormalIcon={IconExplain}
                                        style={{ fontSize: 16, marginRight: 6 }}
                                        title={t('resources.meshSpace.tracingHeaderTip')}
                                    ></CommonIcon>
                                )}
                                <span
                                    style={greenCluster && headerInfo ? { color: '#12a75c' } : {}}
                                >
                                    {headerInfo
                                        ? `cluster:${headerInfo?.key}=${headerInfo?.value}`
                                        : t('resources.meshSpace.setTracingHeader')}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {currentStep === 1 && (
                    <div className="wayLineBoth">
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
                        <div className="wayOrLineD" ref={wayOrLineRef}></div>
                        <div className="mainZheLeft"></div>
                        <div className="mainZheRight"></div>
                        <div className="serviceZhe"></div>
                        <div className="selectedZhe"></div>
                    </div>
                )}
                <div
                    className="main"
                    style={currentStep === 1 ? { marginTop: '0px', zIndex: 0 } : { zIndex: 3 }}
                    ref={mainRef}
                >
                    <div className="wrap">
                        <div className="workload-container" ref={workLoadRef}>
                            <div className="title">
                                <Icon component={IconSpace} style={{ fontSize: 32 }} />
                                <div className="title-info">
                                    <span>
                                        {currentSpace?.space_name ??
                                            t('resources.meshSpace.basicSpace')}
                                    </span>
                                    <span>{currentSpace?.namespace}</span>
                                </div>
                            </div>
                            <div
                                className="service-box"
                                style={
                                    animationEnd
                                        ? {
                                              border: '1px solid rgba(0, 128, 255, 0.5)',
                                              boxShadow: '0px 0px 10px 0px rgba(0, 128, 255, 0.2)',
                                          }
                                        : selectAnimationSpaceEnd && selectedAppList?.length === 0
                                        ? {
                                              border: '1px solid rgb(26, 196, 111)',
                                              boxShadow: '0px 0px 10px 0px rgba(27, 203, 122, 0.2)',
                                          }
                                        : { border: '1px solid #dae1e8' }
                                }
                            >
                                <div className="arrowShadow"></div>
                                {!currentSpace && (
                                    <div className="empty-box">
                                        <img src={ImageEmpty} />
                                        <span>{t('resources.meshSpace.selectBasicService')}</span>
                                    </div>
                                )}
                                {appList.map((item: any, key: number) => {
                                    return (
                                        <div key={key} className="workload-item">
                                            <div className="icon-box">
                                                {animationEnd ? (
                                                    <img
                                                        src={IconBlueWorkLoad}
                                                        style={{ width: 32, height: 34 }}
                                                    ></img>
                                                ) : selectAnimationSpaceEnd &&
                                                  !selectedAppList.find(
                                                      (el: any) =>
                                                          el.name === `${item.appName}:${item.name}`
                                                  ) ? (
                                                    <img
                                                        src={IconGreenWorkLoad}
                                                        style={{ width: 32, height: 34 }}
                                                    />
                                                ) : (
                                                    <img
                                                        src={IconWorkLoad}
                                                        style={{ width: 32, height: 34 }}
                                                    />
                                                )}
                                            </div>
                                            <div
                                                className="workload-info"
                                                style={
                                                    animationEnd
                                                        ? { background: 'rgb(199, 227, 255)' }
                                                        : selectAnimationSpaceEnd &&
                                                          !selectedAppList.find(
                                                              (el: any) =>
                                                                  el.name ===
                                                                  `${item.appName}:${item.name}`
                                                          )
                                                        ? { background: '#baedd4' }
                                                        : {}
                                                }
                                            >
                                                <SpaceIcon
                                                    animationEnd={animationEnd}
                                                    selectEnd={
                                                        selectAnimationSpaceEnd &&
                                                        !selectedAppList.find(
                                                            (el: any) =>
                                                                el.name ===
                                                                `${item.appName}:${item.name}`
                                                        )
                                                    }
                                                >
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
                                                                : selectAnimationSpaceEnd &&
                                                                  !selectedAppList.find(
                                                                      (el: any) => {
                                                                          return (
                                                                              el.name ===
                                                                              `${item.appName}:${item.name}`
                                                                          );
                                                                      }
                                                                  )
                                                                ? { color: '#12a75c' }
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
                                    <div className="title-info">
                                        <span>{shareSpace?.name}</span>
                                        <span>{shareSpace?.namespace}</span>
                                    </div>
                                </div>
                                <div
                                    className="selected-box"
                                    style={
                                        selectAnimationEnd && selectedAppList.length > 0
                                            ? {
                                                  border: '1px solid rgb(26, 196, 111)',
                                                  boxShadow:
                                                      '0px 0px 10px 0px rgba(27, 203, 122, 0.2)',
                                              }
                                            : { border: '1px dashed #dae1e8' }
                                    }
                                    ref={selectBoxRef}
                                >
                                    {selectedAppList.length === 0 && (
                                        <div className="empty-box">
                                            <img src={ImageEmpty} />
                                            <span>
                                                {t('resources.meshSpace.selectBasicService')}
                                            </span>
                                        </div>
                                    )}
                                    {selectedAppList.map((item: any, key: number) => {
                                        return (
                                            <div key={key} className="workload-item">
                                                <div className="icon-box">
                                                    {selectAnimationEnd ? (
                                                        <img
                                                            src={IconGreenWorkLoad}
                                                            style={{ width: 32, height: 34 }}
                                                        />
                                                    ) : (
                                                        <img
                                                            src={IconWorkLoad}
                                                            style={{ width: 32, height: 34 }}
                                                        />
                                                    )}
                                                    <div className="tip-icon">
                                                        <CommonIcon
                                                            style={{ fontSize: 16 }}
                                                            NormalIcon={IconPath}
                                                            title={t(
                                                                'resources.meshSpace.shareWorkloadTip',
                                                                {
                                                                    header: `${headerInfo?.key}=${headerInfo?.value}`,
                                                                }
                                                            )}
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    className="workload-info"
                                                    style={
                                                        selectAnimationEnd
                                                            ? { background: '#baedd4' }
                                                            : {}
                                                    }
                                                >
                                                    <SelectIcon animationEnd={selectAnimationEnd}>
                                                        <Icon
                                                            component={
                                                                ICON_MAP[item.kind] ||
                                                                IconDeployment
                                                            }
                                                        />
                                                    </SelectIcon>
                                                    <Tooltip title={item.name}>
                                                        <div
                                                            className="name"
                                                            style={
                                                                selectAnimationEnd
                                                                    ? { color: '#12a75c' }
                                                                    : {
                                                                          color:
                                                                              'rgb(121, 135, 156)',
                                                                      }
                                                            }
                                                        >
                                                            {item.name}
                                                        </div>
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
            </div>
        </ContentWrap>
    );
};

export default BaseSpace;
