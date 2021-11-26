import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Switch, Button, message, Popover } from 'antd';
import { useTranslation } from 'react-i18next';
import { FlexBox } from '../style-components';
import styled from 'styled-components';
import Icon from '@ant-design/icons';
import HTTP from '../../../api/fetch';

import { ReactComponent as IconAdmin } from '../../../images/icon/icon_admin.svg';
import { ReactComponent as IconResource } from '../../../images/icon/icon_resource.svg';
import { ReactComponent as IconBaseSpace } from '../../../images/icon/icon_switch_baseSpace.svg';
import { ReactComponent as IconSleep } from '../../../images/icon/icon_switch_sleep.svg';
import { ReactComponent as IconDelete } from '../../../images/icon/icon_input_del.svg';

import { queryAllCluster, queryAllUser } from '../../../services';
import { TimePicker } from './form-component';
import TimerPickerPanel from './TimePickerPanel';

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

    .ant-form-item {
        margin-bottom: 0;
    }
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
    const [showCost, setShowCost] = useState<boolean>(false);
    const [form] = Form.useForm();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [userList, setUserList] = useState<any>([]);
    const [clusterList, setClusterList] = useState<any>([]);

    // 校验相关
    const [space_req_mem, set_space_req_mem] = useState('');
    const [space_limits_mem, set_space_limits_mem] = useState('');
    const [space_req_cpu, set_space_req_cpu] = useState('');
    const [space_limits_cpu, set_space_limits_cpu] = useState('');
    const [canSetLimit, setCanSetLimit] = useState<boolean>(true);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [sleepTimeList, setSleepTimeList] = useState([
        {
            start: '周一 20:00',
            end: '周二 08:00',
        },
        {
            start: '周一 20:00',
            end: '周二 08:00',
        },
        {
            start: '周一 20:00',
            end: '周二 08:00',
        },
        {
            start: '周一 20:00',
            end: '周二 08:00',
        },
        {
            start: '周一 20:00',
            end: '周二 08:00',
        },
    ]);
    const [showTimePanel, setShowTimePanel] = useState<boolean>(false);

    useEffect(() => {
        if (isEdit && record) {
            const {
                space_name,
                user_name,
                cluster_name,
                cluster_admin,
                resource_limit_set,
                space_resource_limit,
                is_base_space,
                deletable,
            } = record;
            let limitObj = {};
            try {
                if (typeof space_resource_limit === 'string') {
                    const tmpObj = JSON.parse(space_resource_limit);
                    const obj: { [index: string]: any } = {};
                    Object.keys(tmpObj).forEach((item) => {
                        obj[item] = parseFloat(tmpObj[item]) || undefined;
                    });
                    limitObj = obj;
                }
            } catch (e) {
                limitObj = {};
            }

            setCanSetLimit(deletable);
            setIsAdmin(Boolean(cluster_admin));
            setShowLimit(Boolean(resource_limit_set));

            form.setFieldsValue({
                space_name,
                user_id: user_name,
                cluster_id: cluster_name,
                cluster_admin: Boolean(cluster_admin),
                resource_limit_set: Boolean(resource_limit_set),
                is_base_space,
                ...limitObj,
            });
        }
    }, [record]);

    useEffect(() => {
        getClusters();
        getUsers();
    }, []);

    async function getClusters() {
        const clusterMap = await queryAllCluster();
        const tmpList = Array.from(clusterMap).map((item) => {
            return {
                value: item[0],
                text: item[1],
                label: item[1],
            };
        });
        setClusterList(tmpList);
    }

    async function getUsers() {
        const userMap = await queryAllUser();
        const tmpList = Array.from(userMap).map((item) => {
            return {
                value: item[0],
                text: item[1],
                label: item[1],
            };
        });
        setUserList(tmpList);
    }

    const handleSubmit = async (values: any) => {
        setIsSubmit(true);
        try {
            const {
                space_name,
                isLimit,
                cluster_id,
                cluster_admin,
                user_id,
                is_base_space,
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

                if (canSetLimit) {
                    const limitResp = await HTTP.put(
                        `dev_space/${record.id}/update_resource_limit`,
                        limitObj
                    );
                    if (response.code === 0 && limitResp.code === 0) {
                        message.success(t('common.message.edit'));
                        onSubmit && onSubmit();
                    }
                } else {
                    if (response.code === 0) {
                        message.success(t('common.message.edit'));
                        onSubmit && onSubmit();
                    }
                }
                setIsSubmit(false);
            } else {
                const response = await HTTP.post('dev_space', {
                    cluster_id,
                    cluster_admin: cluster_admin ? 1 : 0,
                    is_base_space,
                    user_id,
                    space_name,
                    isLimit,
                    space_resource_limit: limitObj,
                });
                setIsSubmit(false);
                if (response.code === 0) {
                    message.success(t('resources.space.tips.addSuccess'));
                    onSubmit && onSubmit();
                }
            }
        } catch (e) {
            setIsSubmit(false);
            throw new Error(e);
        }
    };

    const handleAddTime = () => {
        setSleepTimeList(sleepTimeList);
    };

    const handleDeleteTime = (key: number) => {
        setSleepTimeList((currentTimeList) => currentTimeList.filter((item, i) => i !== key));
    };

    return (
        <>
            <Form
                style={{ minWidth: 632, position: 'relative' }}
                form={form}
                layout="vertical"
                scrollToFirstError={true}
                onFinish={handleSubmit}
            >
                <Form.Item label={t('resources.devSpace.fields.space_name')} name="space_name">
                    <Input />
                </Form.Item>
                <FormFlexBox>
                    <Form.Item
                        label={t('resources.cluster.name')}
                        name="cluster_id"
                        rules={[{ required: true }]}
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            disabled={isEdit}
                            style={{ width: 310 }}
                            options={clusterList}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t('resources.space.fields.user')}
                        rules={[{ required: true }]}
                        name="user_id"
                    >
                        <Select
                            showSearch
                            optionFilterProp="label"
                            disabled={isEdit}
                            style={{ width: 310 }}
                            options={userList}
                        />
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
                                component={IconBaseSpace}
                                style={{ fontSize: 32, marginRight: 8 }}
                            />
                            <FormFlexBox>
                                <DescBox>
                                    <span>{t('resources.space.fields.setBaseSpaceTip')}</span>
                                    <span>{t('resources.space.fields.setBaseSpaceDesc')}</span>
                                </DescBox>
                                <Form.Item valuePropName="checked" name="is_base_space">
                                    <Switch disabled={isEdit} />
                                </Form.Item>
                            </FormFlexBox>
                        </OtherConfigItem>
                        <OtherConfigItem>
                            <Icon
                                component={IconResource}
                                style={{ fontSize: 34, marginRight: 8 }}
                            />
                            <FormFlexBox>
                                <DescBox>
                                    <span>{t('resources.space.fields.resource_limit')}</span>
                                    <span>{t('resources.space.fields.setLimitDesc')}</span>
                                </DescBox>
                                <Form.Item name="resource_limit_set">
                                    <Switch
                                        checked={showLimit}
                                        disabled={!canSetLimit}
                                        onChange={(checked: boolean) => setShowLimit(checked)}
                                    />
                                </Form.Item>
                            </FormFlexBox>
                        </OtherConfigItem>
                        {showLimit && (
                            <LimitWrap>
                                <Divide />
                                <div style={{ paddingLeft: 44 }}>
                                    <LimitTitle>
                                        {t('resources.space.devspaceLimitTitle')}
                                    </LimitTitle>
                                    <FormFlexBox>
                                        <Form.Item
                                            name="space_req_mem"
                                            label={t('resources.space.fields.requestTotalMem')}
                                            style={{
                                                width: '100%',
                                                marginRight: 12,
                                                flexBasis: '50%',
                                            }}
                                        >
                                            <Input
                                                disabled={!canSetLimit}
                                                onChange={(e: any) =>
                                                    set_space_req_mem(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="space_limits_mem"
                                            label={t('resources.space.fields.limitTotalMem')}
                                            style={{ flexBasis: '50%' }}
                                        >
                                            <Input
                                                disabled={!canSetLimit}
                                                onChange={(e: any) =>
                                                    set_space_limits_mem(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    </FormFlexBox>
                                    <FormFlexBox>
                                        <Form.Item
                                            name="space_req_cpu"
                                            label={t('resources.space.fields.requestTotalCPU')}
                                            style={{
                                                width: '100%',
                                                marginRight: 12,
                                                flexBasis: '50%',
                                            }}
                                        >
                                            <Input
                                                disabled={!canSetLimit}
                                                onChange={(e: any) =>
                                                    set_space_req_cpu(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            name="space_limits_cpu"
                                            label={t('resources.space.fields.limitTotalCPU')}
                                            style={{ flexBasis: '50%' }}
                                        >
                                            <Input
                                                disabled={!canSetLimit}
                                                onChange={(e: any) =>
                                                    set_space_limits_cpu(e.target.value)
                                                }
                                            />
                                        </Form.Item>
                                    </FormFlexBox>
                                    <FormFlexBox>
                                        <Form.Item
                                            name="space_pvc_count"
                                            label={t('resources.space.fields.PVC_num')}
                                            style={{
                                                width: '100%',
                                                marginRight: 12,
                                                flexBasis: '50%',
                                            }}
                                        >
                                            <Input disabled={!canSetLimit} />
                                        </Form.Item>
                                        <Form.Item
                                            name="space_storage_capacity"
                                            label={t('resources.space.fields.storageCapacity')}
                                            style={{ flexBasis: '50%' }}
                                        >
                                            <Input disabled={!canSetLimit} />
                                        </Form.Item>
                                    </FormFlexBox>
                                    <FormFlexBox>
                                        <Form.Item
                                            name="space_lb_count"
                                            label={t('resources.space.fields.lbNum')}
                                            style={{
                                                width: '100%',
                                                marginRight: 12,
                                                flexBasis: '50%',
                                            }}
                                        >
                                            <Input disabled={!canSetLimit} />
                                        </Form.Item>
                                        <Form.Item
                                            style={{ flexBasis: '50%', visibility: 'hidden' }}
                                        />
                                    </FormFlexBox>
                                    <LimitTitle style={{ marginTop: 0 }}>
                                        {t('resources.space.containerDefaultTitle')}
                                    </LimitTitle>
                                    <FormFlexBox>
                                        <Form.Item
                                            name="container_req_mem"
                                            label={t('resources.space.fields.requestTotalMem')}
                                            style={{
                                                width: '100%',
                                                marginRight: 12,
                                                flexBasis: '50%',
                                            }}
                                            rules={[
                                                {
                                                    required: !!space_req_mem,
                                                },
                                            ]}
                                        >
                                            <Input disabled={!canSetLimit} />
                                        </Form.Item>

                                        <Form.Item
                                            name="container_limits_mem"
                                            label={t('resources.space.fields.limitTotalMem')}
                                            style={{ flexBasis: '50%' }}
                                            rules={[
                                                {
                                                    required: !!space_limits_mem,
                                                },
                                            ]}
                                        >
                                            <Input disabled={!canSetLimit} />
                                        </Form.Item>
                                    </FormFlexBox>
                                    <FormFlexBox>
                                        <Form.Item
                                            name="container_req_cpu"
                                            label={t('resources.space.fields.requestTotalCPU')}
                                            style={{
                                                width: '100%',
                                                marginRight: 12,
                                                flexBasis: '50%',
                                            }}
                                            rules={[
                                                {
                                                    required: !!space_req_cpu,
                                                },
                                            ]}
                                        >
                                            <Input disabled={!canSetLimit} />
                                        </Form.Item>
                                        <Form.Item
                                            name="container_limits_cpu"
                                            label={t('resources.space.fields.limitTotalCPU')}
                                            style={{ flexBasis: '50%' }}
                                            rules={[
                                                {
                                                    required: !!space_limits_cpu,
                                                },
                                            ]}
                                        >
                                            <Input disabled={!canSetLimit} />
                                        </Form.Item>
                                    </FormFlexBox>
                                </div>
                            </LimitWrap>
                        )}
                        <OtherConfigItem>
                            <Icon component={IconSleep} style={{ fontSize: 34, marginRight: 8 }} />
                            <FormFlexBox>
                                <DescBox>
                                    <span>{t('resources.cost.formTitle')}</span>
                                    <span>{t('resources.cost.formDesc')}</span>
                                </DescBox>
                                <Form.Item name="resource_limit_set">
                                    <Switch
                                        checked={showCost}
                                        disabled={!canSetLimit}
                                        onChange={(checked: boolean) => setShowCost(checked)}
                                    />
                                </Form.Item>
                            </FormFlexBox>
                        </OtherConfigItem>
                        {showCost && (
                            <LimitWrap>
                                <Divide style={{ marginBottom: 12 }} />
                                <FormFlexBox style={{ paddingLeft: 44 }}>
                                    <Form.Item
                                        name="space_req_mem"
                                        label={t('resources.cost.sleepTimeRange')}
                                        style={{
                                            width: '100%',
                                            marginRight: 12,
                                            flexBasis: '50%',
                                        }}
                                    >
                                        <TimePicker>
                                            {sleepTimeList.map((item, key) => {
                                                return (
                                                    <div className="time-item" key={key}>
                                                        {`${item.start}~${item.end}`}
                                                        <div
                                                            className="icon"
                                                            onClick={() => handleDeleteTime(key)}
                                                        >
                                                            <Icon
                                                                component={IconDelete}
                                                                style={{
                                                                    fontSize: 16,
                                                                    marginLeft: 10,
                                                                    cursor: 'pointer',
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            <Popover
                                                visible={showTimePanel}
                                                trigger="click"
                                                onVisibleChange={(visible) =>
                                                    setShowTimePanel(visible)
                                                }
                                                content={
                                                    <TimerPickerPanel
                                                        handleHide={() => setShowTimePanel(false)}
                                                    />
                                                }
                                            >
                                                <div className="add-item" onClick={handleAddTime}>
                                                    <span>{t('resources.cost.addTimeRange')}</span>
                                                </div>
                                            </Popover>
                                        </TimePicker>
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
                    <Button disabled={isSubmit} type="primary" htmlType="submit">
                        {t('common.bt.confirm')}
                    </Button>
                </BtnBox>
            </Form>
        </>
    );
};

export default DevspaceForm;
