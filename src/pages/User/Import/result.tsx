import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'antd';
import { Table } from 'antd/es';
import { ColumnsType } from 'antd/es/table/interface';
import { useHistory } from 'react-router-dom';

import { ReactComponent as IconSuccess } from './asset/success.svg';
import { ReactComponent as IconFail } from './asset/fail.svg';
import { ReactComponent as IconBigSuccess } from '../../../images/icon/icon_success.svg';
import UploadProgress, { Buttons, FileSelect } from './upload';
import { useImportContext } from './util';

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

function Success(props: { text: string; onClick: () => void }) {
    return (
        <div className="success">
            <IconBigSuccess />
            <strong>导入成功</strong>
            <p>{props.text}</p>
            <Button type="primary" onClick={props.onClick}>
                完成
            </Button>
        </div>
    );
}

function Fail() {
    const [reImport, setReImport] = useState(false);

    const { setFile, setTaskId } = useImportContext();

    const upload = useCallback((taskId: number) => {
        setReImport(false);
        setTaskId(taskId);
    }, []);
    return (
        <div style={{ position: 'relative' }}>
            <Modal
                width="50vw"
                visible={reImport}
                title="重新导入"
                footer={null}
                onCancel={() => setReImport(false)}
            >
                <FileSelect onChange={setFile} />
                <Buttons setTaskId={upload} onCancel={() => setReImport(false)} />
            </Modal>

            <div className="info">
                <div>
                    <IconSuccess />
                    导入成功 28 个
                </div>
                <div>
                    <IconFail />
                    导入失败 8 个
                </div>
            </div>
            <div className="table-info">
                <div>
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
            </div>
            <UploadProgress />
        </div>
    );
}

export default function Result() {
    const history = useHistory();

    const {
        result,
        config: {
            complete: { link, text },
        },
    } = useImportContext();
    return (
        <div>
            <b style={{ padding: '16px 0', fontSize: 16, display: 'block' }}>导入结果</b>
            {(result === 2 && <Success onClick={() => history.push(link)} text={text} />) || (
                <Fail />
            )}
        </div>
    );
}
