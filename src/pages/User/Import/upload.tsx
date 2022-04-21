import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import RcUpload, { UploadProps } from 'rc-upload';
import fileSize from 'filesize';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import Container, { getUserImportContext } from './util';

export function Buttons(props: { onCancel: () => void; onImport?: () => void; file?: File }) {
    const { onCancel, file, onImport } = props;
    const {
        config: { onImport: importFile },
    } = getUserImportContext();

    const { t } = useTranslation();

    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        setDisabled(!file);
    }, [file]);

    const importClick = useCallback(() => {
        setLoading(true);

        if (!file) {
            return;
        }
        onImport && onImport();

        importFile(file).finally(() => setLoading(false));
    }, [onImport, file]);

    return (
        <div
            style={{
                marginTop: 24,
                display: 'flex',
                justifyContent: 'right',
            }}
        >
            <Button className={classNames({ 'ant-btn-loading': loading })} onClick={onCancel}>
                {t('common.import.btn.cancel')}
            </Button>
            <Button
                loading={loading}
                style={{ marginLeft: 12 }}
                className={classNames({ 'ant-btn-loading': disabled })}
                type="primary"
                onClick={importClick}
            >
                {t('common.import.btn.import')}
            </Button>
        </div>
    );
}

export default function UploadProgress() {
    const {
        state: { file, taskId },
        config: {
            icon: { select: File1 },
            getProcess,
        },
    } = getUserImportContext();

    const progressEl = useRef<HTMLDivElement>(null);

    const refresh = useRef<number>(-1);
    const style = {
        display: 'flex',
        justifyContent: 'space-between',
    };

    useEffect(() => {
        return () => {
            clearTimeout(refresh.current);
        };
    }, []);

    const refreshProcess = useCallback(() => {
        if (taskId) {
            const { current } = progressEl;

            if (!current) {
                return;
            }

            const i = current.querySelector('i');
            const span = current.querySelector('span');
            if (!i || !span) {
                return;
            }

            refresh.current = window.setTimeout(async () => {
                await getProcess().then((process) => {
                    process = Math.floor(process);

                    const text = process + '%';
                    i.style.setProperty('--progress', text);
                    span.textContent = text;

                    if (process !== 100) {
                        refreshProcess();
                    }
                });
            }, 1_500);
        } else {
            clearTimeout(refresh.current);
        }
    }, [taskId]);

    useEffect(refreshProcess, [taskId]);

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
    } = getUserImportContext();

    const { t } = useTranslation();

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
                            <Button className="button">{t('common.import.upload.btn.re')}</Button>
                        </>
                    )) || (
                        <>
                            <File0 />
                            <Button className="button">
                                {t('common.import.upload.btn.select')}
                            </Button>
                            <p style={{ color: '#CDD4DB' }}>
                                {t('common.import.upload.tips')}&nbsp;
                                {suffix.join('、')}
                            </p>
                        </>
                    )}
                </div>
            </Container>
        </RcUpload>
    );
}
