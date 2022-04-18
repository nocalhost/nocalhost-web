import React, { PropsWithChildren, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { Table } from 'antd/es';
import { TFunction } from 'i18next';
import { ColumnsType } from 'antd/es/table/interface';

import { ReactComponent as selectIcon } from './asset/file.svg';
import { ReactComponent as defaultIcon } from './asset/file.0.svg';
import BreadCard from '../../../components/BreadCard';
import userZh from './asset/user.xlsx';
import userEn from './asset/user.en.xlsx';
import UploadProgress, { Buttons, FileSelect } from './upload';
import Result from './result';
import Container, { getUserImportContext, ImportContext, UserItem } from './util';
import { ImportStateType } from './types';
import HTTP from '../../../api/fetch';
import { downloadBlob } from '../../../utils';

export function ImportBox(props: PropsWithChildren<any>) {
    const {
        config: {
            template: { link, name },
            complete: { link: cancelLink },
        },
    } = getUserImportContext();
    const { t } = useTranslation();
    const history = useHistory();

    const [currentFile, setCurrentFile] = useState<File>();

    return (
        <>
            {props.children}
            <div
                style={{
                    marginTop: 16,
                    position: 'relative',
                }}
            >
                <div className="block">
                    <strong>1. {t('common.import.download.title')}</strong>
                    <p style={{ color: '#79879C' }}>{t('common.import.download.tips')}</p>
                    <Button icon={<DownloadOutlined />} href={link} download={name}>
                        {t('common.import.download.template')}
                    </Button>
                </div>
                <div className="block" style={{ marginTop: 16, marginBottom: 24 }}>
                    <strong>2.{t('common.import.upload.title')}</strong>
                    <FileSelect style={{ marginTop: 12 }} onChange={setCurrentFile} />
                </div>
                <UploadProgress />
            </div>
            <Buttons onCancel={() => history.push(cancelLink)} file={currentFile} />
        </>
    );
}

const getColumns = (t: TFunction) => {
    const columns: ColumnsType<any> = [
        {
            title: t('resources.users.fields.email'),
            dataIndex: 'Email',
            key: 'Email',
        },
        {
            title: t('resources.users.fields.name'),
            dataIndex: 'Username',
            key: 'Username',
        },
        {
            title: 'Cooperator DevSpace',
            dataIndex: 'CooperatorDevSpace',
            key: 'CooperatorDevSpace',
            render(value: string) {
                return <p dangerouslySetInnerHTML={{ __html: value.replaceAll(',', '<br/>') }} />;
            },
        },
        {
            title: 'Viewer DevSpace',
            key: 'ViewerDevSpace',
            dataIndex: 'ViewerDevSpace',
        },
        {
            title: t('resources.users.fields.reason'),
            key: 'ErrInfo',
            dataIndex: 'ErrInfo',
            fixed: 'right',
            render(value: string) {
                return <p dangerouslySetInnerHTML={{ __html: value.replaceAll(',', '<br/>') }} />;
            },
        },
    ];

    return columns;
};

function FailList(props: { result: ImportStateType<UserItem>['result'] }) {
    const { t } = useTranslation();
    return (
        <Table
            style={{ marginTop: 14 }}
            pagination={false}
            rowKey="Email"
            columns={getColumns(t)}
            dataSource={props.result.filter((item) => !item.Success)}
        />
    );
}

export default function ImportUser() {
    const { t, i18n } = useTranslation();
    const userTemplate = i18n.language === 'en' ? userEn : userZh;

    const [state, setState] = useState<ImportStateType<UserItem>>({ result: [] });

    const onImport = useCallback((file: File) => {
        const fd = new FormData();
        fd.append('upload', file);

        return HTTP.fetch<{ taskId: string }>('users/import', fd).then((res) => {
            setState({ taskId: res.data!.taskId, file, result: [] });
        });
    }, []);

    const getProcess = useCallback(async () => {
        const {
            data: { Process, Items },
        } = await HTTP.get<{
            Process: number;
            Items: Array<UserItem>;
        }>(`users/import_status/${state.taskId}`, null, {
            config: { is_v2: true },
        });

        if (Process === 1) {
            setState({ file: undefined, taskId: undefined, result: Items ?? [] });
        }

        return Promise.resolve(Process * 100);
    }, [state.taskId]);

    const downloadList = useCallback(() => {
        import('exceljs')
            .then(async (ExcelJS) => {
                const buffer = await fetch(userTemplate).then((res) => res.arrayBuffer());

                let workbook = new ExcelJS.Workbook();
                workbook = await workbook.xlsx.load(buffer);

                const worksheet = workbook.getWorksheet(1);

                worksheet.eachRow((item, index) => {
                    if (index > 3) {
                        item.values = [];
                    }
                });

                state.result
                    .filter((item) => !item.Success)
                    .forEach((item, index) => {
                        worksheet.getRow(index + 3).values = [
                            item.Email,
                            item.Username,
                            item.CooperatorDevSpace.replaceAll(',', '\n'),
                            item.ViewerDevSpace.replaceAll(',', '\n'),
                        ];
                    });

                downloadBlob(new Blob([new Uint8Array(await workbook.xlsx.writeBuffer()).buffer]), {
                    fileName: `${t('resources.users.import.fail.file')}.xlsx`,
                });
            })
            .catch((err) => {
                console.error('download fail', err);
            });
    }, [state.result]);
    return (
        <Container>
            <BreadCard
                data={{
                    menu: t('resources.users.name'),
                    subMenu: t('resources.users.bt.import'),
                    route: '/dashboard/user',
                }}
            />
            <div className="import bg">
                <div className="container">
                    <ImportContext.Provider
                        value={{
                            state,
                            setState: (state) => {
                                setState((prevState) => {
                                    return { ...prevState, ...state };
                                });
                            },
                            config: {
                                template: {
                                    name: `${t('resources.users.import.template.file')}.xlsx`,
                                    link: userTemplate,
                                    suffix: ['xlsx', 'csv'],
                                    accept:
                                        'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                },
                                icon: {
                                    default: defaultIcon,
                                    select: selectIcon,
                                },
                                complete: {
                                    link: '/dashboard/user',
                                    text: `${t('resources.users.name')}${t(
                                        'common.import.result.successfully'
                                    )}`,
                                },
                                failList: <FailList result={state.result} />,
                                getProcess,
                                onImport,
                                downloadList,
                            },
                        }}
                    >
                        {(state.result.length && <Result />) || (
                            <ImportBox t={t}>
                                <b style={{ paddingTop: 16, fontSize: 16, display: 'block' }}>
                                    {t('resources.users.bt.import')}
                                </b>
                            </ImportBox>
                        )}
                    </ImportContext.Provider>
                </div>
            </div>
        </Container>
    );
}
