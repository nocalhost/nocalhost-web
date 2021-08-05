import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import HTTP from '../../api/fetch';

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
    isEdit?: boolean;
    name?: string;
    storage_class?: string;
}

const AddCluster = (props: IProps) => {
    const { onCancel, isEdit = false, name, storage_class } = props;
    const { t } = useTranslation();
    const [form] = Form.useForm();

    useEffect(() => {
        if (isEdit) {
            form.setFieldsValue({
                name,
                storage_class: storage_class || 'default',
            });
        }
    }, []);

    const addCluster = async (data: any) => {
        try {
            await HTTP.post('cluster', data);
            message.success(t('resource.cluster.tips.addSuccess'));
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = (values: any) => {
        if (isEdit) {
            console.log(values);
        } else {
            addCluster(values);
        }
    };

    return (
        <Modal
            onCancel={onCancel}
            footer={null}
            visible={true}
            width={680}
            title={isEdit ? t('resources.cluster.edit') : t('resources.cluster.add')}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{
                    storage_class: 'default',
                }}
            >
                <Form.Item
                    name="name"
                    label={t('resources.cluster.fields.name')}
                    rules={[{ required: true }]}
                >
                    <Input disabled={isEdit} />
                </Form.Item>
                <Form.Item name="storage_class" label={t('resources.cluster.storage_class')}>
                    <Radio.Group>
                        <Radio value="default">Default</Radio>
                        <Radio value="cbs">cbs</Radio>
                    </Radio.Group>
                </Form.Item>
                {!isEdit && (
                    <>
                        <Form.Item
                            label="KubeConfig"
                            name="kubeconfig"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea
                                placeholder={t('resources.cluster.tips.inputPlaceholder')}
                                rows={4}
                            ></Input.TextArea>
                        </Form.Item>
                        <PromptBox>
                            <IconBox></IconBox>
                            <ul>
                                <li>{t('resources.cluster.tips.kubeconfig')}</li>
                                <li>kubectl config use-context dev-cluster</li>
                                <li>kubectl config view --minify --raw --flatten</li>
                            </ul>
                        </PromptBox>
                    </>
                )}
                <BtnBox>
                    <Button onClick={() => onCancel()} style={{ marginRight: 12 }}>
                        {t('common.bt.cancel')}
                    </Button>
                    <Button htmlType="submit" type="primary">
                        {t('common.bt.confirm')}
                    </Button>
                </BtnBox>
            </Form>
        </Modal>
    );
};

export default AddCluster;
