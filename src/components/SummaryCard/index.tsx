import React from 'react';
import {
    Main,
    Card,
    CardTop,
    CardInfo,
    CardInfoTitle,
    CardInfoSub,
    IconBox,
    CardLinkBox,
    KubeIconIn,
    IconRight,
} from './style-components';
import Icon from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { ReactComponent as IconUser } from '../../images/icon/icon_normal_users.svg';
import { ReactComponent as IconDevspace } from '../../images/icon/icon_normal_devspace.svg';
import { ReactComponent as IconDashboard } from '../../images/icon/icon_normal_dashboard.svg';
import { ReactComponent as IconClusters } from '../../images/icon/icon_normal_clusters.svg';
import { ReactComponent as IconApplications } from '../../images/icon/icon_normal_applications.svg';
import { ReactComponent as IconNhLink } from '../../images/icon/icon_external_link.svg';
import kubeIcon from '../../images/icon/icon_btn_normal_kube.svg';
// icon_normal_users.svg
// icon_normal_devspace.svg
// icon_normal_dashboard.svg
// icon_normal_clusters.svg
// icon_normal_applications.svg
interface summaryPropsType {
    title: string;
    info?: string;
    linkText?: string;
    url?: string;
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
            case '/dashboard/devspace':
                return IconDevspace;
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
                        <CardInfoSub>{props.info}</CardInfoSub>
                    </CardInfo>
                </CardTop>
                <CardLinkBox href={props.url} target="_black" rel="noreferrer">
                    <KubeIconIn src={kubeIcon}></KubeIconIn>
                    {props.linkText}
                    <IconRight>
                        <Icon component={IconNhLink} style={{ fontSize: '20px' }}></Icon>
                    </IconRight>
                </CardLinkBox>
            </Card>
        </Main>
    );
}

export default SummaryCard;
