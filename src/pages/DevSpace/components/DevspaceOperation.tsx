import React, { useEffect, useState } from 'react';
import { Tabs, Table, Button, message } from 'antd';

import BreadCard from '../../../components/BreadCard';
import TableSearchInput from '../../../components/TableSearchInput';

import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HTTP from '../../../api/fetch';
import { useLocation, useHistory } from 'react-router-dom';
import DevspaceForm from './DevspaceForm';
import AddShare from './AddShare';
import CommonIcon from '../../../components/CommonIcon';
import DeleteModal from '../../../components/DeleteModal';
import ShareType from './ShareType';
import './index.less';

import { ReactComponent as IconAddPerson } from '../../../images/icon/icon_btn_addPeople.svg';
import { ReactComponent as IconDelPerson } from '../../../images/icon/icon_btn_normal_addPeople.svg';
import { ReactComponent as IconSelectedDelPerson } from '../../../images/icon/icon_btn_elected_addPeople.svg';
import Dialog from '../../../components/Dialog';

import MeshSpace from './MeshSpace';

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
        space_type: 'IsolateSpace' | 'MeshSpace';
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

const ShareSpan = styled.span`
    display: inline-block;
    min-width: 20px;
    margin-left: 4px;
    font-size: 12px;
    text-align: center;
    background: rgb(218, 225, 232);
    border-radius: 10px;
`;

const ShareUserTitle = (props: any) => {
    const { t } = useTranslation();
    const { count } = props;
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <span>{t('resources.devSpace.sharedUser')}</span>
            {count > 0 && <ShareSpan>{count}</ShareSpan>}
        </div>
    );
};

const DevspaceOperation = () => {
    const { t } = useTranslation();
    const [showAddModal, setShowModal] = useState<boolean>(false);
    const [userList, setUserList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [selectedList, setSelectList] = useState([]);
    const [newRecord, setNewRecord] = useState<any>();
    const location = useLocation<RouterParams>();
    const [deleteId, setDeleteId] = useState('');
    const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
    const [spaceOwner, setSpaceOwner] = useState<any>();
    const history = useHistory();
    const {
        state: {
            record,
            record: { id, space_type },
        },
    } = location;

    // console.log('>>> record: ', record, space_type);

    const handleCancel = () => {
        history.push('/dashboard/devspace');
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
            render: (text: string, record: any) => {
                return (
                    <div>
                        <ShareType
                            defaultValue={record.shareType}
                            onChange={handChangeShareType}
                            user_id={record.id}
                        />
                    </div>
                );
            },
        },
        {
            title: t('common.operation'),
            key: '5',
            render: (text: string, record: any) => {
                return (
                    <div
                        onClick={() => {
                            setDeleteId(record.id);
                            setDeleteModalShow(true);
                        }}
                        style={{ display: 'flex', alignItems: 'center', width: 20 }}
                    >
                        <CommonIcon
                            NormalIcon={IconDelPerson}
                            HoverIcon={IconSelectedDelPerson}
                            style={{ fontSize: '20px' }}
                            title={t('resources.devSpace.cancelShare')}
                        ></CommonIcon>
                    </div>
                );
            },
        },
    ];

    async function handChangeShareType(value: string, user_id: any) {
        const options =
            value === 'Viewer'
                ? {
                      viewers: [user_id],
                  }
                : {
                      cooperators: [user_id],
                  };
        const response = await HTTP.post(
            'dev_space/share',
            {
                cluster_user_id: id,
                ...options,
            },
            {
                is_v2: true,
            }
        );
        if (response.code === 0) {
            message.success(t('resources.devSpace.tips.changeRoleSuccess'));
        }
    }

    useEffect(() => {
        queryDetail();
    }, []);

    async function queryDetail() {
        const response = await HTTP.get(
            'dev_space/detail',
            { cluster_user_id: id },
            { is_v2: true }
        );
        try {
            let { cooper_user, viewer_user } = response.data[0];
            const { owner } = response.data[0];
            cooper_user = cooper_user.map((item: any) => {
                return {
                    ...item,
                    shareType: 'Cooperator',
                };
            });
            viewer_user = viewer_user.map((item: any) => {
                return {
                    ...item,
                    shareType: 'Viewer',
                };
            });
            const tmpList = cooper_user.concat(viewer_user);
            setSpaceOwner(owner);
            setUserList(tmpList);
            setFilterList(tmpList);
            setNewRecord({
                ...record,
                ...response.data[0],
            });
        } catch (e) {}
    }

    const handleSearch = (value: string) => {
        const tmpList = userList.filter(
            (item: { name: string }) => item.name.toLowerCase().indexOf(value) > -1
        );
        setFilterList(tmpList);
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
                users: deleteId ? [deleteId] : selectedList,
            },
            {
                is_v2: true,
            }
        );
        if (response.code === 0) {
            queryDetail();
            setDeleteModalShow(false);
            message.success(t('resources.devSpace.tips.unShareSuccess'));
        }
    };

    const handleSubmit = () => {
        queryDetail();
        setShowModal(false);
    };

    return (
        <>
            <DeleteModal
                onCancel={() => setDeleteModalShow(false)}
                onConfirm={handleCancelShare}
                visible={deleteModalShow}
                title={t('resources.devSpace.cancelShareO.cancelTitle')}
                message={t('resources.devSpace.cancelShareO.cancelInfo')}
            ></DeleteModal>
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
                        {space_type === 'IsolateSpace' ? (
                            <PanelWrap>
                                <DevspaceForm
                                    record={newRecord}
                                    isEdit={true}
                                    onCancel={handleCancel}
                                />
                            </PanelWrap>
                        ) : (
                            <MeshSpace isEdit={true} record={newRecord} />
                        )}
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={<ShareUserTitle count={userList.length} />} key="2">
                        <ContentHeader>
                            <TableSearchInput
                                placeholder={t('resources.devSpace.tips.searchPlaceholder')}
                                onConfirm={handleSearch}
                            />
                            <FlexBox>
                                {selectedList.length > 0 && (
                                    <Button
                                        style={{
                                            display: 'flex',
                                            justifyItems: 'center',
                                            alignItems: 'center',
                                            marginRight: 12,
                                        }}
                                        icon={
                                            <IconDelPerson
                                                style={{ color: '#ffffff', marginRight: 8 }}
                                            />
                                        }
                                        onClick={() => setDeleteModalShow(true)}
                                    >
                                        {t('resources.devSpace.cancelShare')}
                                    </Button>
                                )}
                                <Button
                                    style={{
                                        display: 'flex',
                                        justifyItems: 'center',
                                        alignItems: 'center',
                                    }}
                                    icon={
                                        <IconAddPerson
                                            className="add-btn"
                                            style={{ marginRight: 8 }}
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
                            dataSource={filterList}
                            rowKey={(record) => record.id}
                            pagination={{
                                position: ['bottomCenter'],
                            }}
                        ></Table>
                    </Tabs.TabPane>
                </Tabs>
            </ContentWrap>
            {showAddModal && (
                <Dialog
                    visible={showAddModal}
                    title={t('resources.devSpace.addShare')}
                    width={680}
                    onCancel={() => setShowModal(false)}
                >
                    <AddShare
                        owner={spaceOwner}
                        cluster_user_id={id}
                        shared={userList}
                        onCancel={() => setShowModal(false)}
                        onSubmit={handleSubmit}
                    />
                </Dialog>
            )}
        </>
    );
};

export default DevspaceOperation;
