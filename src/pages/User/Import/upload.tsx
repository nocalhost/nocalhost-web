import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import RcUpload, { UploadProps } from 'rc-upload';
import fileSize from 'filesize';
import classNames from 'classnames';

import Container, { useImportUserContext } from './util';

export function Buttons(props: { setTaskId: (taskId: number) => void }) {
    const [loading, setLoading] = useState(false);
    return (
        <div
            style={{
                marginTop: 24,
                display: 'flex',
                justifyContent: 'right',
            }}
        >
            <Button className={classNames({ 'ant-btn-loading': loading })}>取消</Button>
            <Button
                loading={loading}
                style={{ marginLeft: 12 }}
                type="primary"
                onClick={() => {
                    setLoading(true);
                    props.setTaskId(0);
                }}
            >
                导入
            </Button>
        </div>
    );
}

export default function UploadProgress() {
    const {
        file,
        taskId,
        setTaskId,
        setResult,
        icon: { select: File1 },
    } = useImportUserContext();

    const progressEl = useRef<HTMLDivElement>(null);

    const refresh = useRef<number>(-1);
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    useEffect(() => {
        if (file && taskId > -1) {
            let progress = 0;
            const { current } = progressEl;

            if (!current) {
                return;
            }

            const i = current.querySelector('i');
            const span = current.querySelector('span');
            if (!i || !span) {
                return;
            }

            refresh.current = window.setInterval(() => {
                progress += 10;
                const text = progress + '%';
                i.style.setProperty('--progress', text);
                span.textContent = text;

                if (progress === 100) {
                    setTaskId(-1);
                    setResult(2);
                }
            }, 1_000);
        }
        if (taskId === -1) {
            clearInterval(refresh.current);
        }
    }, [taskId]);

    if (taskId == -1 || !file) {
        return <></>;
    }
    return (
        <>
            <div className="mask" />
            <div className="upload">
                <File1 />
                <div ref={progressEl}>
                    <div style={style}>
                        <p>{`${file.name} (${fileSize(file.size)})`}</p>
                        <span />
                    </div>
                    <i />
                </div>
            </div>
        </>
    );
}

export function FileSelect(props: { style?: CSSProperties; onChange: (file: File) => void }) {
    const { style } = props;

    const {
        icon: { default: File0, select: File1 },
    } = useImportUserContext();

    const onChang = useCallback((file: File) => {
        setFile(file);
        props.onChange(file);
    }, []);

    const [file, setFile] = useState<File>();

    const rcProps: UploadProps = {
        type: 'drag',
        accept:
            '.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        beforeUpload(file) {
            onChang(file);

            return false;
        },
    };
    return (
        <RcUpload {...rcProps} style={{ position: 'relative' }}>
            <Container>
                <div className="select" style={style}>
                    {(file && (
                        <>
                            <File1 />
                            <p style={{ color: '#36435C' }}>{`${file.name} (${fileSize(
                                file?.size
                            )})`}</p>
                            <Button className="button"> 重新选择</Button>
                        </>
                    )) || (
                        <>
                            <File0 />
                            <Button className="button"> 选择文件</Button>
                            <p style={{ color: '#CDD4DB' }}>
                                完善模版文件信息后，可直接将文件拖拽到此处进行上传，支持格式：XLS、XLSX、CSV
                            </p>
                        </>
                    )}
                </div>
            </Container>
        </RcUpload>
    );
}
