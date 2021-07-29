import React, { useEffect, useState, Fragment } from 'react';
import SummaryCard from '../../components/SummaryCard';
import HTTP from '../../api/fetch';
import { TableBox, TableHeader, TableWrap, PopItem, Filter } from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import { Table, Button, Popover } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Dialog from '../../components/Dialog';
import CreateUserForm from './CreateUserForm';
import { Dot } from './style-components';
import { EllipsisOutlined } from '@ant-design/icons';
import DeleteModal from '../../components/DeleteModal';
import LabelSelect from '../../components/LabelSelect';
import { userOptions } from './const';

// const tableHeader = ['用户名称', '用户类型', '状态', '开发空间数量', '操作', ''];
function User() {
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [popVisibleIndex, setPopVisibleIndex] = useState(-1);
    // const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        const getUser = async () => {
            const result = await HTTP.get('users', {
                filter: {},
                range: [0, 9],
                sort: ['id', 'ASC'],
            });
            setData(result.data || []);
        };
        getUser();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
    };
    const handleSelectChange = (v: any) => {
        console.log(v);
    };
    const columns = [
        {
            title: '用户名称',
            dataIndex: 'name',
            key: '1',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return <div>{record.name}</div>;
            },
        },
        {
            title: '用户类型',
            dataIndex: 'is_admin',
            key: '2',
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
            title: '状态',
            dataIndex: 'status',
            key: '3',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return (
                    <div>
                        <Dot isActive={record.status === 1}></Dot>
                        <span>{record.status === 1 ? '已激活' : '未激活'}</span>
                    </div>
                );
            },
        },
        {
            title: '开发空间数量',
            key: '4',
            dataIndex: 'cluster_count',
        },
        {
            title: '操作',
            key: '5',
            width: 80,
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const index = args[2];
                const record = args[1];
                return (
                    <div>
                        <Popover
                            trigger="click"
                            placement="bottom"
                            visible={index === popVisibleIndex}
                            onVisibleChange={(v) => setPopVisibleIndex(v ? index : -1)}
                            content={
                                <Fragment>
                                    <DeleteModal
                                        onCancel={() => setDeleteModalShow(false)}
                                        visible={deleteModalShow}
                                        message={`你确认要删除该用户 ${record.name} 吗？`}
                                    ></DeleteModal>
                                    <PopItem
                                        onClick={() => {
                                            setDeleteModalShow(true);
                                            setPopVisibleIndex(-1);
                                        }}
                                    >
                                        删除
                                    </PopItem>
                                </Fragment>
                            }
                        >
                            <EllipsisOutlined></EllipsisOutlined>
                        </Popover>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            <Dialog
                visible={openDialog}
                title="添加用户"
                width={680}
                onCancel={() => setOpenDialog(false)}
            >
                <CreateUserForm onCancel={() => setOpenDialog(false)}></CreateUserForm>
            </Dialog>
            <SummaryCard title="User"></SummaryCard>
            <TableBox>
                <TableHeader>
                    <Filter>
                        <TableSearchInput></TableSearchInput>
                        <LabelSelect
                            label="用户类型"
                            option={userOptions}
                            onChange={handleSelectChange}
                        ></LabelSelect>
                    </Filter>

                    <Button
                        type="primary"
                        onClick={() => setOpenDialog(true)}
                        icon={<PlusOutlined style={{ color: '#fff' }} />}
                    >
                        添加用户
                    </Button>
                </TableHeader>
                <TableWrap>
                    <Table
                        scroll={{ x: '100%' }}
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

export default User;
