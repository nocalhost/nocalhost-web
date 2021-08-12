import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Radio, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import HTTP from '../../api/fetch';
import Icon from '@ant-design/icons';
import { ReactComponent as IconQuery } from '../../images/icon/icon_label_query.svg';
import { Base64 } from 'js-base64';

import styled from 'styled-components';

import { ClusterItemInfo } from '../../types/index';

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
    margin-left: 10px;
    width: 24px;
`;

const BtnBox = styled.div`
    display: flex;
    height: 80px;
    justify-content: flex-end;
    align-items: center;
`;

interface IProps {
    onCancel: () => void;
    onSubmit: () => void;
    isEdit?: boolean;
    record?: ClusterItemInfo;
}

const AddCluster = (props: IProps) => {
    const { onCancel, isEdit = false, record, onSubmit } = props;
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [storageList, setStorageList] = useState<string[]>([]);

    useEffect(() => {
        if (isEdit && record) {
            queryStorageList(record.id);
            const { name, storage_class } = record;
            form.setFieldsValue({
                name,
                storage_class: storage_class || 'default',
            });
        }
    }, []);

    const addCluster = async (data: any) => {
        const { name, kubeconfig, storage_class } = data;
        const response = await HTTP.post('cluster', {
            name,
            kubeconfig: Base64.encode(kubeconfig),
            storage_class: storage_class === 'default' ? '' : storage_class,
        });
        if (response.code === 0) {
            message.success(t('resources.cluster.tips.addSuccess'));
            onSubmit();
        }
    };

    const editCluster = async (data: any) => {
        const { storage_class } = data;
        const response = await HTTP.put(`cluster/${record?.id}`, {
            ...record,
            storage_class: storage_class === 'default' ? '' : storage_class,
        });
        if (response.code === 0) {
            message.success(t('resources.cluster.tips.editSuccess'));
            onSubmit();
        }
    };

    const handleSubmit = (values: any) => {
        if (isEdit) {
            editCluster(values);
        } else {
            addCluster(values);
        }
    };

    async function queryStorageList(id: number) {
        try {
            const response = await HTTP.get(`cluster/${id}/storage_class`);
            setStorageList(response.data.type_name);
        } catch (e) {
            setStorageList([]);
        }
    }

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
                {isEdit && (
                    <Form.Item name="storage_class" label={t('resources.cluster.storage_class')}>
                        <Radio.Group>
                            <Radio value="default">Default</Radio>
                            {storageList.map((item, index) => {
                                return (
                                    <Radio key={index} value={item}>
                                        {item}
                                    </Radio>
                                );
                            })}
                        </Radio.Group>
                    </Form.Item>
                )}
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
                            <IconBox>
                                <Icon style={{ fontSize: 20 }} component={IconQuery} />
                            </IconBox>
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
