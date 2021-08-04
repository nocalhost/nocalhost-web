import React, { useEffect, useState } from 'react';
import HTTP from '../../api/fetch';
import { Breadcrumb, Button, Table } from 'antd';
import { TableBox, TableHeader, TableWrap, Flex, Amount } from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import { useParams, Link } from 'react-router-dom';
import Dialog from '../../components/Dialog';
import AuthorizeTree from './AuthorizeTree';
import { useTranslation } from 'react-i18next';

function ApplicationAuthorize() {
    // /v1/application/7/users
    const [data, setData] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const urlParams = useParams<{ id: string }>();
    const [openDialog, setOpenDialog] = useState(false);
    const [filterValue, setFilterValue] = useState('');
    const { t } = useTranslation();
    const getApplicationUser = async () => {
        const result = await HTTP.get(`/application/${urlParams.id}/users`);
        setData(result.data || []);
    };
    const handleDeleteUser = async () => {
        try {
            await HTTP.delete(`/application/${urlParams.id}/users`, {
                users: selectList.map((item: { id: number }) => item.id),
            });
            getApplicationUser();
        } catch (error) {}
    };
    useEffect(() => {
        getApplicationUser();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
    };
    const columns = [
        {
            title: t('resources.users.fields.name'),
            dataIndex: 'name',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return <div>{record.name}</div>;
            },
        },
        {
            title: t('resources.users.fields.userType'),
            dataIndex: 'is_admin',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return (
                    <div>
                        <span>
                            {record.is_admin === 1
                                ? t('resources.users.userType.admin')
                                : t('resources.users.userType.user')}
                        </span>
                    </div>
                );
            },
        },
        {
            title: t('resources.users.fields.email'),
            dataIndex: 'email',
        },
        {
            title: t('common.operation'),
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                console.log(record);
                return <div>123</div>;
            },
        },
    ];
    const filterInputConfirm = (value: string) => {
        setFilterValue(value);
        console.log(filterValue);
    };
    const rowSelection = {
        onChange: (...args: any) => {
            const selectedRows = args[1];
            setSelectList(selectedRows);
        },
    };
    return (
        <div>
            {openDialog && (
                <Dialog
                    visible={openDialog}
                    title={t('resources.application.bt.addAuth')}
                    width={680}
                    onCancel={() => setOpenDialog(false)}
                >
                    <AuthorizeTree
                        onCancel={() => setOpenDialog(false)}
                        onOk={getApplicationUser}
                    ></AuthorizeTree>
                </Dialog>
            )}

            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to="/dashboard/application">{t('resources.application.name')}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{t('resources.application.bt.auth')}</Breadcrumb.Item>
            </Breadcrumb>
            <TableBox>
                <TableHeader>
                    <Flex>
                        <TableSearchInput
                            onConfirm={filterInputConfirm}
                            placeholder={t('resources.users.form.placeholder.name')}
                        ></TableSearchInput>
                        <Amount>
                            Coding-Repos ·&nbsp;
                            {t('resources.application.auth.amount', { amount: data.length })}
                        </Amount>
                    </Flex>

                    <Flex>
                        {selectList.length > 0 && (
                            <Button onClick={handleDeleteUser}>
                                {t('resources.application.bt.deleteAuth')}
                            </Button>
                        )}
                        <div style={{ marginLeft: '12px' }}>
                            <Button type="primary" onClick={() => setOpenDialog(true)}>
                                {t('resources.application.bt.addAuth')}
                            </Button>
                        </div>
                    </Flex>
                </TableHeader>
                <TableWrap>
                    <Table
                        rowSelection={rowSelection}
                        scroll={{ x: '100%' }}
                        tableLayout="auto"
                        pagination={{
                            position: ['bottomCenter'],
                            showTotal: showTotal,
                        }}
                        dataSource={data.map((item: any) => {
                            item.key = item.id;
                            return item;
                        })}
                        columns={columns}
                    />
                </TableWrap>
            </TableBox>
        </div>
    );
}

export default ApplicationAuthorize;
