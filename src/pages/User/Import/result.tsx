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

    const [currentFile, setCurrentFile] = useState<File>();

    const onCancel = useCallback(() => {
        setReImport(false);
    }, []);

    const onDownload = useCallback(() => {
        import('xlsx').then((xlsx) => {
            const wb = xlsx.utils.book_new();

            const ws = xlsx.utils.aoa_to_sheet([
                ['请不要修改文件格式！'],
                ['邮箱', '用户名称', 'Cooperator DevSpace', 'Viewer  DevSpace'],
                ['zhangsan@126.com', 'zhangsan', 'zhangsan', 'zhangsan'],
            ]);

            ws['!merges'] = [xlsx.utils.decode_range('A1:D1')];

            wb.SheetNames.push('sheet1');
            wb.Sheets['sheet1'] = ws;

            xlsx.writeFile(wb, '导入失败用户.xlsx');
        });
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <Modal
                width="50vw"
                visible={reImport}
                title="重新导入"
                footer={null}
                onCancel={onCancel}
            >
                <FileSelect onChange={setCurrentFile} />
                <Buttons file={currentFile} onImport={onCancel} onCancel={onCancel} />
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
                        <a onClick={onDownload}>下载导入失败用户列表</a>
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
        state: { result },
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
