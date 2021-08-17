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
    height: 288px;
    overflow: scroll;
    padding: 12px 12px 0;
    background: #f9fbfd;
    font-size: 14px;
    color: #36435c;
`;

const LimitTitle = styled.div`
    margin: 12px 0;
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

const OtherConfigTitle = styled.div`
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
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

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // 校验相关
    const [space_req_mem, set_space_req_mem] = useState('');
    const [space_limits_mem, set_space_limits_mem] = useState('');
    const [space_req_cpu, set_space_req_cpu] = useState('');
    const [space_limits_cpu, set_space_limits_cpu] = useState('');

    useEffect(() => {
        if (isEdit && record) {
            const {
                space_name,
                user_name,
                cluster_name,
                cluster_admin,
                resource_limit_set,
                space_resource_limit,
            } = record;
            let limitObj = {};
            try {
                if (typeof space_resource_limit === 'string') {
                    const tmpObj = JSON.parse(space_resource_limit);
                    const obj: { [index: string]: any } = {};
                    Object.keys(tmpObj).forEach((item) => {
                        obj[item] = parseInt(tmpObj[item]) || undefined;
                    });
                    limitObj = obj;
                }
            } catch (e) {
                limitObj = {};
            }

            setIsAdmin(Boolean(cluster_admin));
            setShowLimit(Boolean(resource_limit_set));

            form.setFieldsValue({
                space_name,
                user_id: user_name,
                cluster_id: cluster_name,
                cluster_admin: Boolean(cluster_admin),
                resource_limit_set: Boolean(resource_limit_set),
                ...limitObj,
            });
        }
    }, [record]);

    const handleSubmit = async (values: any) => {
        try {
            const {
                space_name,
                isLimit,
                cluster_id,
                cluster_admin,
                user_id,
                container_limits_cpu,
                container_limits_mem,
                container_req_cpu,
                container_req_mem,
                space_lb_count,
                space_limits_cpu,
                space_limits_mem,
                space_pvc_count,
                space_req_cpu,
                space_req_mem,
                space_storage_capacity,
                resource_limit_set,
            } = values;

            const limitObj = resource_limit_set
                ? {
                      container_limits_cpu: container_limits_cpu
                          ? container_limits_cpu + ''
                          : container_limits_cpu,
                      container_limits_mem: container_limits_mem
                          ? `${container_limits_mem}Mi`
                          : container_limits_mem,
                      container_req_cpu: container_req_cpu
                          ? container_req_cpu + ''
                          : container_req_cpu,
                      container_req_mem: container_req_mem
                          ? `${container_req_mem}Mi`
                          : container_req_mem,
                      space_lb_count: space_lb_count ? space_lb_count + '' : space_lb_count,
                      space_limits_cpu: space_limits_cpu ? space_limits_cpu + '' : space_limits_cpu,
                      space_limits_mem: space_limits_mem
                          ? `${space_limits_mem}Mi`
                          : space_limits_mem,
                      space_pvc_count: space_pvc_count ? space_pvc_count + '' : space_pvc_count,
                      space_req_cpu: space_req_cpu ? space_req_cpu + '' : space_req_cpu,
                      space_req_mem: space_req_mem ? `${space_req_mem}Mi` : space_req_mem,
                      space_storage_capacity: space_storage_capacity
                          ? `${space_storage_capacity}Gi`
                          : space_storage_capacity,
                  }
                : null;
            if (isEdit) {
                // edit name
                const response = await HTTP.put(`dev_space/${record.id}`, {
                    space_name,
                });
                const limitResp = await HTTP.put(
                    `dev_space/${record.id}/update_resource_limit`,
                    limitObj
                );
                if (response.code === 0 && limitResp.code === 0) {
                    message.success(t('common.message.edit'));
                    onSubmit && onSubmit();
                }
            } else {
                const response = await HTTP.post('dev_space', {
                    cluster_id,
                    cluster_admin: cluster_admin ? 1 : 0,
                    user_id,
                    space_name,
                    isLimit,
                    space_resource_limit: limitObj,
                });
                if (response.code === 0) {
                    message.success(t('resources.space.tips.addSuccess'));
                    onSubmit && onSubmit();
                }
            }
        } catch (e) {
            throw new Error(e);
        }
    };

    return (
        <>
            <Form style={{ minWidth: 632 }} form={form} layout="vertical" onFinish={handleSubmit}>
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
                        <Select disabled={isEdit} style={{ width: 310 }} options={clusterList} />
                    </Form.Item>
                    <Form.Item
                        label={t('resources.space.fields.user')}
                        rules={[{ required: true }]}
                        name="user_id"
                    >
                        <Select disabled={isEdit} style={{ width: 310 }} options={userList} />
                    </Form.Item>
                </FormFlexBox>
                <OtherConfigTitle>{t('common.otherSet')}</OtherConfigTitle>
                <OtherConfigItem>
                    <Icon component={IconAdmin} style={{ fontSize: 32, marginRight: 8 }} />
                    <FormFlexBox>
                        <DescBox>
                            <span>{t('resources.space.fields.setAdminTip')}</span>
                            <span>{t('resources.space.fields.setAdminDesc')}</span>
                        </DescBox>
                        <Form.Item name="cluster_admin">
                            <Switch
                                checked={isAdmin}
                                disabled={isEdit}
                                onChange={(checked) => setIsAdmin(checked)}
                            />
                        </Form.Item>
                    </FormFlexBox>
                </OtherConfigItem>
                {!isAdmin && (
                    <>
                        <OtherConfigItem>
                            <Icon
                                component={IconResource}
                                style={{ fontSize: 32, marginRight: 8 }}
                            />
                            <FormFlexBox>
                                <DescBox>
                                    <span>{t('resources.space.fields.resource_limit')}</span>
                                    <span>{t('resources.space.fields.setLimitDesc')}</span>
                                </DescBox>
                                <Form.Item name="resource_limit_set">
                                    <Switch
                                        checked={showLimit}
                                        onChange={(checked: boolean) => setShowLimit(checked)}
                                    />
                                </Form.Item>
                            </FormFlexBox>
                        </OtherConfigItem>
                        {showLimit && (
                            <LimitWrap>
                                <Divide />
                                <LimitTitle>{t('resources.space.devspaceLimitTitle')}</LimitTitle>
                                <FormFlexBox>
                                    <Form.Item
                                        name="space_req_mem"
                                        label={t('resources.space.fields.requestTotalMem')}
                                    >
                                        <Input
                                            onChange={(e: any) => set_space_req_mem(e.target.value)}
                                            style={{ width: 298 }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="space_limits_mem"
                                        label={t('resources.space.fields.limitTotalMem')}
                                    >
                                        <Input
                                            onChange={(e: any) =>
                                                set_space_limits_mem(e.target.value)
                                            }
                                            style={{ width: 298 }}
                                        />
                                    </Form.Item>
                                </FormFlexBox>
                                <FormFlexBox>
                                    <Form.Item
                                        name="space_req_cpu"
                                        label={t('resources.space.fields.requestTotalCPU')}
                                    >
                                        <Input
                                            onChange={(e: any) => set_space_req_cpu(e.target.value)}
                                            style={{ width: 298 }}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="space_limits_cpu"
                                        label={t('resources.space.fields.limitTotalCPU')}
                                    >
                                        <Input
                                            onChange={(e: any) =>
                                                set_space_limits_cpu(e.target.value)
                                            }
                                            style={{ width: 298 }}
                                        />
                                    </Form.Item>
                                </FormFlexBox>
                                <FormFlexBox>
                                    <Form.Item
                                        name="space_pvc_count"
                                        label={t('resources.space.fields.PVC_num')}
                                    >
                                        <Input style={{ width: 298 }} />
                                    </Form.Item>
                                    <Form.Item
                                        name="space_storage_capacity"
                                        label={t('resources.space.fields.storageCapacity')}
                                    >
                                        <Input style={{ width: 298 }} />
                                    </Form.Item>
                                </FormFlexBox>
                                <FormFlexBox>
                                    <Form.Item
                                        name="space_lb_count"
                                        label={t('resources.space.fields.lbNum')}
                                    >
                                        <Input style={{ width: 298 }} />
                                    </Form.Item>
                                </FormFlexBox>
                                <LimitTitle style={{ marginTop: 0 }}>
                                    {t('resources.space.containerDefaultTitle')}
                                </LimitTitle>
                                <FormFlexBox>
                                    <Form.Item
                                        name="container_req_mem"
                                        label={t('resources.space.fields.requestTotalMem')}
                                        rules={[
                                            {
                                                required: !!space_req_mem,
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: 298 }} />
                                    </Form.Item>

                                    <Form.Item
                                        name="container_limits_mem"
                                        label={t('resources.space.fields.limitTotalMem')}
                                        rules={[
                                            {
                                                required: !!space_limits_mem,
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: 298 }} />
                                    </Form.Item>
                                </FormFlexBox>
                                <FormFlexBox>
                                    <Form.Item
                                        name="container_req_cpu"
                                        label={t('resources.space.fields.requestTotalCPU')}
                                        rules={[
                                            {
                                                required: !!space_req_cpu,
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: 298 }} />
                                    </Form.Item>
                                    <Form.Item
                                        name="container_limits_cpu"
                                        label={t('resources.space.fields.limitTotalCPU')}
                                        rules={[
                                            {
                                                required: !!space_limits_cpu,
                                            },
                                        ]}
                                    >
                                        <Input style={{ width: 298 }} />
                                    </Form.Item>
                                </FormFlexBox>
                            </LimitWrap>
                        )}
                    </>
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
