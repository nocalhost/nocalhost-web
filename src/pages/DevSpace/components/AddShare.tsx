import React, { useEffect, useState } from 'react';
import { Modal, Checkbox, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import TableSearchInput from '../../../components/TableSearchInput';
import styled from 'styled-components';
import { queryAllUser } from '../../../services';

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

interface UserInfoItem {
    user_id: string;
    user_name: string;
}

const AddShare = ({ onCancel, shareUseList }: { shareUseList: any; onCancel: () => void }) => {
    const { t } = useTranslation();
    const [userList, setUsersList] = useState<UserInfoItem[]>([]);

    useEffect(() => {
        queryUserList();
    }, []);

    console.log(shareUseList);

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

    return (
        <>
            <Modal
                width={680}
                title={t('resources.devSpace.addShare')}
                visible={true}
                onCancel={onCancel}
            >
                <ContentWrap>
                    <ContentPanel>
                        <TableSearchInput
                            placeholder={t('resources.devSpace.tips.searchPlaceholder')}
                            onConfirm={handleSearch}
                        />
                        <Checkbox.Group>
                            {userList.map((item: any) => {
                                return (
                                    <Row key={item.user_id}>
                                        <Checkbox value={item.user_id}>{item.user_name}</Checkbox>
                                    </Row>
                                );
                            })}
                        </Checkbox.Group>
                    </ContentPanel>
                    <ContentPanel></ContentPanel>
                </ContentWrap>
            </Modal>
        </>
    );
};

export default AddShare;
