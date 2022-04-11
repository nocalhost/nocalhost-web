import React, { PropsWithChildren, useEffect, useState } from 'react';
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
import Container, { ImportContext, ImportStateType, useImportContext } from './util';

export function ImportBox(props: PropsWithChildren<any>) {
    const {
        state: { taskId },
        setState,
        config: {
            template: { link, name },
            complete: { link: cancelLink },
        },
    } = useImportContext();

    const history = useHistory();

    const [currentFile, setCurrentFile] = useState<File>();

    useEffect(() => {
        if (taskId == 1) {
            setTimeout(() => {
                setState({
                    taskId: undefined,
                    result: 1,
                    file: undefined,
                });
            }, 3_000);
        }
    }, [taskId]);
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
                    <strong>1. 下载导入模版</strong>
                    <p style={{ color: '#79879C' }}>请根据提示信息完善模版文件内容</p>
                    <Button icon={<DownloadOutlined />} href={link} download={name}>
                        下载模版文件
                    </Button>
                </div>
                <div className="block" style={{ marginTop: 16, marginBottom: 24 }}>
                    <strong>2.上传文件</strong>
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

    const [state, setState] = useState<ImportStateType>({});

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
                                    text: '成功导入用户 28 个',
                                },
                            },
                        }}
                    >
                        {(state.result && <Result />) || (
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
