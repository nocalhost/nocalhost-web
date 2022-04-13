import React, { useCallback, useState } from 'react';
import { Button, Modal } from 'antd';
import { Table } from 'antd/es';
import { ColumnsType } from 'antd/es/table/interface';
import { useHistory } from 'react-router-dom';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import { ReactComponent as IconSuccess } from './asset/success.svg';
import { ReactComponent as IconFail } from './asset/fail.svg';
import { ReactComponent as IconBigSuccess } from '../../../images/icon/icon_success.svg';
import UploadProgress, { Buttons, FileSelect } from './upload';
import { getUserImportContext } from './util';

const getColumns = (t: TFunction) => {
    const columns: ColumnsType<any> = [
        {
            title: t('resources.users.fields.email'),
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: t('resources.users.fields.name'),
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Cooperator DevSpace',
            dataIndex: 'cooperatorDevSpace',
            key: 'cooperatorDevSpace',
        },
        {
            title: 'Viewer DevSpace',
            key: 'viewerDevSpace',
            dataIndex: 'viewerDevSpace',
        },
        {
            title: t('resources.users.fields.reason'),
            key: 'errInfo',
            dataIndex: 'errInfo',
            fixed: 'right',
        },
    ];

    return columns;
};

function Success(props: { text: string; onClick: () => void }) {
    const { t } = useTranslation();

    const {
        state: { result },
    } = getUserImportContext();
    return (
        <div className="success">
            <IconBigSuccess />
            <strong>{t('common.import.result.successfully')}</strong>
            <p>
                {props.text}
                {result.length}
            </p>
            <Button type="primary" onClick={props.onClick}>
                {t('common.import.btn.completion')}
            </Button>
        </div>
    );
}

function getTips(t: TFunction, onDownload: () => void) {
    const tips = t('common.import.result.tips');

    let text = tips.match(/\[(.+?)\]/g)![0];
    text = text.substr(1, text.length - 2);

    const nodes = tips.split(`[${text}]`);

    return (
        <p>
            {nodes[0]}
            <a onClick={onDownload}>{text}</a>
            {nodes[1]}
        </p>
    );
}

function Fail() {
    const [reImport, setReImport] = useState(false);

    const { t } = useTranslation();
    const [currentFile, setCurrentFile] = useState<File>();

    const onCancel = useCallback(() => {
        setReImport(false);
    }, []);

    const {
        state: { result },
    } = getUserImportContext();

    const onDownload = useCallback(() => {
        import('xlsx').then((xlsx) => {
            const wb = xlsx.utils.book_new();

            const ws = xlsx.utils.aoa_to_sheet([
                ['请不要修改文件格式！'],
                [
                    t('resources.users.fields.email'),
                    t('resources.users.fields.name'),
                    'Cooperator DevSpace',
                    'Viewer DevSpace',
                ],
                ...result
                    .filter((item) => !item.success)
                    .map((item) => {
                        return [
                            item.email,
                            item.username,
                            item.cooperatorDevSpace,
                            item.viewerDevSpace,
                        ];
                    }),
            ]);

            ws['!merges'] = [xlsx.utils.decode_range('A1:D1')];

            wb.SheetNames.push('sheet1');
            wb.Sheets['sheet1'] = ws;

            xlsx.writeFile(wb, '导入失败用户.xlsx');
        });
    }, [result]);

    return (
        <div style={{ position: 'relative' }}>
            <Modal
                width="50vw"
                title={t('common.import.btn.reimport')}
                visible={reImport}
                footer={null}
                onCancel={onCancel}
            >
                <FileSelect onChange={setCurrentFile} />
                <Buttons file={currentFile} onImport={onCancel} onCancel={onCancel} />
            </Modal>

            <div className="info">
                <div>
                    <IconSuccess />
                    {t('common.import.result.successfully')}{' '}
                    {result.filter((item) => item.success).length}
                </div>
                <div>
                    <IconFail />
                    {t('common.import.result.failure')}
                    {result.filter((item) => !item.success).length}
                </div>
            </div>
            <div className="table-info">
                <div>
                    {getTips(t, onDownload)}
                    <Button type="primary" onClick={() => setReImport(true)}>
                        {t('common.import.btn.reimport')}
                    </Button>
                </div>
                <Table
                    style={{ marginTop: 14 }}
                    pagination={false}
                    rowKey="email"
                    columns={getColumns(t)}
                    dataSource={result.filter((item) => !item.success)}
                />
            </div>
            <UploadProgress />
        </div>
    );
}

export default function Result() {
    const history = useHistory();
    const { t } = useTranslation();

    const {
        state: { result },
        config: {
            complete: { link, text },
        },
    } = getUserImportContext();
    return (
        <div>
            <b style={{ padding: '16px 0', fontSize: 16, display: 'block' }}>
                {t('common.import.result.title')}
            </b>
            {(result.every((item) => item.success) && (
                <Success onClick={() => history.push(link)} text={text} />
            )) || <Fail />}
        </div>
    );
}
