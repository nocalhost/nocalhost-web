import React, { useEffect, useState } from 'react';
import SummaryCard from '../../components/SummaryCard';
import { ListItem } from './ListItem';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import IconColorUser from '../../images/icon/icon_color_users.svg';
import IconColorApplications from '../../images/icon/icon_color_applications.svg';
import IconColorDevspace from '../../images/icon/icon_color_devspace.svg';
import UserWater from '../../images/icon/Users.svg';
import ApplicationWater from '../../images/icon/Applications.svg';
import ClusterWater from '../../images/icon/Cluster.svg';
import DevSpaceWater from '../../images/icon/DevSpace.svg';
import HTTP from '../../api/fetch';
import { ClusterItemType } from './type';
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
} from './style-components';
function Overview() {
    const { t } = useTranslation();
    const [userData, setUserData] = useState([]);
    const [applicationData, setApplicationData] = useState([]);
    const [clusterData, setClusterData] = useState([]);
    const [devSpaceData, setDevSpaceData] = useState([]);
    const getUser = async () => {
        const result = await HTTP.get('users');
        setUserData(result.data || []);
    };
    const getApplication = async () => {
        const result = await HTTP.get('application');
        setApplicationData(result.data || []);
    };
    const getCluster = async () => {
        const result = await HTTP.get('cluster');
        setClusterData(result.data || []);
    };
    const getDevSpaceData = async () => {
        const result = await HTTP.get('dev_space');
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
            <SummaryCard title={t('resources.dashboard.name')}></SummaryCard>
            <CardBox>
                <Row gutter={20}>
                    <Col span={8}>
                        <Card>
                            <Water src={UserWater}></Water>
                            <H mb="30px">{t('resources.users.name')}</H>
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
                    <Col span={8}>
                        <Card>
                            <Water src={ApplicationWater}></Water>
                            <H mb="30px">{t('resources.application.name')}</H>
                            {/* <Time>2020/02/08-2021/07/28</Time> */}
                            <FlexBetween>
                                <AmountBox>
                                    <Total>{applicationData.length}</Total>
                                    {/* <I>人</I> */}
                                </AmountBox>
                                <IconBox>
                                    <SvgIcon src={IconColorApplications} alt="" />
                                </IconBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card>
                            <Water src={DevSpaceWater}></Water>
                            <H mb="30px">{t('resources.space.name')}</H>
                            {/* <Time>2020/02/08-2021/07/28</Time> */}
                            <FlexBetween>
                                <AmountBox>
                                    <Total>{devSpaceData.length}</Total>
                                    {/* <I>人</I> */}
                                </AmountBox>
                                <IconBox>
                                    <SvgIcon src={IconColorDevspace} alt="" />
                                </IconBox>
                            </FlexBetween>
                        </Card>
                    </Col>
                </Row>
                <CardBox>
                    <Card>
                        <Flex mb="24px">
                            <H>{t('resources.cluster.name')}</H>
                            <Dot>{clusterData.length}</Dot>
                            <Water src={ClusterWater}></Water>
                        </Flex>
                        {clusterData.map((item: ClusterItemType) => (
                            <ListItem
                                item={item}
                                key={item.id}
                                user={
                                    userData.find(
                                        (el: { id: number }) => el.id === item.user_id
                                    ) || { name: '' }
                                }
                            ></ListItem>
                        ))}
                    </Card>
                </CardBox>
            </CardBox>
        </>
    );
}

export default Overview;
