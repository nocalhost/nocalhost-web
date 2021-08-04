import React, { useEffect } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import i18n from '../../../i18n/i18n';
interface IProps {
    name: string;
    storage_class: string;
    onCancel: () => void;
}

const EditCluster = (props: IProps) => {
    const { name, storage_class, onCancel } = props;
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({ name, storage_class });
    }, []);
    return (
        <Modal
            onCancel={onCancel}
            visible={true}
            width={680}
            title={i18n.t('resources.cluster.edit')}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="name" label={i18n.t('resources.cluster.fields.name')}>
                    <Input disabled />
                </Form.Item>
                <Form.Item label={i18n.t('resources.cluster.storage_class')}>
                    <Radio.Group>
                        <Radio value="default">Default</Radio>
                        <Radio value="cbs">cbs</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditCluster;
