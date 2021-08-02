import { Button, Form, Input, Radio, Select, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { MANIFEST_TYPE, SOURCE_TYPE } from '../const';
import { ButtonBox, Footer, FormBox, AddInputBtn } from './style-components';
import './resetAntd.css';
import { MinusCircleFilled } from '@ant-design/icons';
import HTTP from '../../../api/fetch';
interface PropsType {
    onCancel(): void;
    onOk(): void;
    formData?: FormType;
}

interface FormType {
    context?: string;
    id?: number | string;
}

function CreateApplicationForm(props: PropsType) {
    const [value, setValue] = useState(SOURCE_TYPE.GIT);
    const [name, setName] = useState('');
    const [resourceDirList, setResourceDirList] = useState(['']);
    const [form] = Form.useForm();
    const isEdit = Object.prototype.hasOwnProperty.call(props.formData, 'id');
    useEffect(() => {
        if (isEdit) {
            const context = JSON.parse(props?.formData?.context || '{}');
            form.setFieldsValue({
                ...context,
            });
            setValue(context?.source);
            if (context?.resource_dir?.length > 0) {
                setResourceDirList(context.resource_dir);
            }
        }
    }, [props.formData]);
    const onChange = (e: any) => {
        if (e.target.value !== value) {
            onReset();
        }
        form.setFieldsValue({
            source: e.target.value,
            application_name: name,
        });
        setValue(e.target.value);
        setResourceDirList(['']);
    };
    const renderSwitchForm = () => {
        switch (value) {
            case SOURCE_TYPE.GIT:
                return renderGitForm();
            case SOURCE_TYPE.HELM_REPO:
                return renderHelmForm();
            case SOURCE_TYPE.LOCAL:
                return renderLocalForm();
            default:
                break;
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    const onFinish = async (values: any) => {
        const context = JSON.stringify({
            application_url: ' ',
            ...values,
            resource_dir: values.source === 'git' ? resourceDirList : [],
        });
        if (isEdit) {
            try {
                await HTTP.put(`/application/${props?.formData?.id}`, {
                    context,
                    status: 1,
                });
                message.success('修改成功');
                props.onOk();
            } catch (error) {}
        } else {
            try {
                await HTTP.post(`/application`, {
                    context,
                    status: 1,
                });
                message.success('添加成功');
                props.onOk();
            } catch (error) {}
        }
    };
    // resource_dir
    const renderGitForm = () => {
        return (
            <>
                <Form.Item label="Git 仓库地址" name="application_url" rules={[{ required: true }]}>
                    <Input placeholder="请输入 Git 仓库地址." />
                </Form.Item>
                <Form.Item label="Manifest 类型" name="install_type" rules={[{ required: true }]}>
                    <Select style={{ width: '100%' }}>
                        <Select.Option value={MANIFEST_TYPE.MANIFEST}>Manifest</Select.Option>
                        <Select.Option value={MANIFEST_TYPE.HELMCHART}>Helm Chart</Select.Option>
                        <Select.Option value={MANIFEST_TYPE.KUSTOMIZE}>Kustomize</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="应用配置文件，一般存放于 .nocalhost 目录下"
                    name="application_config_path"
                >
                    <Input placeholder="请输入应用配置文件 config.yaml" />
                </Form.Item>
                <Form.Item label="Git 仓库的相对路径">
                    {resourceDirList.map((item, index) => (
                        <div style={{ marginBottom: '8PX' }} key={index}>
                            <Input
                                addonBefore={`路径${index + 1}`}
                                value={item}
                                onChange={(e) => {
                                    const newResourceDirList = resourceDirList.concat([]);
                                    newResourceDirList[index] = e.target.value;
                                    setResourceDirList(newResourceDirList);
                                }}
                                addonAfter={
                                    <MinusCircleFilled
                                        onClick={() => {
                                            const newResourceDirList = resourceDirList.filter(
                                                (item, ind) => index !== ind
                                            );
                                            setResourceDirList(newResourceDirList);
                                        }}
                                        style={{
                                            color: '#ff3f3f',
                                            fontSize: '18px',
                                            position: 'relative',
                                            top: '2px',
                                            cursor: 'pointer',
                                        }}
                                    />
                                }
                                placeholder="请输入路径"
                            />
                        </div>
                    ))}
                </Form.Item>
                <AddInputBtn
                    onClick={() => {
                        const newResourceDirList = resourceDirList.concat(['']);
                        setResourceDirList(newResourceDirList);
                    }}
                >
                    添加路径
                </AddInputBtn>
            </>
        );
    };
    const renderHelmForm = () => {
        return (
            <>
                <Form.Item
                    label="Helm 仓库地址"
                    name="application_url"
                    rules={[{ required: true }]}
                >
                    <Input placeholder="请输入 Helm 仓库地址." />
                </Form.Item>
                <Form.Item label="Manifest 类型" name="install_type" rules={[{ required: true }]}>
                    <Select style={{ width: '100%' }}>
                        <Select.Option value={MANIFEST_TYPE.HELMCHART}>Helm Chart</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Nocalhost 配置信息" name="nocalhost_config">
                    <Input.TextArea
                        placeholder="请输入正确的配置信息"
                        autoSize={{ minRows: 3 }}
                    ></Input.TextArea>
                </Form.Item>
            </>
        );
    };
    const renderLocalForm = () => {
        return (
            <>
                <Form.Item label="Manifest 类型" name="install_type" rules={[{ required: true }]}>
                    <Select style={{ width: '100%' }}>
                        <Select.Option value={MANIFEST_TYPE.MANIFESTLOCAL}>Manifest</Select.Option>
                        <Select.Option value={MANIFEST_TYPE.HELMCHARTLOCAL}>
                            Helm Chart
                        </Select.Option>
                        <Select.Option value={MANIFEST_TYPE.KUSTOMIZELOCAL}>
                            Kustomize
                        </Select.Option>
                    </Select>
                </Form.Item>
            </>
        );
    };
    return (
        <div id="creareApplicationForm">
            <FormBox>
                <Form
                    onFinish={onFinish}
                    form={form}
                    initialValues={{
                        source: SOURCE_TYPE.GIT,
                        // install_type: MANIFEST_TYPE.HELMCHART,
                    }}
                >
                    <Form.Item
                        label="应用名称"
                        name="application_name"
                        rules={[{ required: true, message: '请输入应用名称.' }]}
                    >
                        <Input
                            placeholder="请输入应用名称."
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Kubernetes Manifest 安装来源"
                        name="source"
                        rules={[{ required: true }]}
                    >
                        <Radio.Group onChange={onChange}>
                            <Radio value={SOURCE_TYPE.GIT}>Git</Radio>
                            <Radio value={SOURCE_TYPE.HELM_REPO}>Helm Repo</Radio>
                            <Radio value={SOURCE_TYPE.LOCAL}>Local</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {renderSwitchForm()}
                    <Footer>
                        <ButtonBox>
                            <Button onClick={() => props.onCancel()}>取消</Button>
                        </ButtonBox>
                        <ButtonBox>
                            <Button type="primary" htmlType="submit">
                                完成
                            </Button>
                        </ButtonBox>
                    </Footer>
                </Form>
            </FormBox>
        </div>
    );
}

export default CreateApplicationForm;
