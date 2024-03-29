import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ListItem, MainContent, Bottom, Label } from './style-components';
// import { UserContext } from '../../provider/appContext';
import { useTranslation } from 'react-i18next';
import CommonIcon from '../CommonIcon';
import Icon from '@ant-design/icons';
import { ReactComponent as IconArrowLeftHover } from '../../images/icon/icon_btn_arrow_left_hover_fold.svg';
import { ReactComponent as IconArrowLeftNormal } from '../../images/icon/icon_btn_arrow_left_normal_fold.svg';
import { ReactComponent as IconArrowRightHover } from '../../images/icon/icon_btn_arrow_right_hover_unfold.svg';
import { ReactComponent as IconArrowRightNormal } from '../../images/icon/icon_btn_arrow_right_normal_unfold.svg';
import { ReactComponent as IconElectedUser } from '../../images/icon/icon_elected_users.svg';
import { ReactComponent as IconElectedDashboard } from '../../images/icon/icon_elected_dashboard.svg';
import { ReactComponent as IconElectedApplications } from '../../images/icon/icon_elected_applications.svg';
import { ReactComponent as IconNormalUser } from '../../images/icon/icon_normal_users.svg';
import { ReactComponent as IconNormalDashboard } from '../../images/icon/icon_normal_dashboard.svg';
import { ReactComponent as IconNormalApplications } from '../../images/icon/icon_normal_applications.svg';
import { ReactComponent as IconNormalClusters } from '../../images/icon/icon_normal_clusters.svg';
import { ReactComponent as IconSelectedClusters } from '../../images/icon/icon_electedl_clusters.svg';
import { ReactComponent as IconNormalDevspace } from '../../images/icon/icon_normal_devspace.svg';
import { ReactComponent as IconSelectedDevspace } from '../../images/icon/icon_elected_devspace.svg';

function Dashbord() {
    const urlParams = useLocation();
    const pathName = urlParams.pathname;
    const [expand, setExpand] = useState(true);
    const { t } = useTranslation();
    const state: any = urlParams.state;
    const isMeshAnimation =
        urlParams.pathname === '/dashboard/devspace/mesh-space' ||
        (urlParams.pathname === '/dashboard/devspace/space-operation' &&
            state?.record?.space_type === 'MeshSpace');

    const DASHBOARD = [
        {
            icon: IconNormalDashboard,
            selectedIcon: IconElectedDashboard,
            name: t('resources.dashboard.name'),
            url: '/dashboard/overview',
        },
        {
            icon: IconNormalUser,
            selectedIcon: IconElectedUser,
            name: t('resources.users.name'),
            url: '/dashboard/user',
        },
        {
            icon: IconNormalClusters,
            selectedIcon: IconSelectedClusters,
            name: t('resources.cluster.name'),
            url: '/dashboard/clusters',
        },
        {
            icon: IconNormalApplications,
            selectedIcon: IconElectedApplications,
            name: t('resources.application.name'),
            url: '/dashboard/application',
        },
        {
            icon: IconNormalDevspace,
            selectedIcon: IconSelectedDevspace,
            name: t('resources.space.name'),
            url: '/dashboard/devspace',
        },
    ];
    return (
        <MainContent expand={expand}>
            {DASHBOARD.map((item) => {
                return (
                    <ListItem key={item.name} isActive={pathName.startsWith(item.url)}>
                        <Link to={item.url}>
                            <Icon
                                component={
                                    pathName.startsWith(item.url) ? item.selectedIcon : item.icon
                                }
                                style={{ fontSize: '20px' }}
                            ></Icon>
                            <Label expand={expand}>{item.name}</Label>
                        </Link>
                    </ListItem>
                );
            })}
            {/* <div onClick={toAppliction}>application</div>
            <div onClick={toUser}>user</div> */}
            <Bottom
                expand={expand}
                onClick={() => {
                    !isMeshAnimation && setExpand(!expand);
                }}
            >
                <CommonIcon
                    title={isMeshAnimation ? t('common.bt.disabled') : ''}
                    HoverIcon={expand ? IconArrowLeftHover : IconArrowRightHover}
                    NormalIcon={expand ? IconArrowLeftNormal : IconArrowRightNormal}
                    style={{ fontSize: '20px', opacity: isMeshAnimation ? 0.5 : 1 }}
                ></CommonIcon>
                {/* {expand ? (
                    <CommonIcon
                        // title={t('common.bt.expand')}
                        HoverIcon={expand ? IconArrowLeftHover : IconArrowRightHover}
                        NormalIcon={expand ? IconArrowLeftNormal : IconArrowRightNormal}
                        style={{ fontSize: '20px' }}
                    ></CommonIcon>
                ) : (
                    <CommonIcon
                        // title={t('common.bt.collapse')}
                        HoverIcon={IconArrowRightHover}
                        NormalIcon={IconArrowRightNormal}
                        style={{ fontSize: '20px' }}
                    ></CommonIcon>
                )} */}
            </Bottom>
        </MainContent>
    );
}

export default Dashbord;
