import React, { useEffect, useState } from 'react';
import HTTP from '../../api/fetch';
import { Breadcrumb, Button, Table } from 'antd';
import { TableBox, TableHeader, TableWrap, Flex, Amount } from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import { useHistory, useParams } from 'react-router-dom';
function ApplicationAuthorize() {
    // /v1/application/7/users
    const [data, setData] = useState([]);
    const [selectList, setSelectList] = useState([]);
    const history = useHistory();
    const urlParams = useParams();
    console.log(urlParams);
    useEffect(() => {
        const getApplicationUser = async () => {
            const result = await HTTP.get('users', {
                filter: {},
                range: [0, 9],
                sort: ['id', 'ASC'],
            });
            setData(result.data || []);
        };
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
            <Breadcrumb>
                <Breadcrumb.Item>应用</Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">授权管理</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <TableBox>
                <TableHeader>
                    <Flex>
                        <TableSearchInput></TableSearchInput>
                        <Amount>Coding-Repos · 已授权 123 人</Amount>
                    </Flex>

                    <Flex>
                        {selectList.length > 0 && (
                            <Button
                                onClick={() => history.push(`/dashboard/application/notauthorize`)}
                            >
                                取消授权
                            </Button>
                        )}
                        <div style={{ marginLeft: '12px' }}>
                            <Button
                                type="primary"
                                onClick={() => history.push(`/dashboard/application/notauthorize`)}
                            >
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
