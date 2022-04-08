import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import RcUpload, { UploadProps } from 'rc-upload';
import fileSize from 'filesize';
import classNames from 'classnames';

import Container, { useImportContext } from './util';

export function Buttons(props: { onCancel: () => void; file?: File; onImport?: () => void }) {
    const { file, onCancel, onImport } = props;
    const { setState } = useImportContext();

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(!file);
    }, [file]);
    return (
        <div
            style={{
                marginTop: 24,
                display: 'flex',
                justifyContent: 'right',
            }}
        >
            <Button className={classNames({ 'ant-btn-loading': loading })} onClick={onCancel}>
                取消
            </Button>
            <Button
                loading={loading}
                style={{ marginLeft: 12 }}
                className={classNames({ 'ant-btn-loading': disabled })}
                type="primary"
                onClick={() => {
                    if (!file) {
                        return;
                    }

                    setLoading(true);

                    onImport && onImport();
                    setState({ taskId: 1, file });
                }}
            >
                导入
            </Button>
        </div>
    );
}

export default function UploadProgress() {
    const {
        state: { file, taskId },
        setState,
        config: {
            icon: { select: File1 },
        },
    } = useImportContext();

    const progressEl = useRef<HTMLDivElement>(null);

    const refresh = useRef<number>(-1);
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    useEffect(() => {
        return () => {
            clearInterval(refresh.current);
        };
    }, []);

    useEffect(() => {
        if (taskId) {
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
                    setState({ taskId: undefined, result: 2 });
                }
            }, 1_000);
        } else {
            clearInterval(refresh.current);
        }
    }, [taskId]);

    if (!file) {
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
        config: {
            icon: { default: File0, select: File1 },
            template: { accept, suffix },
        },
    } = useImportContext();

    const onChang = useCallback((file: File) => {
        setFile(file);
        props.onChange(file);
    }, []);

    const [file, setFile] = useState<File>();

    const rcProps: UploadProps = {
        type: 'drag',
        accept,
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
                                完善模版文件信息后,&nbsp;可直接将文件拖拽到此处进行上传,&nbsp;支持格式:&nbsp;
                                {suffix.join('、')}
                            </p>
                        </>
                    )}
                </div>
            </Container>
        </RcUpload>
    );
}
