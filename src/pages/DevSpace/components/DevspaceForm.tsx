import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input, Select, Switch, Button, message, Popover } from 'antd';
import { Rule } from 'rc-field-form/es/interface';
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
import { ReactComponent as IconAdd } from '../../../images/icon/icon_add.svg';

import { queryAllCluster, queryAllUser } from '../../../services';
import VirtualCluster from './VirtualCluster';
import { TimePicker, RuleTip } from './form-component';
import TimerPickerPanel from './TimePickerPanel';
import { IOption } from '../../../types';
import { DEFAULT_SLEEP_TIME } from '../../../contants';

export const FormFlexBox = styled(FlexBox)`
    flex: 1;
    justify-content: space-between;
`;

export const OtherConfigItem = styled.div`
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

export const DescBox = styled.div`
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

export const LimitWrap = styled.div`
    max-height: 288px;
    overflow: scroll;
    padding: 12px 12px 0;
    background: #f9fbfd;
    font-size: 14px;
    color: #36435c;

    .ant-form-item-control-input {
        box-shadow: none;
    }
    .ant-row.ant-form-item {
        margin-left: 40px;
    }
`;

export const LimitTitle = styled.div`
    margin: 12px 0;
    margin-left: 40px;
    color: rgb(54, 67, 92);
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    font-weight: 600;
`;

const SleepModeWrap = styled(LimitWrap)`
    .ant-form-item-control-input {
        box-shadow: none;
    }
`;

export const Divide = styled.div`
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
    const [isBaseSpace, setIsBaseSpace] = useState<boolean>(false);
    const [isVCluster, setIsVCluster] = useState(false);
    const [userList, setUserList] = useState<any>([]);
    const [clusterList, setClusterList] = useState<any>([]);

    // 校验相关
    const [space_req_mem, set_space_req_mem] = useState('');
    const [space_limits_mem, set_space_limits_mem] = useState('');
    const [space_req_cpu, set_space_req_cpu] = useState('');
    const [space_limits_cpu, set_space_limits_cpu] = useState('');
    const [canSetLimit, setCanSetLimit] = useState<boolean>(true);
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [sleepTimeList, setSleepTimeList] = useState<
        { start: IOption[]; end: IOption[]; isEdit?: boolean }[]
    >([]);
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
                dev_space_type,
            } = record;
            let limitObj = {};
            let virtual_cluster = {};
            try {
                if (typeof space_resource_limit === 'string') {
                    const tmpObj = JSON.parse(space_resource_limit);
                    const obj: { [index: string]: any } = {};
                    Object.keys(tmpObj).forEach((item) => {
                        const tmpNumber = parseFloat(tmpObj[item]);
                        obj[item] = Number.isNaN(tmpNumber) ? undefined : tmpNumber;
                    });
                    limitObj = obj;
                }
            } catch (e) {
                limitObj = {};
            }

            setCanSetLimit(deletable);
            setIsAdmin(Boolean(cluster_admin));
            setShowLimit(Boolean(resource_limit_set));

            if (dev_space_type === 3) {
                setIsVCluster(true);
                virtual_cluster = record.virtual_cluster;
            }
            setShowCost(record?.sleep_config?.by_week?.length > 0);

            form.setFieldsValue({
                space_name,
                user_id: user_name,
                cluster_id: cluster_name,
                cluster_admin: Boolean(cluster_admin),
                resource_limit_set: Boolean(resource_limit_set),
                configSleep: Boolean(record?.sleep_config?.by_week?.length > 0),
                is_base_space,
                dev_space_type,
                ...limitObj,
                ...virtual_cluster,
            });

            // handle sleep time
            const weekMap = new Map();
            ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'].forEach((item, index) => {
                weekMap.set(index, t(`resources.cost.${item}`));
            });
            const sleepConfigList = record?.sleep_config?.by_week || [];
            const tmpList = sleepConfigList.map((item: any) => {
                return {
                    start: [
                        {
                            label: `${weekMap.get(item.sleep_day)}`,
                            value: item.sleep_day,
                        },
                        {
                            label: `${item.sleep_time}`,
                            value: item.sleep_time,
                        },
                    ],
                    end: [
                        {
                            label: `${weekMap.get(item.wakeup_day)}`,
                            value: item.wakeup_day,
                        },
                        {
                            label: `${item.wakeup_time}`,
                            value: item.wakeup_time,
                        },
                    ],
                    isEdit: false,
                };
            });
            setSleepTimeList(tmpList);
        }
    }, [record]);

    useEffect(() => {
        getClusters();
        getUsers();
        // init sleep time
        if (!isEdit) {
            setSleepTimeList(
                DEFAULT_SLEEP_TIME.map((item) => {
                    return {
                        start: [
                            {
                                label: t(`resources.cost.${item.start.label}`),
                                value: item.start.value,
                            },
                            {
                                label: '20:00',
                                value: '20:00',
                            },
                        ],
                        end: [
                            {
                                label: t(`resources.cost.${item.end.label}`),
                                value: item.end.value,
                            },
                            {
                                label: '08:00',
                                value: '08:00',
                            },
                        ],
                    };
                })
            );
        }
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
                dev_space_type,
                service_type,
                version,
                values: helmValues,
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
                      space_lb_count:
                          typeof space_lb_count === 'number' ? space_lb_count + '' : space_lb_count,
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
                let data: any = {
                    space_name,
                };
                if (dev_space_type === 3) {
                    data = {
                        dev_space_type,
                        space_name,
                        virtual_cluster: { service_type, version, values: helmValues },
                    };
                }
                // edit name
                const response = await HTTP.put(`dev_space/${record.id}`, data);

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
                // submit sleeping time
                await submitSleepList();
                setIsSubmit(false);
            } else {
                let data: any = {
                    cluster_id,
                    cluster_admin: cluster_admin ? 1 : 0,
                    is_base_space,
                    user_id,
                    space_name,
                    isLimit,
                    space_resource_limit: limitObj,
                };

                if (dev_space_type == true) {
                    data = {
                        ...data,
                        dev_space_type: 3,
                        virtual_cluster: { service_type, version, values: helmValues },
                    };
                }

                const response = await HTTP.post('dev_space', data);
                setIsSubmit(false);
                if (response.code === 0) {
                    message.success(t('resources.space.tips.addSuccess'));
                    // submit sleeping time
                    if (showCost && sleepTimeList.length > 0) {
                        await submitSleepList(response?.data?.id);
                    }
                    onSubmit && onSubmit();
                }
            }
        } catch (e) {
            setIsSubmit(false);
            throw new Error(e);
        }
    };

    async function submitSleepList(id?: number) {
        const utcOffset = -new Date().getTimezoneOffset();
        const wakeData = sleepTimeList.map((item: { start: IOption[]; end: IOption[] }) => {
            return {
                sleep_day: item?.start?.[0]?.value,
                sleep_time: item?.start?.[1]?.value,
                utc_offset: utcOffset,
                wakeup_day: item?.end?.[0]?.value,
                wakeup_time: item?.end?.[1]?.value,
            };
        });

        await HTTP.put(
            `dev_space/${id ?? record.id}/sleep_config`,
            {
                by_week: showCost ? wakeData : [],
            },
            {
                is_v2: true,
            }
        );
    }

    const handleAddTime = () => {
        setSleepTimeList(sleepTimeList);
    };

    const handleDeleteTime = (key: number) => {
        setSleepTimeList((currentTimeList) => currentTimeList.filter((item, i) => i !== key));
    };

    const handleAddSleepTime = (sleep: IOption[], wake: IOption[]) => {
        setSleepTimeList((currentTimeList) => {
            currentTimeList.push({
                start: [
                    sleep[0],
                    {
                        label: `${sleep[1]?.label}:${sleep[2]?.label}`,
                        value: `${sleep[1]?.value}:${sleep[2]?.value}`,
                    },
                ],
                end: [
                    wake[0],
                    {
                        label: `${wake[1]?.label}:${wake[2]?.label}`,
                        value: `${wake[1]?.value}:${wake[2]?.value}`,
                    },
                ],
                isEdit: false,
            });
            return currentTimeList;
        });
    };

    const handleEditSleepTime = (sleep: IOption[], wake: IOption[], index: number = 0) => {
        setSleepTimeList((currentTimeList) => {
            currentTimeList[index] = {
                start: [
                    sleep[0],
                    {
                        label: `${sleep[1]?.label}:${sleep[2]?.label}`,
                        value: `${sleep[1]?.value}:${sleep[2]?.value}`,
                    },
                ],
                end: [
                    wake[0],
                    {
                        label: `${wake[1]?.label}:${wake[2]?.label}`,
                        value: `${wake[1]?.value}:${wake[2]?.value}`,
                    },
                ],
                isEdit: false,
            };
            return currentTimeList;
        });
    };

    const handleShowEditTime = (index: number, visible: boolean = true) => {
        setSleepTimeList((currentList) => {
            if (currentList?.[index]) {
                currentList[index].isEdit = visible;
            }
            return [...currentList];
        });
    };

    const handleConfigSleep = (checked: boolean) => {
        setShowCost(checked);
    };

    const [rules, setRules] = useState<{ [key: string]: Rule[] }>({});

    const onValuesChange = useCallback(
        (changedValues: any, allValues: any) => {
            if (!('dev_space_type' in changedValues) && !('resource_limit_set' in changedValues)) {
                return;
            }
            const fieldsName = [
                'space_req_mem',
                'space_limits_mem',
                'space_req_cpu',
                'space_limits_cpu',
            ];
            let space_req_mem: Rule[] = [];
            let space_limits_mem: Rule[] = [];
            let space_req_cpu: Rule[] = [];
            let space_limits_cpu: Rule[] = [];

            const { dev_space_type, resource_limit_set } = allValues;
            if (dev_space_type && resource_limit_set) {
                const getRules = (min: number): Rule[] => {
                    return [
                        {
                            min,
                            type: 'number',
                            transform: (value: any) => {
                                return value ? Number(value) : 3000;
                            },
                        },
                    ];
                };

                space_req_mem = getRules(512);
                space_limits_mem = getRules(3000);
                space_req_cpu = getRules(0.3);
                space_limits_cpu = getRules(3);

                setTimeout(() => {
                    form.validateFields(fieldsName);
                }, 500);
            }

            setRules({ space_req_mem, space_limits_mem, space_req_cpu, space_limits_cpu });

            form.setFields(
                fieldsName.map((name) => {
                    return { name, errors: [] };
                })
            );
        },
        [form]
    );
    return (
        <>
            <Form
                onValuesChange={onValuesChange}
                style={{ minWidth: 632, position: 'relative' }}
                form={form}
                layout="vertical"
                scrollToFirstError={true}
                initialValues={{ service_type: 'ClusterIP', values: null }}
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
                {!isVCluster && (
                    <OtherConfigItem>
                        <Icon component={IconAdmin} style={{ fontSize: 32, marginRight: 8 }} />
                        <FormFlexBox>
                            <DescBox>
                                <span>{t('resources.space.fields.setAdminTip')}</span>
                                <span>{t('resources.space.fields.setAdminDesc')}</span>
                            </DescBox>
                            <Form.Item name="cluster_admin">
                                <Switch checked={isAdmin} disabled={isEdit} onChange={setIsAdmin} />
                            </Form.Item>
                        </FormFlexBox>
                    </OtherConfigItem>
                )}
                {!isAdmin && (
                    <>
                        {!isVCluster && (
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
                                        <Switch
                                            checked={isBaseSpace}
                                            onChange={setIsBaseSpace}
                                            disabled={isEdit}
                                        />
                                    </Form.Item>
                                </FormFlexBox>
                            </OtherConfigItem>
                        )}

                        {!isBaseSpace && (
                            <VirtualCluster
                                form={form}
                                initialIsVCluster={isVCluster}
                                isEdit={isEdit}
                                changeIsVCluster={setIsVCluster}
                            />
                        )}

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
                                <LimitTitle>{t('resources.space.devspaceLimitTitle')}</LimitTitle>
                                <FormFlexBox>
                                    <Form.Item
                                        name="space_req_mem"
                                        label={t('resources.space.fields.requestTotalMem')}
                                        style={{
                                            width: '100%',
                                            marginRight: 12,
                                            flexBasis: '50%',
                                        }}
                                        rules={rules['space_req_mem']}
                                    >
                                        <Input
                                            disabled={!canSetLimit}
                                            type="number"
                                            onChange={(e: any) => set_space_req_mem(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="space_limits_mem"
                                        label={t('resources.space.fields.limitTotalMem')}
                                        style={{ flexBasis: '50%' }}
                                        rules={rules['space_limits_mem']}
                                    >
                                        <Input
                                            disabled={!canSetLimit}
                                            type="number"
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
                                        rules={rules['space_req_cpu']}
                                    >
                                        <Input
                                            disabled={!canSetLimit}
                                            type="number"
                                            onChange={(e: any) => set_space_req_cpu(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="space_limits_cpu"
                                        label={t('resources.space.fields.limitTotalCPU')}
                                        style={{ flexBasis: '50%' }}
                                        rules={rules['space_limits_cpu']}
                                    >
                                        <Input
                                            disabled={!canSetLimit}
                                            type="number"
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
                                    <Form.Item style={{ flexBasis: '50%', visibility: 'hidden' }} />
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
                            </LimitWrap>
                        )}
                        <OtherConfigItem>
                            <Icon component={IconSleep} style={{ fontSize: 34, marginRight: 8 }} />
                            <FormFlexBox>
                                <DescBox>
                                    <span>{t('resources.cost.sleepMode')}</span>
                                    <span>{t('resources.cost.formDesc')}</span>
                                </DescBox>
                                <Form.Item name="configSleep">
                                    <Switch checked={showCost} onChange={handleConfigSleep} />
                                </Form.Item>
                            </FormFlexBox>
                        </OtherConfigItem>
                        {showCost && (
                            <SleepModeWrap>
                                <Divide style={{ marginBottom: 12 }} />
                                <FormFlexBox>
                                    <Form.Item
                                        label={t('resources.cost.sleepTimeRange')}
                                        style={{
                                            width: 420,
                                            marginRight: 12,
                                            flexBasis: '50%',
                                            marginBottom: 4,
                                        }}
                                    >
                                        <TimePicker>
                                            {sleepTimeList.map((item, key) => {
                                                return (
                                                    <div key={key} className="time-item">
                                                        <Popover
                                                            trigger="click"
                                                            key={key}
                                                            visible={item.isEdit}
                                                            onVisibleChange={(visible) => {
                                                                handleShowEditTime(key, visible);
                                                            }}
                                                            content={
                                                                <TimerPickerPanel
                                                                    handleHide={() =>
                                                                        handleShowEditTime(
                                                                            key,
                                                                            false
                                                                        )
                                                                    }
                                                                    index={key}
                                                                    defaultValue={item}
                                                                    handleSelect={
                                                                        handleEditSleepTime
                                                                    }
                                                                />
                                                            }
                                                        >
                                                            <div>
                                                                <span className="weekday">
                                                                    {`${item?.start?.[0].label}`}
                                                                </span>
                                                                {` ${item?.start?.[1].label} ~ `}
                                                                <span className="weekday">
                                                                    {`${item?.end?.[0].label}`}
                                                                </span>
                                                                {`${item?.end?.[1].label}`}
                                                            </div>
                                                        </Popover>
                                                        <div
                                                            className="icon"
                                                            onClick={(e: any) => {
                                                                e.nativeEvent.stopImmediatePropagation();
                                                                handleDeleteTime(key);
                                                            }}
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
                                                        handleSelect={handleAddSleepTime}
                                                    />
                                                }
                                            >
                                                <div className="add-item" onClick={handleAddTime}>
                                                    <Icon
                                                        component={IconAdd}
                                                        style={{ fontSize: 16, marginRight: 4 }}
                                                    />
                                                    <span>{t('resources.cost.addTimeRange')}</span>
                                                </div>
                                            </Popover>
                                        </TimePicker>
                                        <RuleTip className="rule-tip">
                                            {t('resources.cost.ruleTip')}
                                        </RuleTip>
                                    </Form.Item>
                                </FormFlexBox>
                            </SleepModeWrap>
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
