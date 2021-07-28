import React, { useEffect, useState } from 'react';
import SummaryCard from '../../components/SummaryCard';
import { Table, Button, Popover } from 'antd';
import HTTP from '../../api/fetch';
import { PlusOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import Dialog from '../../components/Dialog';
import { TableBox, TableHeader, TableWrap, PopItem } from './style-components';
import TableSearchInput from '../../components/TableSearchInput';
import moment from 'moment';

function Application() {
    const [data, setData] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    // const [openDialog, setOpenDialog] = useState(false);
    useEffect(() => {
        const getApplication = async () => {
            const result = await HTTP.get('application', {
                filter: {},
                range: [0, 9],
                sort: ['id', 'ASC'],
            });
            setData(result.data || []);
        };
        getApplication();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
    };
    const columns = [
        {
            title: '应用名称',
            dataIndex: 'name',
            key: '1',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                const object = JSON.parse(record?.context);
                return <div>{object.application_name}</div>;
            },
        },
        {
            title: 'Kubernetes Manifest 安装来源',
            dataIndex: 'name',
            key: '2',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                const object = JSON.parse(record?.context);
                return <span>{object.source}</span>;
            },
        },
        {
            title: 'Manifest 类型',
            dataIndex: 'name',
            key: '3',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                const object = JSON.parse(record?.context);
                return <span>{object.install_type}</span>;
            },
        },
        {
            title: '创建时间',
            key: '4',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return moment(record.created_at).format('YYYY-MM-DD hh:mm:ss');
            },
        },
        {
            title: '操作',
            // eslint-disable-next-line react/display-name
            render: (...args: any) => {
                const record = args[1];
                return (
                    <div>
                        <Popover
                            trigger="click"
                            placement="bottom"
                            content={
                                <PopItem
                                    onClick={() => {
                                        const filterData = data.filter(
                                            (item: { id: string }) => item.id !== record.id
                                        );
                                        setData(filterData);
                                    }}
                                >
                                    删除
                                </PopItem>
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
                title="添加应用"
                width={680}
                onCancel={() => setOpenDialog(false)}
            ></Dialog>
            <SummaryCard title="Application"></SummaryCard>
            <TableBox>
                <TableHeader>
                    <TableSearchInput></TableSearchInput>
                    <Button
                        type="primary"
                        onClick={() => setOpenDialog(true)}
                        icon={<PlusOutlined style={{ color: '#fff' }} />}
                    >
                        添加应用
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

export default Application;
