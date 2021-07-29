import { Button, Form, Input, Radio, Select } from 'antd';
import React, { useState } from 'react';
import { ButtonBox, Footer, FormBox, AddInputBtn } from './style-components';
import './resetAntd.css';
import { MinusCircleFilled } from '@ant-design/icons';

interface PropsType {
    onCancel(): void;
}
function CreateApplicationForm(props: PropsType) {
    const [value, setValue] = useState(1);

    const onChange = (e: any) => {
        setValue(e.target.value);
    };
    const renderSwitchForm = () => {
        switch (value) {
            case 1:
                return renderGitForm();
            case 2:
                return renderHelmForm();
            case 3:
                return renderLocalForm();
            default:
                break;
        }
    };
    const handleChange = () => {
        console.log(123);
    };
    const deleteGitUrl = () => {
        console.log(123);
    };
    const renderGitForm = () => {
        return (
            <>
                <Form.Item label="Git 仓库地址" name="git" rules={[{ required: true }]}>
                    <Input placeholder="请输入 Git 仓库地址." />
                </Form.Item>
                <Form.Item label="Manifest 类型" name="manifest" rules={[{ required: true }]}>
                    <Select
                        defaultValue="Manifest"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                    >
                        <Select.Option value="Manifest">Manifest</Select.Option>
                        <Select.Option value="HelmChart">Helm Chart</Select.Option>
                        <Select.Option value="Kustomize">Kustomize</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="应用配置文件，一般存放于 .nocalhost 目录下" name="yalm">
                    <Input placeholder="请输入应用配置文件 config.yalm" />
                </Form.Item>
                <Form.Item label="Git 仓库的相对路径" name="git">
                    <Input
                        addonBefore="路径1"
                        addonAfter={
                            <MinusCircleFilled
                                onClick={() => deleteGitUrl}
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
                </Form.Item>
                <AddInputBtn>添加路径</AddInputBtn>
            </>
        );
    };
    const renderHelmForm = () => {
        return (
            <>
                <Form.Item label="Helm 仓库地址" name="helm" rules={[{ required: true }]}>
                    <Input placeholder="请输入 Helm 仓库地址." />
                </Form.Item>
                <Form.Item label="Manifest 类型" name="manifest" rules={[{ required: true }]}>
                    <Select
                        defaultValue="HelmChart"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                    >
                        <Select.Option value="HelmChart">Helm Chart</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Nocalhost 配置信息" name="noyalm">
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
                <Form.Item label="Manifest 类型" name="manifest" rules={[{ required: true }]}>
                    <Select
                        defaultValue="HelmChart"
                        style={{ width: '100%' }}
                        onChange={handleChange}
                    >
                        <Select.Option value="HelmChart">Helm Chart</Select.Option>
                    </Select>
                </Form.Item>
            </>
        );
    };
    return (
        <div id="creareApplicationForm">
            <FormBox>
                <Form>
                    <Form.Item
                        label="应用名称"
                        name="application"
                        rules={[{ required: true, message: '请输入应用名称.' }]}
                    >
                        <Input placeholder="请输入应用名称." />
                    </Form.Item>
                </Form>
                <Form>
                    <Form.Item
                        label="Kubernetes Manifest 安装来源"
                        name="k8sType"
                        rules={[{ required: true }]}
                    >
                        <Radio.Group value={value} onChange={onChange}>
                            <Radio value={1}>Git</Radio>
                            <Radio value={2}>Helm Repo</Radio>
                            <Radio value={3}>Local</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {renderSwitchForm()}
                </Form>
                <Footer>
                    <ButtonBox>
                        <Button onClick={() => props.onCancel()}>取消</Button>
                    </ButtonBox>
                    <ButtonBox>
                        <Button type="primary">完成</Button>
                    </ButtonBox>
                </Footer>
            </FormBox>
        </div>
    );
}

export default CreateApplicationForm;
