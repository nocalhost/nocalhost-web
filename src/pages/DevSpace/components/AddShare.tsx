import React, { useEffect, useState } from 'react';
import { Checkbox, Row, message, Button } from 'antd';
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
    display: flex;
    flex-direction: column;

    &:nth-child(1) {
        border-right: 1px solid #dae1e8;
    }
`;

const UserList = styled.div`
    flex: 1;
    overflow: scroll;
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

const SelectedTitle = styled.div`
    color: rgb(121, 135, 156);
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: normal;
`;

const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const ButtonBox = styled.div`
    margin-left: 12px;
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
    shared,
}: {
    cluster_user_id: any;
    shared: any;
    onCancel: () => void;
    onSubmit: () => void;
}) => {
    const { t } = useTranslation();
    const [userList, setUsersList] = useState<UserInfoItem[]>([]);
    const [filterList, setFilterList] = useState<UserInfoItem[]>([]);
    const [selectedUserList, setSelectedUserList] = useState<UserInfoItem[]>([]);
    const [shareList, setShareList] = useState<UserInfoItem[]>([]);

    useEffect(() => {
        queryUserList();
    }, []);

    async function queryUserList() {
        const response = await queryAllUser();
        let list = Array.from(response).map((item: any) => {
            return {
                user_id: item[0],
                user_name: item[1],
            };
        });
        const sharedUserIdArr = shared.map((item: any) => item.id);
        list = list.filter((item) => !sharedUserIdArr.includes(item.user_id));
        setUsersList(list);
        setFilterList(list);
    }

    const handleSearch = (value: string) => {
        const tmpList = userList.filter(
            (item) => item.user_name.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
        setFilterList(tmpList);
    };

    const handleSelect = (checkedValues: any) => {
        const tmpList = filterList.filter((item: any) => checkedValues.includes(item.user_id));
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
        const tmpList = shareList.map((item) => {
            return {
                ...item,
                shareType: item.user_id === user_id ? value : item.shareType,
            };
        });
        setShareList(tmpList);
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
    };

    return (
        <>
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
                    <UserList>
                        <Checkbox.Group onChange={handleSelect}>
                            {filterList.map((item: any) => {
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
                    </UserList>
                </ContentPanel>
                <ContentPanel style={{ overflow: 'scroll' }}>
                    <SelectedTitle>
                        {t('resources.devSpace.tips.selected', {
                            count: selectedUserList.length,
                        })}
                    </SelectedTitle>
                    <ul>
                        {selectedUserList.map((item) => {
                            return (
                                <ListItem key={item.user_id}>
                                    <div
                                        style={{
                                            minWidth: 108,
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Icon
                                            component={IconProfile}
                                            style={{ fontSize: 20, marginRight: 8 }}
                                        />
                                        {item.user_name}
                                    </div>

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
            <Footer>
                <ButtonBox>
                    <Button onClick={() => onCancel()}>{t('common.bt.cancel')}</Button>
                </ButtonBox>
                <ButtonBox>
                    <Button type="primary" onClick={handleAddShare}>
                        {t('common.bt.submit')}
                    </Button>
                </ButtonBox>
            </Footer>
        </>
    );
};

export default AddShare;
