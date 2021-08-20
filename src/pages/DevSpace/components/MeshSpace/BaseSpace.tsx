import React from 'react';

import styled from 'styled-components';
import { Tooltip } from 'antd';

import { useTranslation } from 'react-i18next';

import Icon from '@ant-design/icons';
import { ReactComponent as IconCluster } from '../../../../images/icon/icon_cluster.svg';
import { ReactComponent as IconSpace } from '../../../../images/icon/icon_normal_devspace.svg';
import { ReactComponent as IconWorkLoad } from '../../../../images/icon/icon_application.svg';

const ContentWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
        height: 102px;
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

        .main {
            margin-top: 16px;
            padding: 16px;
            flex: 1;
            display: flex;
            flex-direction: column;
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

            .workload-container {
                flex: 1;
                display: flex;

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

                .service-box {
                    flex: 2;
                }

                .selected-box {
                    flex: 1;
                    width: 182px;
                    margin-left: 40px;
                }
            }
        }
    }
`;

interface IProps {
    clusterName: string;
    currentSpace: any;
    appList: any;
    selectedAppList: any;
}

const BaseSpace = ({ clusterName, currentSpace, appList, selectedAppList }: IProps) => {
    const { t } = useTranslation();
    let workloads: any = [];
    let selectedWorkloads: any = [];

    try {
        if (appList) {
            appList.forEach((item: any) => {
                item.workloads.forEach((subItem: any) => {
                    workloads.push({
                        ...subItem,
                        appName: item.label,
                    });
                });
            });

            selectedAppList.forEach((item: any) => {
                item.workloads.forEach((subItem: any) => {
                    selectedWorkloads.push({
                        ...subItem,
                        appName: item.name,
                    });
                });
            });
        }
    } catch (e) {
        workloads = [];
        selectedWorkloads = [];
    }

    return (
        <ContentWrap>
            <div className="header"></div>
            <div className="content">
                <div className="icon-wrap">
                    <Icon component={IconCluster} style={{ fontSize: 40 }} />
                    <span>{clusterName}</span>
                </div>
                <div className="main">
                    <div className="title">
                        <Icon component={IconSpace} style={{ fontSize: 32 }} />
                        <span>
                            {currentSpace
                                ? currentSpace.space_name
                                : t('resources.meshSpace.basicSpace')}
                        </span>
                    </div>
                    <div className="workload-container">
                        <div className="service-box">
                            {workloads.map((item: any, key: number) => {
                                return (
                                    <div key={key} className="workload-item">
                                        <div>
                                            <Icon
                                                component={IconWorkLoad}
                                                style={{ fontSize: 32 }}
                                            />
                                        </div>
                                        <div className="workload-info">
                                            <Icon component={IconWorkLoad} />
                                            <Tooltip title={`${item.appName}:${item.name}`}>
                                                <div className="name">{`${item.appName}:${item.name}`}</div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {selectedAppList && selectedAppList.length > 0 && (
                            <div className="selected-box">
                                {selectedWorkloads.map((item: any, key: number) => {
                                    return (
                                        <div key={key} className="workload-item">
                                            <div>
                                                <Icon
                                                    component={IconWorkLoad}
                                                    style={{ fontSize: 32 }}
                                                />
                                            </div>
                                            <div className="workload-info">
                                                <Icon component={IconWorkLoad} />
                                                <Tooltip title={`${item.appName}:${item.name}`}>
                                                    <div className="name">{`${item.appName}:${item.name}`}</div>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ContentWrap>
    );
};

export default BaseSpace;
