import React, { useState } from 'react';
import { TFunction } from 'i18next';
import styled from 'styled-components';
import { Button, Modal } from 'antd';
import { Table } from 'antd/es';

import { ReactComponent as Success } from './asset/success.svg';
import { ReactComponent as Fail } from './asset/fail.svg';
import { ColumnsType } from 'antd/es/table/interface';
import { FileSelect } from './upload';

const Info = styled.div`
    display: flex;
    height: 72px;
    align-items: center;
    background-color: #f7f8f9;
    border-radius: 4px;

    div {
        position: relative;
        flex: 1;
        display: flex;
        align-content: center;
        justify-content: center;

        &:first-child:before {
            position: absolute;
            content: ' ';
            top: -5px;
            height: 32px;
            right: 0;
            border: 1px solid #dae1e8;
        }
    }

    svg {
        margin-right: 6px;
    }
`;

const TableInfo = styled.div`
    margin: 16px 0;
    padding: 20px;
    border: 1px solid #dae1e8;
    box-sizing: border-box;
    border-radius: 4px;

    p {
        margin-bottom: 0;
    }
`;
const columns: ColumnsType<any> = [
    {
        title: '邮箱',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '用户名称',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Cooperator DevSpace',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Viewer DevSpace',
        key: 'tags',
        dataIndex: 'tags',
    },
    {
        title: '失败原因',
        key: 'action',
        fixed: 'right',
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake ParkSidney',
        tags: ['cool', 'teacher'],
    },
];
const Container = styled.div`
    .ant-table-thead {
        box-shadow: none;

        tr {
            th {
                background: #f7f8f9;
                color: #79879c;
            }
        }
    }
`;
export default function Result(props: { t: TFunction }) {
    const [reImport, setReImport] = useState(false);
    return (
        <Container>
            <Modal
                width="50vw"
                visible={reImport}
                title="重新导入"
                footer={null}
                onCancel={() => setReImport(false)}
            >
                <FileSelect
                    onCancel={() => setReImport(false)}
                    onImport={() => console.warn('')}
                    loading={false}
                />
            </Modal>
            <b style={{ padding: '16px 0', fontSize: 16, display: 'block' }}>
                {props.t('resources.users.bt.import')}
            </b>
            <Info>
                <div>
                    <Success />
                    导入成功 28 个
                </div>
                <div>
                    <Fail />
                    导入失败 8 个
                </div>
            </Info>
            <TableInfo>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <p>
                        以下为导入失败信息，可以
                        <a target="_blank" href="http://www.baidu.com">
                            下载导入失败用户列表
                        </a>
                        ，修改后重新导入
                    </p>
                    <Button type="primary" onClick={() => setReImport(true)}>
                        重新导入
                    </Button>
                </div>
                <Table
                    style={{ marginTop: 14 }}
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                />
            </TableInfo>
        </Container>
    );
}
