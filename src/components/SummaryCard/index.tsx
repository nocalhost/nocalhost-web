import React from 'react';
import {
    Main,
    Card,
    CardTop,
    CardInfo,
    CardInfoTitle,
    CardInfoSub,
    IconBox,
} from './style-components';
import Icon from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { ReactComponent as IconUser } from '../../images/icon/icon_normal_users.svg';
// import { ReactComponent as IconDevspace } from '../../images/icon/icon_normal_devspace.svg';
import { ReactComponent as IconDashboard } from '../../images/icon/icon_normal_dashboard.svg';
import { ReactComponent as IconClusters } from '../../images/icon/icon_normal_clusters.svg';
import { ReactComponent as IconApplications } from '../../images/icon/icon_normal_applications.svg';
// icon_normal_users.svg
// icon_normal_devspace.svg
// icon_normal_dashboard.svg
// icon_normal_clusters.svg
// icon_normal_applications.svg
interface summaryPropsType {
    title: string;
}

function SummaryCard(props: summaryPropsType) {
    const urlParams = useLocation();
    const pathName = urlParams.pathname;
    const renderIcon = () => {
        switch (pathName) {
            case '/dashboard/overview':
                return IconDashboard;
            case '/dashboard/user':
                return IconUser;
            case '/dashboard/application':
                return IconApplications;
            default:
                return IconClusters;
        }
    };
    return (
        <Main>
            <Card>
                <CardTop>
                    <IconBox>
                        <Icon component={renderIcon()} style={{ fontSize: '32px' }}></Icon>
                    </IconBox>
                    <CardInfo>
                        <CardInfoTitle>{props.title}</CardInfoTitle>
                        <CardInfoSub>
                            提供 KubeSphere、Kubernetes 和 OpenPitrix
                            集群内各项服务组件的健康状态监控，可以查看当前集群的健康状态和运行时间，能够帮助用户监测集群的状况和及时定位问题。
                        </CardInfoSub>
                    </CardInfo>
                </CardTop>
            </Card>
        </Main>
    );
}

export default SummaryCard;
