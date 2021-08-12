import React, { useEffect, useState, useContext } from 'react';
import { Modal, Button, message, Select } from 'antd';
import HTTP from '../../../api/fetch';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

import CopyToClipboard from 'react-copy-to-clipboard';
import { UserContext } from '../../../provider/appContext';

const BtnBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ConfigBox = styled.div`
    word-break: break-all;
    white-space: pre-wrap;
    max-height: 500px;
    overflow: scroll;
`;

interface PropParam {
    onCancel: () => void;
    record: any;
}

const KubeConfig = (props: PropParam) => {
    const { onCancel, record } = props;
    const { user } = useContext(UserContext);

    let shareList: any = [];
    shareList = shareList.concat(record.cooper_user).concat(record.viewer_user);
    shareList = shareList.map((item: any) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const { t } = useTranslation();
    const [kubeConfig, setKubeConfig] = useState<string>('');

    useEffect(() => {
        queryDetail(record.id);
    }, []);

    async function queryDetail(id: any) {
        const response = await HTTP.get(`dev_space/${id}/detail`);
        if (response.code === 0) {
            setKubeConfig(response.data.kubeconfig);
        }
    }

    const handleChange = (value: any) => {
        queryDetail(value);
    };

    const handleCopy = () => {
        message.success(t('nh.action.copied'));
    };

    const handleDownload = () => {
        // download
        const blob = new Blob([kubeConfig]);
        const aLink = document.createElement('a');
        aLink.style.display = 'none';
        aLink.setAttribute('download', 'config');
        aLink.href = URL.createObjectURL(blob);
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
    };

    return (
        <>
            <Modal width={680} visible={true} title="KubeConfig" onCancel={onCancel} footer={null}>
                <ConfigBox>{kubeConfig}</ConfigBox>
                <BtnBox>
                    <div>
                        <Select
                            disabled={!user.is_admin}
                            onChange={handleChange}
                            options={shareList}
                            style={{ width: 200 }}
                        ></Select>
                    </div>
                    <div>
                        <CopyToClipboard text={kubeConfig} onCopy={handleCopy}>
                            <Button>{t('nh.action.copy')}</Button>
                        </CopyToClipboard>
                        <Button onClick={handleDownload} style={{ marginLeft: 8 }}>
                            {t('nh.action.download')}
                        </Button>
                    </div>
                </BtnBox>
            </Modal>
        </>
    );
};

export default KubeConfig;
