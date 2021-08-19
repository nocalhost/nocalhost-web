import React, { useState, useEffect } from 'react';

import BreadCard from '../../../components/BreadCard';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Steps, Button, Form, Select, Input, Radio, RadioChangeEvent } from 'antd';

import { queryAllCluster, queryAllUser } from '../../../services';
import HTTP from '../../../api/fetch';

const ContentWrap = styled.div`
    display: flex;
    padding: 24px;

    min-height: 772px;
    margin-right: 24px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(40, 47, 55, 0.05);

    .left {
        width: 420px;
        padding-right: 24px;
        position: relative;

        .ant-steps-item-title {
            font-size: 12px;
        }

        .ant-form-item-control-input {
            box-shadow: none;
        }

        .header-box {
            padding: 0 12px 12px;
            background: #f9fbfd;
            border-radius: 4px;
        }

        .btn-box {
            width: 100%;
            position: absolute;
            padding-right: 24px;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: flex-end;
        }
    }

    .right {
        flex: 1;

        background: linear-gradient(-180deg, rgb(235, 250, 255) 0%, rgb(255, 255, 255) 100%);
    }
`;

interface SelectMap {
    text?: any;
    value: any;
    label: any;
    cluster_id?: number;
}

const MeshSpace = () => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const [clusterList, setClusterList] = useState<SelectMap[]>([]);
    const [userList, setUserList] = useState<SelectMap[]>([]);
    const [spaceList, setSpaceList] = useState<SelectMap[]>([]);
    const [filterSpaceList, setFilterSpaceList] = useState<SelectMap[]>([]);
    const [appList, setAppList] = useState<any>([]);
    const [headerType, setHeaderType] = useState<string>('');

    const [form] = Form.useForm();

    async function getAllCluster() {
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
                const tmpList = data.apps.map((item: any) => {
                    return {
                        value: JSON.stringify(item),
                        label: item.name,
                    };
                });
                setAppList(tmpList);
            } catch (e) {
                setAppList([]);
            }
        }
    }

    const handleClusterChange = (id: number) => {
        const tmpList = spaceList.filter((item: any) => item.cluster_id === id);
        setFilterSpaceList(tmpList);
        form.setFieldsValue({
            base_dev_space_id: '',
        });
    };

    const handleSubmit = (value: any) => {
        console.log(value);
        setCurrentStep(1);
    };

    const handleChangeBase = (id: number) => {
        getAppList(id);
    };

    const handleChangeHeader = (e: RadioChangeEvent) => {
        console.log(e.target.value);
        setHeaderType(e.target.value);
    };

    useEffect(() => {
        getAllCluster();
        getAllUser();
        getSpaceList();
    }, []);

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
                                    <Select options={appList} />
                                </Form.Item>
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
                <div className="right"></div>
            </ContentWrap>
        </>
    );
};

export default MeshSpace;
