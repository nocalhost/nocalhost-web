import React, { FC, useState, useEffect } from 'react';
import SummaryCard from '../../components/SummaryCard';
import HTTP from '../../api/fetch';
import ListItem from './components/ListItem';
import { ContentTitle, ClusterCount, FlexContainer } from './style-components';
import { Button } from 'antd';
import i18n from '../../i18n/i18n';
import AddCluster from '../../components/AddCluster';
import { PlusOutlined } from '@ant-design/icons';

const Clusters: FC<{}> = () => {
    const [clusterList, setClusterList] = useState([]);
    const [showAdd, setShowAdd] = useState<boolean>(false);

    useEffect(() => {
        queryClusters();
    }, []);

    async function queryClusters() {
        const response = await HTTP.get('cluster');
        setClusterList(response.data);
    }

    const handleAddCluster = () => {
        setShowAdd(true);
    };

    return (
        <div>
            <SummaryCard title="clusters" />
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
                    return <ListItem key={index} data={item} />;
                })}
            </div>
            {showAdd && <AddCluster onCancel={() => setShowAdd(false)} />}
        </div>
    );
};

export default Clusters;
