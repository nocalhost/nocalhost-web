import React from 'react';
import { Modal, Form, Input, Radio, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const PromptBox = styled.div`
    display: flex;
    height: 60px;
    padding: 6px 0;
    background: rgb(249, 251, 253);
    border-radius: 4px;
    color: rgb(54, 67, 92);
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: normal;
    line-height: 16px;
`;

const IconBox = styled.div`
    width: 32px;
`;

const BtnBox = styled.div`
    display: flex;
    height: 80px;
    justify-content: flex-end;
    align-items: center;
`;

interface IProps {
    onCancel: () => void;
}

const AddCluster = (props: IProps) => {
    const { onCancel } = props;
    const { t } = useTranslation();

    return (
        <Modal
            onCancel={onCancel}
            footer={null}
            visible={true}
            width={680}
            title={t('resources.cluster.edit')}
        >
            <Form layout="vertical">
                <Form.Item
                    name="name"
                    label={t('resources.cluster.fields.name')}
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label={t('resources.cluster.storage_class')}>
                    <Radio.Group>
                        <Radio value="default">Default</Radio>
                        <Radio value="cbs">cbs</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="KubeConfig" name="kubeconfig" rules={[{ required: true }]}>
                    <Input.TextArea
                        placeholder={t('resources.cluster.tips.inputPlaceholder')}
                        rows={4}
                    ></Input.TextArea>
                </Form.Item>
            </Form>
            <PromptBox>
                <IconBox></IconBox>
                <ul>
                    <li>{t('resources.cluster.tips.kubeconfig')}</li>
                    <li>kubectl config use-context dev-cluster</li>
                    <li>kubectl config view --minify --raw --flatten</li>
                </ul>
            </PromptBox>
            <BtnBox>
                <Button style={{ marginRight: 12 }}>{t('common.bt.cancel')}</Button>
                <Button type="primary">{t('common.bt.confirm')}</Button>
            </BtnBox>
        </Modal>
    );
};

export default AddCluster;
