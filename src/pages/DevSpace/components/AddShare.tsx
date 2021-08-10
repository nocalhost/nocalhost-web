import React, { useEffect, useState } from 'react';
import { Modal, Checkbox, Row, message } from 'antd';
import { useTranslation } from 'react-i18next';

import TableSearchInput from '../../../components/TableSearchInput';
import styled from 'styled-components';
import { queryAllUser } from '../../../services';
import Icon from '@ant-design/icons';
import HTTP from '../../../api/fetch';

import { ReactComponent as IconProfile } from '../../../images/icon/profile_boy.svg';

import ShareType from './ShareType';

const ContentWrap = styled.div`
    height: 400px;
    display: flex;
    background: rgb(255, 255, 255);
    border-radius: 4px;
    border: 1px solid rgb(218, 225, 232);
`;

const ContentPanel = styled.div`
    flex-basis: 50%;
    padding: 12px;
    height: 100%;

    &:nth-child(1) {
        border-right: 1px solid #dae1e8;
    }
`;

const ListItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
`;

const TitleBox = styled.div`
    padding: 12px 0;
    font-size: 14px;
    color: #79879c;
`;

interface UserInfoItem {
    user_id: string;
    user_name: string;
    shareType?: string;
}

const AddShare = ({
    cluster_user_id,
    onCancel,
    onSubmit,
}: {
    cluster_user_id: any;
    shareUseList: any;
    onCancel: () => void;
    onSubmit: () => void;
}) => {
    const { t } = useTranslation();
    const [userList, setUsersList] = useState<UserInfoItem[]>([]);
    const [selectedUserList, setSelectedUserList] = useState<UserInfoItem[]>([]);
    const [shareList, setShareList] = useState<UserInfoItem[]>([]);

    useEffect(() => {
        queryUserList();
    }, []);

    async function queryUserList() {
        const response = await queryAllUser();
        const list = Array.from(response).map((item: any) => {
            return {
                user_id: item[0],
                user_name: item[1],
            };
        });
        setUsersList(list);
    }

    const handleSearch = () => {
        console.log('search');
    };

    const handleSelect = (checkedValues: any) => {
        console.log(checkedValues);
        const tmpList = userList.filter((item: any) => checkedValues.includes(item.user_id));
        setSelectedUserList(tmpList);
        setShareList(
            tmpList.map((item) => {
                return {
                    ...item,
                    shareType: 'Cooperator',
                };
            })
        );
    };

    const handleShareChange = (value: string, user_id: any) => {
        //share change
        const tmpList = selectedUserList.map((item) => {
            return {
                ...item,
                shareType: item.user_id === user_id ? value : item.shareType,
            };
        });
        setShareList(tmpList);
        console.log('handleShareChange: ', value, user_id);
    };

    const handleAddShare = async () => {
        const response = await HTTP.post(
            'dev_space/share',
            {
                cluster_user_id,
                Cooperators: shareList
                    .filter((item) => item.shareType === 'Cooperator')
                    .map((item) => item.user_id),
                viewers: shareList
                    .filter((item) => item.shareType === 'Viewer')
                    .map((item) => item.user_id),
            },
            { is_v2: true }
        );
        if (response.code === 0) {
            message.success(t('resources.devSpace.tips.addShareSuccess'));
            onSubmit();
        }
        console.log(response);
    };

    return (
        <>
            <Modal
                width={680}
                title={t('resources.devSpace.addShare')}
                visible={true}
                onCancel={onCancel}
                onOk={handleAddShare}
            >
                <ContentWrap>
                    <ContentPanel>
                        <TableSearchInput
                            placeholder={t('resources.devSpace.tips.searchPlaceholder')}
                            onConfirm={handleSearch}
                        />
                        <TitleBox>
                            {t('resources.devSpace.tips.unShareUsers')}
                            <span>{userList.length}</span>
                        </TitleBox>
                        <Checkbox.Group onChange={handleSelect}>
                            {userList.map((item: any) => {
                                return (
                                    <Row key={item.user_id}>
                                        <Checkbox value={item.user_id}>
                                            <Icon
                                                component={IconProfile}
                                                style={{ fontSize: 20, marginRight: 8 }}
                                            />
                                            {item.user_name}
                                        </Checkbox>
                                    </Row>
                                );
                            })}
                        </Checkbox.Group>
                    </ContentPanel>
                    <ContentPanel>
                        <ul>
                            {selectedUserList.map((item) => {
                                return (
                                    <ListItem key={item.user_id}>
                                        <Icon
                                            component={IconProfile}
                                            style={{ fontSize: 20, marginRight: 8 }}
                                        />
                                        {item.user_name}
                                        <ShareType
                                            user_id={item.user_id}
                                            onChange={handleShareChange}
                                        />
                                    </ListItem>
                                );
                            })}
                        </ul>
                    </ContentPanel>
                </ContentWrap>
            </Modal>
        </>
    );
};

export default AddShare;
