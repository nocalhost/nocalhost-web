import React, { useState, useEffect } from 'react';
import HTTP from '../../../api/fetch';
import TableSearchInput from '../../../components/TableSearchInput';
import { Content, Box, Amount, TreeList, Footer, ButtonBox } from './style-components';
import { useParams } from 'react-router-dom';
import { notUsersType } from '../const';
import CheckItem from '../CheckItem';
import SelectedItem from '../SelectedItem';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
interface AuthorizeTreePropsType {
    onCancel(): void;
    onOk(): void;
}

function AuthorizeTree(props: AuthorizeTreePropsType) {
    const [data, setData] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const urlParams = useParams<{ id: string }>();
    const [filterValue, setFilterValue] = useState('');
    const { t } = useTranslation();
    useEffect(() => {
        const getApplicationUser = async () => {
            const result = await HTTP.get(`/application/${urlParams.id}/!users`, {
                filter: {},
                range: [0, 9],
                sort: ['id', 'ASC'],
            });
            setData(result.data || []);
        };
        getApplicationUser();
    }, []);
    // eslint-disable-next-line no-undef
    const handleSetSelectData = (selectData: never[]) => {
        setSelectData(selectData);
    };
    const filterInputConfirm = (value: string) => {
        setFilterValue(value);
        console.log(filterValue);
    };
    const addUser = async () => {
        try {
            await HTTP.post(`/application/${urlParams.id}/users`, {
                users: selectData.map((item: notUsersType) => item.id),
            });
            props.onOk();
            props.onCancel();
        } catch (error) {}
    };
    return (
        <>
            <Content>
                <Box>
                    <TableSearchInput
                        onConfirm={filterInputConfirm}
                        placeholder={t('resources.users.form.placeholder.name')}
                    ></TableSearchInput>
                    <Amount>
                        {t('resources.application.auth.notAuth')} {data.length}
                    </Amount>
                    <TreeList height={300}>
                        {data.map((item: notUsersType) => {
                            return (
                                <CheckItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    selectData={selectData}
                                    setSelectData={handleSetSelectData}
                                ></CheckItem>
                            );
                        })}
                    </TreeList>
                </Box>
                <Box>
                    <Amount>
                        {t('resources.application.auth.select', { select: selectData.length })}
                    </Amount>
                    <TreeList height={332}>
                        {selectData.map((item: notUsersType) => {
                            return (
                                <SelectedItem
                                    key={item.id}
                                    id={item.id}
                                    name={item.name}
                                    selectData={selectData}
                                    setSelectData={handleSetSelectData}
                                ></SelectedItem>
                            );
                        })}
                    </TreeList>
                </Box>
            </Content>
            <Footer>
                <ButtonBox>
                    <Button onClick={() => props.onCancel()}>{t('common.bt.cancel')}</Button>
                </ButtonBox>
                <ButtonBox>
                    <Button type="primary" onClick={addUser}>
                        {t('common.bt.submit')}
                    </Button>
                </ButtonBox>
            </Footer>
        </>
    );
}

export default AuthorizeTree;
