import React, { useEffect, useState } from 'react';
import SummaryCard from '../../components/SummaryCard';
import { ListItem } from './ListItem';
import { Row, Col, Spin, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import IconColorUser from '../../images/icon/icon_color_users.svg';
import IconColorApplications from '../../images/icon/icon_color_applications.svg';
import IconColorDevspace from '../../images/icon/icon_color_devspace.svg';
import IconColorCost from '../../images/icon/icon_color_costReduction.svg';
import ClusterWater from '../../images/icon/Cluster.svg';
import DataWater from '../../images/icon/Data.svg';

import HTTP from '../../api/fetch';
import Icon from '@ant-design/icons';
import { useHistory } from 'react-router';
import { ReactComponent as IconEnter } from '../../images/icon/icon_state_enter.svg';
import { ReactComponent as IconSleep } from '../../images/icon/icon_title_sleep.svg';
import { ReactComponent as IconHelp } from '../../images/icon/icon_label_query.svg';

import CommonIcon from '../../components/CommonIcon';
import { ClusterItemType } from './type';
import { ISpaceData } from '../../types';
import NotData from '../../components/NotData';
import { VClusterAggregate } from './VirtualCluster';
import moment from 'moment';
import {
    NormalCard,
    Card,
    DataCard,
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
    SleepingBox,
} from './style-components';

function Overview() {
    const history = useHistory();
    const { t } = useTranslation();
    const [userData, setUserData] = useState([]);
    const [applicationData, setApplicationData] = useState([]);
    const [clusterData, setClusterData] = useState([]);
    const [devSpaceData, setDevSpaceData] = useState([]);
    const [vClusterCount, setVClusterCount] = useState(0);
    const [clusterLoading, setClusterLoading] = useState(false);
    const [averageCostSave, setAverageCostSave] = useState<string>('');
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
        const data = result.data || [];

        setDevSpaceData(data);

        setVClusterCount(data.filter((item: any) => item.dev_space_type === 3).length);
        setDevSpaceData(data);
        const costSaveData = data
            .filter((item: any) => item.sleep_minute > 0)
            .map((item: any) => {
                return item.sleep_minute / moment().diff(moment(item.created_at), 'minutes');
            });
        const sum = costSaveData.reduce((prev: number, curr: number) => prev + curr, 0);
        const len = costSaveData.length;
        if (len > 0) {
            setAverageCostSave(`${((sum / len) * 100).toFixed(2)}%`);
        }
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
                <NormalCard>
                    <Flex mb="24px">
                        <H bold={true}>{t('resources.dashboard.dataOverview')}</H>
                        <Water src={DataWater}></Water>
                    </Flex>
                    <Row gutter={20}>
                        <Col span={6}>
                            <DataCard onClick={() => history.push('/dashboard/user')}>
                                <H>
                                    <>{t('resources.users.name')}</>
                                    <span className="enter">
                                        <Icon
                                            component={IconEnter}
                                            style={{ fontSize: '20px', marginLeft: '4px' }}
                                        ></Icon>
                                    </span>
                                </H>
                                <FlexBetween>
                                    <AmountBox>
                                        <Total>{userData.length}</Total>
                                        {/* <I>人</I> */}
                                    </AmountBox>
                                    <div className="icon">
                                        <IconBox>
                                            <SvgIcon src={IconColorUser} alt="" />
                                        </IconBox>
                                    </div>
                                </FlexBetween>
                            </DataCard>
                        </Col>
                        <Col span={6}>
                            <DataCard onClick={() => history.push('/dashboard/application')}>
                                <H>
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
                                    <div className="icon">
                                        <IconBox>
                                            <SvgIcon src={IconColorApplications} alt="" />
                                        </IconBox>
                                    </div>
                                </FlexBetween>
                            </DataCard>
                        </Col>
                        <Col span={6}>
                            <DataCard onClick={() => history.push('/dashboard/devspace')}>
                                <H>
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
                                        <Flex>
                                            <Tooltip
                                                title={t('resources.cost.nsSleeping', {
                                                    count: devSpaceData.filter(
                                                        (item: ISpaceData) =>
                                                            item.sleep_status === 'asleep'
                                                    ).length,
                                                })}
                                            >
                                                <SleepingBox>
                                                    <Icon
                                                        component={IconSleep}
                                                        style={{ fontSize: 20, marginRight: 2 }}
                                                    />

                                                    <span>
                                                        ·&nbsp;
                                                        {
                                                            devSpaceData.filter(
                                                                (item: ISpaceData) =>
                                                                    item.sleep_status === 'asleep'
                                                            ).length
                                                        }
                                                    </span>
                                                </SleepingBox>
                                            </Tooltip>
                                            <VClusterAggregate count={vClusterCount} />
                                        </Flex>
                                    </AmountBox>
                                    <div className="icon">
                                        <IconBox>
                                            <SvgIcon src={IconColorDevspace} alt="" />
                                        </IconBox>
                                    </div>
                                </FlexBetween>
                            </DataCard>
                        </Col>
                        <Col span={6}>
                            <NormalCard height="98px" bg="#f9fbfd">
                                <H>
                                    <>{t('resources.cost.name')}</>
                                    <span className="enter">
                                        <CommonIcon
                                            title={t('resources.cost.averageSaveTip')}
                                            NormalIcon={IconHelp}
                                            style={{ fontSize: '20px', marginLeft: '4px' }}
                                        ></CommonIcon>
                                    </span>
                                </H>
                                {/* <Time>2020/02/08-2021/07/28</Time> */}
                                <FlexBetween>
                                    <AmountBox>
                                        <Total>{averageCostSave || '--'}</Total>
                                        {/* <I>个</I> */}
                                    </AmountBox>
                                    <div className="icon">
                                        <IconBox>
                                            <SvgIcon src={IconColorCost} alt="" />
                                        </IconBox>
                                    </div>
                                </FlexBetween>
                            </NormalCard>
                        </Col>
                    </Row>
                </NormalCard>

                <CardBox>
                    <Card style={{ cursor: 'auto' }}>
                        <Flex mb="24px">
                            <H bold={true}>{t('resources.cluster.name')}</H>
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
