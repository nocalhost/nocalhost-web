import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { TFunction } from 'i18next';

import { ReactComponent as selectIcon } from './asset/file.svg';
import { ReactComponent as defaultIcon } from './asset/file.0.svg';
import BreadCard from '../../../components/BreadCard';
import xlsx from './asset/user.xlsx';
import UploadProgress, { Buttons, FileSelect } from './upload';
import Result from './result';
import Container, { ImportContext, useImportUserContext } from './util';

export function ImportBox(props: { t: TFunction }) {
    const {
        setResult,
        taskId,
        setTaskId,
        setFile,
        template: { link, name },
    } = useImportUserContext();

    useEffect(() => {
        if (taskId > -1) {
            setTimeout(() => {
                setResult(1);
                setTaskId(-1);
            }, 3_000);
        }
    }, [taskId]);
    return (
        <>
            <b style={{ padding: '16px 0', fontSize: 16, display: 'block' }}>
                {props.t('resources.users.bt.import')}
            </b>
            <div
                style={{
                    position: 'relative',
                }}
            >
                <div className="block">
                    <strong>1. 下载导入模版</strong>
                    <p style={{ color: '#79879C' }}>请根据提示信息晚上模版文件内容</p>
                    <Button icon={<DownloadOutlined />} href={link} download={name}>
                        下载模版文件
                    </Button>
                </div>
                <div className="block" style={{ marginTop: 16, marginBottom: 24 }}>
                    <strong>2.上传文件</strong>
                    <FileSelect style={{ marginTop: 12 }} onChange={setFile} />
                </div>
                <UploadProgress />
            </div>
            <Buttons setTaskId={setTaskId} />
        </>
    );
}

export default function ImportUser() {
    const { t } = useTranslation();

    const [file, setFile] = useState<File>();
    const [result, setResult] = useState<number>(-1);
    const [taskId, setTaskId] = useState(-1);

    return (
        <Container>
            <BreadCard
                data={{
                    menu: t('resources.users.name'),
                    subMenu: t('resources.users.bt.import'),
                    route: '/dashboard/user',
                }}
            />
            <div className="import">
                <div className="container">
                    <ImportContext.Provider
                        value={{
                            file,
                            taskId,
                            setTaskId,
                            setFile,
                            setResult,
                            result,
                            template: {
                                name: '用户导入模板.xlsx',
                                link: xlsx,
                            },
                            icon: {
                                default: defaultIcon,
                                select: selectIcon,
                            },
                        }}
                    >
                        {(result > -1 && <Result />) || <ImportBox t={t} />}
                    </ImportContext.Provider>
                </div>
            </div>
        </Container>
    );
}
