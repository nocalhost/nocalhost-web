import React, { FC, useState, useEffect } from 'react';
import SummaryCard from '../../components/SummaryCard';
import HTTP from '../../api/fetch';
import ListItem from './components/ListItem';
import { ContentTitle, ClusterCount, FlexContainer, LoadingBox } from './style-components';
import { Button, Spin } from 'antd';
import i18n from '../../i18n/i18n';
import AddCluster from '../../components/AddCluster';
import { queryAllUser } from '../../services';
import { useTranslation } from 'react-i18next';
import NotData from '../../components/NotData';
import Icon from '@ant-design/icons';
import { ReactComponent as IconAdd } from '../../images/icon/icon_add.svg';
const Clusters: FC<{}> = () => {
    const [clusterList, setClusterList] = useState([]);
    const [clusterLoading, setClusterLoading] = useState(false);
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const { t } = useTranslation();

    useEffect(() => {
        queryClusters();
    }, []);

    async function queryClusters() {
        setClusterLoading(true);
        const nameMap = await queryAllUser();
        const response = await HTTP.get('cluster');
        setClusterLoading(false);
        const tmpList = response.data.map((item: any) => {
            return {
                ...item,
                userName: nameMap.get(item.user_id),
            };
        });
        setClusterList(tmpList);
    }

    const handleAddCluster = () => {
        setShowAdd(true);
    };

    const onSubmit = () => {
        setShowAdd(false);
        queryClusters();
    };

    return (
        <div>
            <SummaryCard
                title={t('resources.cluster.name')}
                info={t('document.cluster.info')}
                linkText={t('document.cluster.more')}
                url={t('document.cluster.url')}
            />
            <div>
                <ContentTitle>
                    <FlexContainer>
                        <span>{i18n.t('resources.cluster.info')}</span>
                        <ClusterCount>{clusterList.length}</ClusterCount>
                    </FlexContainer>
                    <Button
                        onClick={handleAddCluster}
                        type="primary"
                        icon={<Icon component={IconAdd} style={{ color: '#fff' }}></Icon>}
                    >
                        {i18n.t('resources.cluster.add')}
                    </Button>
                </ContentTitle>
                <div>
                    {clusterList.length === 0 && !clusterLoading ? (
                        <NotData></NotData>
                    ) : clusterLoading ? (
                        <LoadingBox>
                            <Spin></Spin>
                        </LoadingBox>
                    ) : (
                        <>
                            {clusterList.map((item, index) => {
                                return <ListItem onSubmit={onSubmit} key={index} data={item} />;
                            })}
                        </>
                    )}
                </div>
            </div>
            {showAdd && <AddCluster onCancel={() => setShowAdd(false)} onSubmit={onSubmit} />}
        </div>
    );
};

export default Clusters;
