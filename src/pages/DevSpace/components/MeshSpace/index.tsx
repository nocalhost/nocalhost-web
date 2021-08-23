import React, { useState, useEffect } from 'react';

import BreadCard from '../../../../components/BreadCard';
import { useTranslation } from 'react-i18next';

import { ContentWrap } from './style-components';
import { Steps, Button, Form, Select, Input, Radio, RadioChangeEvent, Switch, message } from 'antd';

import { queryAllCluster, queryAllUser } from '../../../../services';
import HTTP from '../../../../api/fetch';

import ResourceLimit from '../../../../components/ResourceLimit';
import ChooseCluster from './ChooseCluster';
import BaseSpace from './BaseSpace';
import Icon from '@ant-design/icons';
import { ReactComponent as IconResource } from '../../../../images/icon/icon_resource.svg';

interface SelectMap {
    text?: any;
    value: any;
    label: any;
    cluster_id?: number;
}

const MeshSpace = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(0);
    const [clusterList, setClusterList] = useState<SelectMap[]>([]);
    const [userList, setUserList] = useState<SelectMap[]>([]);
    const [spaceList, setSpaceList] = useState<SelectMap[]>([]);
    const [filterSpaceList, setFilterSpaceList] = useState<SelectMap[]>([]);
    const [appList, setAppList] = useState<any>([]);
    const [headerType, setHeaderType] = useState<string>('');
    const [formInfo, setFormInfo] = useState<any>({});
    const [showLimit, setShowLimit] = useState<boolean>(false);
    const [clusterId, setClusterId] = useState<any>();
    const [clusterMap, setClusterMap] = useState<any>();
    const [currentSpace, setCurrentSpace] = useState<any>();
    const [selectedAppList, setSelectedAppList] = useState<any>([]);
    const [meshAppInfo, setMeshAppInfo] = useState<any>();

    const [form] = Form.useForm();

    async function getAllCluster() {
        const clusterMap = await queryAllCluster();
        setClusterMap(clusterMap);
        const tmpList = Array.from(clusterMap).map((item) => {
            return {
                value: item[0],
                text: item[1],
                label: item[1],
            };
        });
        setClusterList(tmpList);
    }

    async function getAllUser() {
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

    async function getSpaceList() {
        const response = await HTTP.get(/* id ? `cluster/${id}/dev_space` : */ 'dev_space', null, {
            is_v2: true,
        });
        const { code, data } = response;
        if (code === 0) {
            const tmpList = data.map((item: any) => {
                return {
                    ...item,
                    value: item.id,
                    label: item.space_name,
                    cluster_id: item.cluster_id,
                };
            });
            setSpaceList(tmpList);
        }
    }

    async function getAppList(id: number) {
        const response = await HTTP.get(`dev_space/${id}/mesh_apps_info`);
        const { code, data } = response;
        if (code === 0) {
            try {
                const tmpList: any = [];
                data.apps.forEach((application: any) => {
                    application.workloads.forEach((workload: any) => {
                        tmpList.push({
                            appName: application.name,
                            ...workload,
                            label: `${application.name}:${workload.name}`,
                            value: JSON.stringify({
                                appName: application.name,
                                ...workload,
                            }),
                        });
                    });
                });
                setAppList(tmpList);
            } catch (e) {
                setAppList([]);
            }
        }
    }

    async function generateNamespace() {
        const response = await HTTP.get(`cluster/${clusterId}/gen_namespace`);
        return response.data.namespace;
    }

    const handleClusterChange = (id: number) => {
        const tmpList = spaceList.filter((item: any) => item.cluster_id === id);
        setClusterId(id);
        setFilterSpaceList(tmpList);
        setAppList([]);
        setCurrentSpace(null);
        form.setFieldsValue({
            base_dev_space_id: '',
        });
    };

    const handleSubmit = async (values: any) => {
        if (currentStep === 0) {
            setFormInfo({
                ...values,
            });
        } else {
            const namespace = await generateNamespace();
            const { header, header_key, header_value } = values;
            const {
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

            const response = await HTTP.post('dev_space', {
                ...formInfo,
                ...values,
                space_resource_limit: limitObj,
                mesh_dev_space: true,
                cluster_admin: 0,
                isLimit: Boolean(resource_limit_set),
                mesh_dev_info: {
                    header: {
                        key: header === 'Custom' ? header_key : header,
                        value: header === 'Custom' ? header_value : namespace,
                    },
                    apps: meshAppInfo,
                },
            });

            if (response.code === 0) {
                message.success(t('resources.space.tips.addSuccess'));
            }
        }

        setCurrentStep(1);
    };

    const handleChangeBase = (id: number) => {
        const currentItem = spaceList.filter((item: any) => item.id === id);
        setCurrentSpace(currentItem[0]);
        getAppList(id);
    };

    const handleChangeHeader = (e: RadioChangeEvent) => {
        setHeaderType(e.target.value);
    };

    useEffect(() => {
        getAllCluster();
        getAllUser();
        getSpaceList();
    }, []);

    const handleSelectApp = (value: any) => {
        try {
            const selectedArr = value.map((item: any) => {
                const obj = JSON.parse(item);
                return {
                    name: `${obj.appName}:${obj.name}`,
                    kind: obj.kind,
                };
            });

            setSelectedAppList(selectedArr);
            const selectedNameArr = selectedArr.map((item: any) => item.name);
            // 组装apps
            const appMap = new Map();
            appList.forEach((item: any) => {
                const tmp = appMap.get(item.appName);
                tmp
                    ? tmp.workloads.push({
                          name: item.name,
                          kind: item.kind,
                          status: selectedNameArr.includes(item.label) ? 1 : 0,
                      })
                    : appMap.set(item.appName, {
                          workloads: [
                              {
                                  name: item.name,
                                  kind: item.kind,
                                  status: selectedNameArr.includes(item.label) ? 1 : 0,
                              },
                          ],
                      });
            });
            const tmpAppList = Array.from(appMap).map((item: any) => {
                return {
                    ...item[1],
                    name: item[0],
                };
            });
            setMeshAppInfo(tmpAppList);
        } catch (e) {
            setAppList([]);
        }
    };

    return (
        <>
            <BreadCard
                data={{
                    menu: t('resources.devSpace.name'),
                    subMenu: t('resources.devSpace.createMesh'),
                    route: '/dashboard/devspace',
                }}
            />
            <ContentWrap>
                <div className="left">
                    <Steps
                        style={{ padding: '0 56px' }}
                        labelPlacement="vertical"
                        current={currentStep}
                    >
                        <Steps.Step title={t('resources.meshSpace.selectBasic')} />
                        <Steps.Step title={t('resources.meshSpace.create')} />
                    </Steps>
                    <Form
                        form={form}
                        layout="vertical"
                        style={{ marginTop: 30 }}
                        onFinish={handleSubmit}
                    >
                        {currentStep === 0 && (
                            <>
                                <Form.Item
                                    label={t('resources.space.fields.user')}
                                    rules={[{ required: true }]}
                                    name="user_id"
                                >
                                    <Select showSearch options={userList} />
                                </Form.Item>
                                <Form.Item
                                    label={t('resources.space.fields.cluster')}
                                    rules={[{ required: true }]}
                                    name="cluster_id"
                                >
                                    <Select
                                        showSearch
                                        options={clusterList}
                                        onChange={handleClusterChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label={t('resources.meshSpace.basicSpace')}
                                    name="base_dev_space_id"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        onChange={handleChangeBase}
                                        showSearch
                                        options={filterSpaceList}
                                    />
                                </Form.Item>
                            </>
                        )}
                        {currentStep === 1 && (
                            <>
                                <Form.Item
                                    label={t('resources.meshSpace.spaceName')}
                                    name="space_name"
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label={t('resources.meshSpace.tracingHeader')}
                                    name="header"
                                    rules={[{ required: true }]}
                                >
                                    <Radio.Group onChange={handleChangeHeader}>
                                        <Radio value={'Jaeger'}>Jaeger</Radio>
                                        <Radio value={'Zipkin'}>Zipkin</Radio>
                                        <Radio value={'Custom'}>Custom</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                {headerType === 'Custom' && (
                                    <div className="header-box">
                                        <Form.Item
                                            label="Tracing Headers"
                                            name="header-key"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="Tracing headers" />
                                        </Form.Item>
                                        <Form.Item
                                            label="Value"
                                            name="header-value"
                                            style={{ marginBottom: 0 }}
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="Value" />
                                        </Form.Item>
                                    </div>
                                )}
                                <Form.Item
                                    label={t('resources.meshSpace.devService')}
                                    name="service_name"
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        mode="multiple"
                                        onChange={handleSelectApp}
                                        options={appList}
                                    />
                                </Form.Item>
                                <div className="resource-limit">
                                    <div className="resource-limit-check">
                                        <div className="limit-desc">
                                            <Icon
                                                component={IconResource}
                                                style={{ fontSize: 32, marginRight: 8 }}
                                            />
                                            <div className="desc-main">
                                                <span>
                                                    {t('resources.space.fields.resource_limit')}
                                                </span>
                                                {false && (
                                                    <span>
                                                        {t('resources.space.fields.setLimitDesc')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Form.Item name="resource_limit_set">
                                            <Switch
                                                checked={showLimit}
                                                onChange={(checked: boolean) =>
                                                    setShowLimit(checked)
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    {showLimit && <ResourceLimit canSetLimit={true} />}
                                </div>
                            </>
                        )}
                        <div className="btn-box">
                            <Button style={{ marginRight: 12 }}>{t('common.bt.cancel')}</Button>
                            {currentStep === 1 && (
                                <Button onClick={() => setCurrentStep(0)}>
                                    {t('common.bt.prev')}
                                </Button>
                            )}
                            {currentStep === 0 && (
                                <Button htmlType="submit" type="primary">
                                    {t('common.bt.next')}
                                </Button>
                            )}
                            {currentStep === 1 && (
                                <Button style={{ marginLeft: 12 }} type="primary" htmlType="submit">
                                    {t('common.bt.confirm')}
                                </Button>
                            )}
                        </div>
                    </Form>
                </div>
                <div className="right">
                    {!clusterId && <ChooseCluster />}
                    {clusterId && (
                        <BaseSpace
                            clusterName={clusterMap.get(clusterId)}
                            currentSpace={currentSpace}
                            appList={appList}
                            selectedAppList={selectedAppList}
                            currentStep={currentStep}
                        />
                    )}
                </div>
            </ContentWrap>
        </>
    );
};

export default MeshSpace;
