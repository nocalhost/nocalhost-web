import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, Select, message } from 'antd';

import BreadCard from '../../../components/BreadCard';
import TableSearchInput from '../../../components/TableSearchInput';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HTTP from '../../../api/fetch';
import { useLocation } from 'react-router-dom';
import DevspaceForm from './DevspaceForm';
import AddShare from './AddShare';
import Icon from '@ant-design/icons';

import { ReactComponent as IconAddPerson } from '../../../images/icon/icon_btn_addPeople.svg';
import { ReactComponent as IconDelPerson } from '../../../images/icon/icon_btn_normal_addPeople.svg';
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

const ContentHeader = styled.div`
    display: flex;
    margin-bottom: 12px;
    justify-content: space-between;
`;

const FlexBox = styled.div`
    display: flex;
`;

const ShareUserTitle = () => {
    return (
        <div>
            <span>共享用户</span>
            <span>88</span>
        </div>
    );
};

const options = [
    {
        label: 'Viewer',
        value: 'Viewer',
    },
    {
        label: 'Cooperator',
        value: 'Cooperator',
    },
];

const DevspaceOperation = () => {
    const { t } = useTranslation();
    const [showAddModal, setShowModal] = useState<boolean>(false);

    const [userList, setUserList] = useState([]);
    const [selectedList, setSelectList] = useState([]);

    const location = useLocation<RouterParams>();
    const {
        state: {
            record,
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
            key: '1',
            dataIndex: 'name',
        },
        {
            title: t('resources.users.fields.userType'),
            key: '2',
            dataIndex: 'is_admin',
            render: (text: string, record: any) => {
                return (
                    <div>
                        {record.is_admin
                            ? t('resources.devSpace.fields.admin')
                            : t('resources.devSpace.fields.normalUser')}
                    </div>
                );
            },
        },
        {
            title: t('resources.users.fields.email'),
            key: '3',
            dataIndex: 'email',
        },
        {
            title: t('resources.users.fields.role'),
            key: '4',
            dataIndex: 'status',
            render: () => {
                return (
                    <div>
                        <Select style={{ width: 120, border: 'none' }} options={options} />
                    </div>
                );
            },
        },
        {
            title: t('common.operation'),
            key: '5',
            render: () => {
                return (
                    <div>
                        <Icon component={IconDelPerson} style={{ fontSize: 20 }} />
                    </div>
                );
            },
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
            const { cooper_user, viewer_user } = response.data[0];
            console.log('data', cooper_user, viewer_user, response);
            setUserList(cooper_user.concat(viewer_user));
        } catch (e) {
            console.log(e);
        }
    }

    const handleSearch = () => {
        console.log('search');
    };

    const rowSelection = {
        onChange(selectedKeys: any) {
            setSelectList(selectedKeys);
        },
    };

    const handleCancelShare = async () => {
        // cancel share
        const response = await HTTP.post(
            'dev_space/unshare',
            {
                cluster_user_id: id,
                users: selectedList,
            },
            {
                is_v2: true,
            }
        );
        if (response.code === 0) {
            queryDetail();
            message.success('resources.devSpace.tips.unShareSuccess');
        }
    };

    const handleSubmit = () => {
        queryDetail();
        setShowModal(false);
    };

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
                <Tabs style={{ padding: '0 20px 0' }} defaultActiveKey="1">
                    <Tabs.TabPane tab={t('resources.devSpace.devSpace')} key="1">
                        <PanelWrap>
                            <DevspaceForm record={record} isEdit={true} onCancel={handleCancel} />
                        </PanelWrap>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<ShareUserTitle />} key="2">
                        <ContentHeader>
                            <TableSearchInput
                                placeholder={t('resources.devSpace.tips.searchPlaceholder')}
                                onConfirm={handleSearch}
                            />
                            <FlexBox>
                                <Button
                                    style={{
                                        display: 'flex',
                                        justifyItems: 'center',
                                        marginRight: 12,
                                    }}
                                    icon={
                                        <IconDelPerson
                                            style={{ color: '#ffffff', marginRight: 8 }}
                                        />
                                    }
                                    onClick={handleCancelShare}
                                >
                                    {t('resources.devSpace.cancelShare')}
                                </Button>
                                <Button
                                    style={{ display: 'flex', justifyItems: 'center' }}
                                    icon={
                                        <IconAddPerson
                                            style={{ color: '#ffffff', marginRight: 8 }}
                                        />
                                    }
                                    type="primary"
                                    onClick={() => setShowModal(true)}
                                >
                                    {t('resources.devSpace.addShare')}
                                </Button>
                            </FlexBox>
                        </ContentHeader>
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={userList}
                            rowKey={(record) => record.id}
                            pagination={{
                                position: ['bottomCenter'],
                            }}
                        ></Table>
                    </Tabs.TabPane>
                </Tabs>
            </ContentWrap>
            {showAddModal && (
                <AddShare
                    cluster_user_id={id}
                    shareUseList={userList}
                    onCancel={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </>
    );
};

export default DevspaceOperation;