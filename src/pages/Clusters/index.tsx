import React, { FC, useState, useEffect } from 'react';
import SummaryCard from '../../components/SummaryCard';
import HTTP from '../../api/fetch';
import ListItem from './components/ListItem';
import { ContentTitle, ClusterCount, FlexContainer } from './style-components';
import { Button } from 'antd';
import i18n from '../../i18n/i18n';
import AddCluster from '../../components/AddCluster';
import { PlusOutlined } from '@ant-design/icons';
import { queryAllUser } from '../../services';
import { useTranslation } from 'react-i18next';

const Clusters: FC<{}> = () => {
    const [clusterList, setClusterList] = useState([]);
    const [showAdd, setShowAdd] = useState<boolean>(false);
    const { t } = useTranslation();

    useEffect(() => {
        queryClusters();
    }, []);

    async function queryClusters() {
        const nameMap = await queryAllUser();
        const response = await HTTP.get('cluster');
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
            <SummaryCard title={t('resources.cluster.name')} />
            <div>
                <ContentTitle>
                    <FlexContainer>
                        <span>{i18n.t('resources.cluster.info')}</span>
                        <ClusterCount>{clusterList.length}</ClusterCount>
                    </FlexContainer>
                    <Button onClick={handleAddCluster} type="primary" icon={<PlusOutlined />}>
                        {i18n.t('resources.cluster.add')}
                    </Button>
                </ContentTitle>
                {clusterList.map((item, index) => {
                    return <ListItem onSubmit={onSubmit} key={index} data={item} />;
                })}
            </div>
            {showAdd && <AddCluster onCancel={() => setShowAdd(false)} onSubmit={onSubmit} />}
        </div>
    );
};

export default Clusters;
