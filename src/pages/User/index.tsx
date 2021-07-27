import React from 'react';
import { useEffect, useState } from 'react';
import SummaryCard from '../../components/SummaryCard';
import HTTP from '../../api/fetch';
import { TableBox, TableHeader, TableWrap } from './styled-components';
import TableSearchInput from '../../components/TableSearchInput';
import { Table } from 'antd';
import { columns } from './columns';
// const tableHeader = ['用户名称', '用户类型', '状态', '开发空间数量', '操作', ''];

function User() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getUser = async () => {
            const result = await HTTP.get('users', {
                filter: {},
                range: [0, 9],
                sort: ['id', 'ASC'],
            });
            setData(result.data);
        };
        getUser();
    }, []);
    const showTotal = (total: number) => {
        return `共${total}条`;
    };
    return (
        <div>
            <SummaryCard title="User"></SummaryCard>
            <TableBox>
                <TableHeader>
                    <TableSearchInput></TableSearchInput>
                </TableHeader>
                <TableWrap>
                    <Table
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
