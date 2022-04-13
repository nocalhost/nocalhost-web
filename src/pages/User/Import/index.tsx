import React, { PropsWithChildren, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import { ReactComponent as selectIcon } from './asset/file.svg';
import { ReactComponent as defaultIcon } from './asset/file.0.svg';
import BreadCard from '../../../components/BreadCard';
import xlsx from './asset/user.xlsx';
import UploadProgress, { Buttons, FileSelect } from './upload';
import Result from './result';
import Container, { getUserImportContext, UserImportContext, UserItem } from './util';
import { ImportStateType } from './types';
import HTTP from '../../../api/fetch';

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

export default function ImportUser() {
    const { t } = useTranslation();

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
            State: 'importing' | 'finished' | 'success';
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
                    <UserImportContext.Provider
                        value={{
                            state,
                            setState: (state) => {
                                setState((prevState) => {
                                    return { ...prevState, ...state };
                                });
                            },
                            config: {
                                template: {
                                    name: '用户导入模板.xlsx',
                                    link: xlsx,
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
                                getProcess,
                                onImport,
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
                    </UserImportContext.Provider>
                </div>
            </div>
        </Container>
    );
}
