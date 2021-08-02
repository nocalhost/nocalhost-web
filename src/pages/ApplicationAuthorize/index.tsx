import React, { useEffect, useState } from 'react';
import HTTP from '../../api/fetch';
import { Breadcrumb, Button, Table } from 'antd';
import { TableBox, TableHeader, TableWrap, Flex, Amount } from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import { useParams, Link } from 'react-router-dom';
import Dialog from '../../components/Dialog';
import AuthorizeTree from './AuthorizeTree';
function ApplicationAuthorize() {
    // /v1/application/7/users
    const [data, setData] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const urlParams = useParams<{ id: string }>();
    const [openDialog, setOpenDialog] = useState(false);
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
            title: '用户名称',
            dataIndex: 'name',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return <div>{record.name}</div>;
            },
        },
        {
            title: '用户类型',
            dataIndex: 'is_admin',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return (
                    <div>
                        <span>{record.is_admin === 1 ? '管理员' : '普通用户'}</span>
                    </div>
                );
            },
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                console.log(record);
                return <div>123</div>;
            },
        },
    ];
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
                    title="添加授权"
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
                    <Link to="/dashboard/application">应用</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>授权管理</Breadcrumb.Item>
            </Breadcrumb>
            <TableBox>
                <TableHeader>
                    <Flex>
                        <TableSearchInput></TableSearchInput>
                        <Amount>Coding-Repos · 已授权{data.length}人</Amount>
                    </Flex>

                    <Flex>
                        {selectList.length > 0 && (
                            <Button onClick={handleDeleteUser}>取消授权</Button>
                        )}
                        <div style={{ marginLeft: '12px' }}>
                            <Button type="primary" onClick={() => setOpenDialog(true)}>
                                添加授权
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
