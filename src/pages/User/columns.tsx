import React from 'react';
import { SmileOutlined } from '@ant-design/icons';
/* eslint-disable react/display-name */
export const columns = [
    {
        title: '用户名称',
        dataIndex: 'name',
        key: '1',
        render: (...args: any) => {
            const record = args[1];
            return (
                <div>
                    <SmileOutlined />
                    {record.name}
                </div>
            );
        },
    },
    {
        title: '用户类型',
        dataIndex: 'is_admin',
        key: '2',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: '3',
    },
    {
        title: '开发空间数量',
        key: '4',
        dataIndex: 'cluster_count',
    },
    {
        title: '操作',
        key: '5',
        width: '40px',
        render: () => <span>123</span>,
    },
];
