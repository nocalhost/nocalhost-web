import React, { useEffect } from 'react';
import { Tabs, Table } from 'antd';
import BreadCard from '../../../components/BreadCard';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HTTP from '../../../api/fetch';
import { useLocation } from 'react-router-dom';

import DevspaceForm from './DevspaceForm';

const ContentWrap = styled.div`
    background: rgb(255, 255, 255);
    box-shadow: 0 4px 8px 0 rgba(40, 47, 55, 0.05);
    border-radius: 8px;
    padding-bottom: 24px;
`;

const PanelWrap = styled.div`
    max-width: 632px;
    margin: 0 auto;
`;

interface RouterParams {
    record: {
        id: number;
    };
}

const ShareUserTitle = () => {
    return (
        <div>
            <span>共享用户</span>
            <span>88</span>
        </div>
    );
};

const DevspaceOperation = () => {
    const { t } = useTranslation();

    const location = useLocation<RouterParams>();
    const {
        state: {
            record: { id },
        },
    } = location;
    console.log(id);

    const handleCancel = () => {
        console.log('cancel');
    };

    const columns = [
        {
            title: t('resources.users.fields.name'),
        },
        {
            title: t('resources.users.fields.userType'),
        },
        {
            title: t('resources.users.fields.email'),
        },
        {
            title: t('resources.users.fields.role'),
        },
        {
            title: t('common.operation'),
        },
    ];

    useEffect(() => {
        queryDetail();
    }, []);

    async function queryDetail() {
        try {
            const response = await HTTP.get(
                'dev_space/detail',
                { cluster_user_id: id },
                { is_v2: true }
            );
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <BreadCard
                data={{
                    menu: t('resources.devSpace.name'),
                    subMenu: t('resources.devSpace.actions.edit'),
                    route: '/dashboard/devspace',
                }}
            />
            <ContentWrap>
                <Tabs style={{ paddingLeft: 20 }} defaultActiveKey="1">
                    <Tabs.TabPane tab={t('resources.devSpace.devSpace')} key="1">
                        <PanelWrap>
                            <DevspaceForm isEdit={true} onCancel={handleCancel} />
                        </PanelWrap>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<ShareUserTitle />} key="2">
                        <Table columns={columns}></Table>
                    </Tabs.TabPane>
                </Tabs>
            </ContentWrap>
        </>
    );
};

export default DevspaceOperation;
