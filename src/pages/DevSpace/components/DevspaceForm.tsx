import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Switch, Button, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { FlexBox } from '../style-components';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import HTTP from '../../../api/fetch';

import { ReactComponent as IconAdmin } from '../../../images/icon/icon_admin.svg';
import { ReactComponent as IconResource } from '../../../images/icon/icon_resource.svg';

const FormFlexBox = styled(FlexBox)`
    flex: 1;
    justify-content: space-between;
`;

const OtherConfigItem = styled.div`
    padding: 10px 12px;
    margin-top: 8px;
    background: #f9fbfd;
    border-radius: 4px;
    display: flex;
    align-items: center;
`;

const DescBox = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    span {
        &:nth-child(1) {
            font-family: PingFangSC-Semibold;
            font-size: 14px;
            font-weight: 600;
            color: #36435c;
        }

        &:nth-child(2) {
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #79879c;
        }
    }
`;

const LimitWrap = styled.div`
    padding: 12px 12px 0;
    background: #f9fbfd;
    font-size: 14px;
    color: #36435c;
`;

const LimitTitle = styled.div`
    margin-top: 12px;
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
`;

const Divide = styled.div`
    height: 1px;
    background: #e6ebf2;
`;

const BtnBox = styled.div`
    display: flex;
    margin-top: 24px;
    align-items: center;
    justify-content: flex-end;
`;

interface SelectMap {
    text: any;
    value: any;
    label?: any;
}

const DevspaceForm = ({
    userList = [],
    clusterList = [],
    onSubmit,
    record,
    isEdit = false,
    onCancel,
}: {
    userList?: SelectMap[];
    clusterList?: SelectMap[];
    isEdit?: boolean;
    onSubmit?: () => void;
    onCancel: () => void;
    record?: any;
}) => {
    const { t } = useTranslation();
    const [showLimit, setShowLimit] = useState<boolean>(false);
    const [form] = Form.useForm();

    console.log('form', record);

    useEffect(() => {
        console.log(form, record);
        if (isEdit && record) {
            const {
                space_name,
                user_name,
                cluster_name,
                cluster_admin,
                resource_limit_set,
            } = record;
            form.setFieldsValue({
                space_name,
                user_id: user_name,
                cluster_id: cluster_name,
                cluster_admin: Boolean(cluster_admin),
                resource_limit_set,
            });
        }
    }, []);

    const handleSubmit = async (values: any) => {
        try {
            const response = await HTTP.post('dev_space', values);
            console.log(response);
            if (response.code === 0) {
                message.success(t('resources.space.tips.addSuccess'));
            }
            onSubmit && onSubmit();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Form form={form} layout="vertical" onFinish={handleSubmit}>
                <Form.Item
                    label={t('resources.devSpace.fields.space_name')}
                    name="space_name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <FormFlexBox>
                    <Form.Item
                        label={t('resources.cluster.name')}
                        name="cluster_id"
                        rules={[{ required: true }]}
                    >
                        <Select disabled={isEdit} style={{ width: 220 }} options={clusterList} />
                    </Form.Item>
                    <Form.Item
                        label={t('resources.space.fields.user')}
                        rules={[{ required: true }]}
                        name="user_id"
                    >
                        <Select disabled={isEdit} style={{ width: 220 }} options={userList} />
                    </Form.Item>
                </FormFlexBox>
                <div>其他设置</div>
                <OtherConfigItem>
                    <Icon component={IconAdmin} style={{ fontSize: 32, marginRight: 8 }} />
                    <FormFlexBox>
                        <DescBox>
                            <span>{t('resources.space.fields.setAdminTip')}</span>
                            <span>{t('resources.space.fields.setAdminDesc')}</span>
                        </DescBox>
                        <Form.Item name="cluster_admin">
                            <Switch disabled={isEdit} />
                        </Form.Item>
                    </FormFlexBox>
                </OtherConfigItem>
                <OtherConfigItem>
                    <Icon component={IconResource} style={{ fontSize: 32, marginRight: 8 }} />
                    <FormFlexBox>
                        <DescBox>
                            <span>{t('resources.space.fields.resource_limit')}</span>
                            <span>{t('resources.space.fields.setLimitDesc')}</span>
                        </DescBox>
                        <Form.Item name="resource_limit_set">
                            <Switch onChange={(checked: boolean) => setShowLimit(checked)} />
                        </Form.Item>
                    </FormFlexBox>
                </OtherConfigItem>
                {showLimit && (
                    <LimitWrap>
                        <Divide />
                        <LimitTitle>DevSpace 资源限制</LimitTitle>
                        <FormFlexBox>
                            <Form.Item label={t('resources.space.fields.requestTotalMem')}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={t('resources.space.fields.limitTotalMem')}>
                                <Input />
                            </Form.Item>
                        </FormFlexBox>
                        <FormFlexBox>
                            <Form.Item label={t('resources.space.fields.requestTotalCPU')}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={t('resources.space.fields.limitTotalCPU')}>
                                <Input />
                            </Form.Item>
                        </FormFlexBox>
                        <FormFlexBox>
                            <Form.Item label={t('resources.space.fields.PVC_num')}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={t('resources.space.fields.storageCapacity')}>
                                <Input />
                            </Form.Item>
                        </FormFlexBox>
                        <FormFlexBox>
                            <Form.Item label={t('resources.space.fields.lbNum')}>
                                <Input />
                            </Form.Item>
                        </FormFlexBox>
                    </LimitWrap>
                )}
                <BtnBox>
                    <Button onClick={onCancel} style={{ marginRight: 12 }}>
                        {t('common.bt.cancel')}
                    </Button>
                    <Button type="primary" htmlType="submit">
                        {t('common.bt.confirm')}
                    </Button>
                </BtnBox>
            </Form>
        </>
    );
};

export default DevspaceForm;
