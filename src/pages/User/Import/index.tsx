import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { TFunction } from 'i18next';

import BreadCard from '../../../components/BreadCard';
import xlsx from './asset/user.xlsx';

import UploadBox, { FileSelect } from './upload';
import Result from './result';
import { download } from '../../../utils';

const Block = styled.div`
    padding: 20px;
    background: #f7f8f9;
    border-radius: 4px;

    strong {
        line-height: 20px;
    }

    p {
        margin-top: 4px;
        line-height: 20px;
    }
`;

const Mask = styled.div`
    position: absolute;
    z-index: 99;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(248, 248, 249, 0.9);
`;

function ImportBox(props: { t: TFunction; setResult: (r: number) => void }) {
    const [taskId, setTaskId] = useState(-2);

    useEffect(() => {
        if (taskId > -1) {
            setTimeout(() => {
                props.setResult(1);
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
                <Block>
                    <strong>1. 下载导入模版</strong>
                    <p style={{ color: '#79879C' }}>请根据提示信息晚上模版文件内容</p>
                    <Button
                        icon={<DownloadOutlined />}
                        onClick={() => download(xlsx, { fileName: '用户导入模板.xls' })}
                    >
                        下载模版文件
                    </Button>
                </Block>
                <Block style={{ marginTop: 16, marginBottom: 24 }}>
                    <strong>2.上传文件</strong>
                    <FileSelect
                        style={{ marginTop: 12 }}
                        loading={taskId > -1}
                        onImport={() => setTaskId(0)}
                    />
                </Block>
                {taskId > -1 && (
                    <>
                        <Mask />
                        <UploadBox />
                    </>
                )}
            </div>
        </>
    );
}

const Container = styled.div`
    width: 65%;

    strong {
        font-style: normal;
        color: #36435c;
    }
`;
export default function ImportUser() {
    const { t } = useTranslation();

    const [result, setResult] = useState(0);

    useEffect(() => {
        console.warn('useEffect', result);
    }, [result]);

    return (
        <>
            <BreadCard
                data={{
                    menu: t('resources.users.name'),
                    subMenu: t('resources.users.bt.import'),
                    route: '/dashboard/user',
                }}
            />
            <div
                style={{
                    backgroundColor: '#fff',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Container>
                    {(result && <Result t={t} />) || <ImportBox t={t} setResult={setResult} />}
                </Container>
            </div>
        </>
    );
}
