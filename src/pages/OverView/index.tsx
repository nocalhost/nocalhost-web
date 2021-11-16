import React, { useEffect, useState } from 'react';
import SummaryCard from '../../components/SummaryCard';
import { ListItem } from './ListItem';
import { Row, Col, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import IconColorUser from '../../images/icon/icon_color_users.svg';
import IconColorApplications from '../../images/icon/icon_color_applications.svg';
import IconColorDevspace from '../../images/icon/icon_color_devspace.svg';
import UserWater from '../../images/icon/Users.svg';
import ApplicationWater from '../../images/icon/Applications.svg';
import ClusterWater from '../../images/icon/Cluster.svg';
import DevSpaceWater from '../../images/icon/DevSpace.svg';
import HTTP from '../../api/fetch';
import Icon from '@ant-design/icons';
import { useHistory } from 'react-router';
import { ReactComponent as IconEnter } from '../../images/icon/icon_state_enter.svg';
import { ClusterItemType } from './type';
import NotData from '../../components/NotData';
import {
    Card,
    CardBox,
    H,
    SvgIcon,
    // Time,
    FlexBetween,
    Total,
    // I,
    AmountBox,
    Water,
    Dot,
    Flex,
    IconBox,
    LoadingBox,
} from './style-components';
function Overview() {
    const history = useHistory();
    const { t } = useTranslation();
    const [userData, setUserData] = useState([]);
    const [applicationData, setApplicationData] = useState([]);
    const [clusterData, setClusterData] = useState([]);
    const [devSpaceData, setDevSpaceData] = useState([]);
    const [clusterLoading, setClusterLoading] = useState(false);
    const getUser = async () => {
        const result = await HTTP.get('users');
        setUserData(result.data || []);
    };
    const getApplication = async () => {
        const result = await HTTP.get('application');
        setApplicationData(result.data || []);
    };
    const getCluster = async () => {
        setClusterLoading(true);
        const result = await HTTP.get('cluster');
        setClusterLoading(false);
        setClusterData(result.data || []);
    };
    const getDevSpaceData = async () => {
        const result = await HTTP.get('dev_space', null, { is_v2: true });
        setDevSpaceData(result.data || []);
    };
    const getRace = async () => {
        await getUser();
        await getCluster();
    };
    useEffect(() => {
        getDevSpaceData();
        getApplication();
        getRace();
    }, []);
    return (
        <>
            <SummaryCard
                title={t('resources.dashboard.name')}
                info={t('document.overview.info')}
                linkText={t('document.overview.more')}
                url={t('document.overview.url')}
            ></SummaryCard>
            <CardBox>
                <Row gutter={20}>
                    <Col span={6}>
                        <Card onClick={() => history.push('/dashboard/user')}>
                            <Water src={UserWater}></Water>
                            <H mb="30px">
                                <>{t('resources.users.name')}</>
                                <span className="enter">
                                    <Icon
                                        component={IconEnter}
                                        style={{ fontSize: '20px', marginLeft: '4px' }}
                                    ></Icon>
                                </span>
                            </H>
                            {/* <Time>2020/02/08-2021/07/28</Time> */}
                            <FlexBetween>
                                <AmountBox>
                                    <Total>{userData.length}</Total>
                                    {/* <I>人</I> */}
                                </AmountBox>
                                <IconBox>
                                    <SvgIcon src={IconColorUser} alt="" />
                                </IconBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card onClick={() => history.push('/dashboard/application')}>
                            <Water src={ApplicationWater}></Water>
                            <H mb="30px">
                                <>{t('resources.application.name')}</>
                                <span className="enter">
                                    <Icon
                                        component={IconEnter}
                                        style={{ fontSize: '20px', marginLeft: '4px' }}
                                    ></Icon>
                                </span>
                            </H>
                            {/* <Time>2020/02/08-2021/07/28</Time> */}
                            <FlexBetween>
                                <AmountBox>
                                    <Total>{applicationData.length}</Total>
                                    {/* <I>个</I> */}
                                </AmountBox>
                                <IconBox>
                                    <SvgIcon src={IconColorApplications} alt="" />
                                </IconBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card onClick={() => history.push('/dashboard/devspace')}>
                            <Water src={DevSpaceWater}></Water>
                            <H mb="30px">
                                <>{t('resources.space.name')}</>
                                <span className="enter">
                                    <Icon
                                        component={IconEnter}
                                        style={{ fontSize: '20px', marginLeft: '4px' }}
                                    ></Icon>
                                </span>
                            </H>
                            {/* <Time>2020/02/08-2021/07/28</Time> */}
                            <FlexBetween>
                                <AmountBox>
                                    <Total>{devSpaceData.length}</Total>
                                    {/* <I>个</I> */}
                                </AmountBox>
                                <IconBox>
                                    <SvgIcon src={IconColorDevspace} alt="" />
                                </IconBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card>
                            <Water src={DevSpaceWater}></Water>
                            <H mb="30px">
                                <>{t('resources.cost.name')}</>
                                {/* <span className="enter">
                                    <Icon
                                        component={IconEnter}
                                        style={{ fontSize: '20px', marginLeft: '4px' }}
                                    ></Icon>
                                </span> */}
                            </H>
                            {/* <Time>2020/02/08-2021/07/28</Time> */}
                            <FlexBetween>
                                <AmountBox>
                                    <Total>{devSpaceData.length}</Total>
                                    {/* <I>个</I> */}
                                </AmountBox>
                                <IconBox>
                                    <SvgIcon src={IconColorDevspace} alt="" />
                                </IconBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                </Row>
                <CardBox>
                    <Card style={{ cursor: 'auto' }}>
                        <Flex mb="24px">
                            <H>{t('resources.cluster.name')}</H>
                            <Dot>{clusterData.length}</Dot>
                            <Water src={ClusterWater}></Water>
                        </Flex>
                        {clusterData.length === 0 && !clusterLoading ? (
                            <NotData></NotData>
                        ) : clusterLoading ? (
                            <LoadingBox>
                                <Spin></Spin>
                            </LoadingBox>
                        ) : (
                            clusterData.map((item: ClusterItemType) => (
                                <ListItem
                                    item={item}
                                    key={item.id}
                                    user={
                                        userData.find(
                                            (el: { id: number }) => el.id === item.user_id
                                        ) || { name: '' }
                                    }
                                ></ListItem>
                            ))
                        )}
                    </Card>
                </CardBox>
            </CardBox>
        </>
    );
}

export default Overview;
