import React, { useEffect, useState } from 'react';
import { Modal, Button, message, Select } from 'antd';
import HTTP from '../../../api/fetch';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

import CopyToClipboard from 'react-copy-to-clipboard';

const BtnBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface PropParam {
    onCancel: () => void;
    id: any;
}

const KubeConfig = (props: PropParam) => {
    const { onCancel, id } = props;

    const { t } = useTranslation();

    const [kubeConfig, setKubeConfig] = useState<string>('');

    useEffect(() => {
        queryDetail(id);
    }, []);

    async function queryDetail(id: any) {
        const response = await HTTP.get(`dev_space/${id}/detail`);
        setKubeConfig(response.data.kubeconfig);
    }

    const handleCopy = () => {
        // copy
        message.success(t('nh.action.copied'));
    };
    return (
        <>
            <Modal width={680} visible={true} title="KubeConfig" onCancel={onCancel} footer={null}>
                <div>{kubeConfig}</div>
                <BtnBox>
                    <div>
                        <Select style={{ width: 200 }}></Select>
                    </div>
                    <div>
                        <CopyToClipboard text={kubeConfig} onCopy={handleCopy}>
                            <Button>{t('nh.action.copy')}</Button>
                        </CopyToClipboard>
                        <Button style={{ marginLeft: 8 }}>{t('nh.action.download')}</Button>
                    </div>
                </BtnBox>
            </Modal>
        </>
    );
};

export default KubeConfig;
