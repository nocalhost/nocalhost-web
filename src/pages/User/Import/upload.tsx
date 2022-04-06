import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import RcUpload, { UploadProps } from 'rc-upload';

import { ReactComponent as File1 } from './asset/file.svg';
import { ReactComponent as File0 } from './asset/file.0.svg';
import classNames from 'classnames';

export default function UploadBox() {
    return (
        <Upload>
            <File1 />
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <label>文件标题信息.xlsx（20.5KB）</label>
                    48%
                </div>
                <i />
            </div>
        </Upload>
    );
}

const Upload = styled.div`
    display: flex;
    align-items: center;
    padding: 28px 20px;
    position: absolute;
    z-index: 100;
    width: 92%;
    height: 128px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #ffffff;

    box-shadow: 0px 8px 24px rgba(9, 30, 66, 0.1), 0px 0px 1px rgba(9, 30, 66, 0.05),
        0px 2px 7px rgba(9, 30, 66, 0.04);
    border-radius: 8px;

    label {
        line-height: 28px;
    }

    i {
        position: relative;
        display: block;
        height: 4px;
        width: 100%;
        background: #dae1e8;
        border-radius: 100px;

        &:before {
            content: ' ';
            position: absolute;
            height: 100%;
            width: 20%;
            background: #0080ff;
        }
    }
`;

const Select = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    height: 208px;
    background: #ffffff;
    border: 1px dashed #dae1e8;
    box-sizing: border-box;
    border-radius: 4px;

    &:hover {
        border: 1px dashed #0080ff;
    }
`;

export function FileSelect(props: {
    onImport: () => void;
    loading: boolean;
    onCancel?: () => void;
    style?: CSSProperties;
}) {
    const { loading, onImport, onCancel, style } = props;

    const rcProps: UploadProps = {
        type: 'drag',
        accept:
            '.csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        beforeUpload(file) {
            console.log('beforeUpload', file.name);

            const { name } = file;
            const suffix = name.split('.').slice(-1)[0];

            if (!['.csv', '.xls', 'xlsx'].includes(suffix)) {
                return false;
            }

            return false;
        },
        onStart: (file) => {
            console.log('onStart', file.name);
        },
        onSuccess(file) {
            console.log('onSuccess', file);
        },
        onProgress(step, file) {
            console.log('onProgress', Math.round(step.percent), file.name);
        },
        onError(err) {
            console.log('onError', err);
        },
    };
    return (
        <>
            <RcUpload {...rcProps}>
                <Select style={style}>
                    <File0 />
                    <Button> 选择文件</Button>
                    <p style={{ color: '#CDD4DB' }}>
                        完善模版文件信息后，可直接将文件拖拽到此处进行上传，支持格式：XLS、XLSX、CSV
                    </p>
                </Select>
            </RcUpload>
            <div
                style={{
                    marginTop: 24,
                    display: 'flex',
                    justifyContent: 'right',
                }}
            >
                <Button onClick={onCancel} className={classNames({ 'ant-btn-loading': loading })}>
                    取消
                </Button>
                <Button
                    loading={loading}
                    style={{ marginLeft: 12 }}
                    type="primary"
                    onClick={onImport}
                >
                    导入
                </Button>
            </div>
        </>
    );
}
