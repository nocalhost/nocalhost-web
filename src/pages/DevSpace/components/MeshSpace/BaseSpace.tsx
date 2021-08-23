import React from 'react';

import styled from 'styled-components';
import { Tooltip } from 'antd';

import { useTranslation } from 'react-i18next';

import Icon from '@ant-design/icons';
import { ReactComponent as IconCluster } from '../../../../images/icon/icon_cluster.svg';
import { ReactComponent as IconSpace } from '../../../../images/icon/icon_normal_devspace.svg';
import { ReactComponent as IconWorkLoad } from '../../../../images/icon/image_normal_applicationService.svg';
import { ReactComponent as ImageEmpty } from '../../../../images/icon/image_empty_space.svg';
import { ReactComponent as ImageComputer } from '../../../../images/icon/image_computer.svg';
import { ReactComponent as IconExplain } from '../../../../images/icon/icon_label_explain.svg';
import { ReactComponent as IconDeployment } from '../../../../images/icon//icon_deployments.svg';
import { ReactComponent as IconDaemonset } from '../../../../images/icon/icon_daemonset.svg';
import { ReactComponent as IconJob } from '../../../../images/icon/icon_jobs.svg';
import { ReactComponent as IconCronjob } from '../../../../images/icon/icon_cronjob.svg';

const ICON_MAP: {
    [index: string]: any;
} = {
    Deployment: IconDeployment,
    Daemontset: IconDaemonset,
    Job: IconJob,
    CronJob: IconCronjob,
};

const ContentWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
        height: 102px;
        display: flex;
        justify-content: center;
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
            margin-top: 20px;
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
                    width: 240px;
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
}

const BaseSpace = ({
    clusterName,
    currentSpace,
    appList,
    selectedAppList,
    currentStep,
}: IProps) => {
    const { t } = useTranslation();

    return (
        <ContentWrap>
            <div className="header">
                <ImageComputer />
            </div>
            <div className="content">
                <div className="icon-wrap">
                    <Icon component={IconCluster} style={{ fontSize: 40 }} />
                    <span>{clusterName}</span>
                </div>
                {currentStep === 1 && (
                    <div className="tracing-header">
                        <div className="content">
                            <div className="desc">
                                <Icon
                                    component={IconExplain}
                                    style={{ fontSize: 16, marginRight: 6 }}
                                />
                                {t('resources.meshSpace.setTracingHeader')}
                            </div>
                        </div>
                    </div>
                )}
                <div className="main">
                    <div className="workload-container">
                        <div className="title">
                            <Icon component={IconSpace} style={{ fontSize: 32 }} />
                            <span>
                                {currentSpace
                                    ? currentSpace.space_name
                                    : t('resources.meshSpace.basicSpace')}
                            </span>
                        </div>
                        <div className="service-box">
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
                                            <Icon
                                                component={IconWorkLoad}
                                                style={{ fontSize: 32 }}
                                            />
                                        </div>
                                        <div className="workload-info">
                                            <Icon
                                                component={ICON_MAP[item.kind] || IconDeployment}
                                            />
                                            <Tooltip title={`${item.appName}:${item.name}`}>
                                                <div className="name">{`${item.appName}:${item.name}`}</div>
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

                            <div className="selected-box">
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
