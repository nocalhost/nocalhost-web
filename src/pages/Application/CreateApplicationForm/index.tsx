import { Button, Form, Input, Radio, Select, message, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import { MANIFEST_TYPE, SOURCE_TYPE } from '../const';
import { ButtonBox, Footer, FormBox, AddInputBtn } from './style-components';
import './resetAntd.css';
import { MinusCircleFilled } from '@ant-design/icons';
import HTTP from '../../../api/fetch';
import { useTranslation } from 'react-i18next';
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
    const [resourceDirList, setResourceDirList] = useState<string[]>([]);
    const [form] = Form.useForm();
    const isEdit = Object.prototype.hasOwnProperty.call(props?.formData || {}, 'id');
    const { t } = useTranslation();
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
        setResourceDirList([]);
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
            const result = await HTTP.put(`/application/${props?.formData?.id}`, {
                context,
                status: 1,
            });
            if (result.code === 0) {
                message.success(t('common.message.edit'));
                props.onOk();
            }
        } else {
            const result = await HTTP.post(`/application`, {
                context,
                status: 1,
            });
            if (result.code === 0) {
                message.success(t('common.message.add'));
                props.onOk();
            }
        }
    };
    // resource_dir
    const renderGitForm = () => {
        return (
            <>
                <Form.Item
                    label={t('resources.application.fields.git_repo_url')}
                    name="application_url"
                    rules={[{ required: true }]}
                >
                    <Input placeholder={t('resources.application.form.placeholder.git')} />
                </Form.Item>
                <Form.Item label="Manifest 类型" name="install_type" rules={[{ required: true }]}>
                    <Select style={{ width: '100%' }}>
                        <Select.Option value={MANIFEST_TYPE.MANIFEST}>Manifest</Select.Option>
                        <Select.Option value={MANIFEST_TYPE.HELMCHART}>Helm Chart</Select.Option>
                        <Select.Option value={MANIFEST_TYPE.KUSTOMIZE}>Kustomize</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={t('resources.application.tips.config_path')}
                    name="application_config_path"
                >
                    <Input placeholder={t('resources.application.form.placeholder.config')} />
                </Form.Item>
                <Form.Item label={t('resources.application.tips.resource_dir')}>
                    {resourceDirList.map((item, index) => (
                        <div style={{ marginBottom: '8px' }} key={index}>
                            <Input
                                addonBefore={t('resources.application.tips.path', {
                                    index: index + 1,
                                })}
                                value={item}
                                onChange={(e) => {
                                    const newResourceDirList = resourceDirList.concat([]);
                                    newResourceDirList[index] = e.target.value;
                                    setResourceDirList(newResourceDirList);
                                }}
                                addonAfter={
                                    <Tooltip title={t('common.bt.remove')} placement="top">
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
                                    </Tooltip>
                                }
                                placeholder={t(
                                    'resources.application.form.placeholder.resource_dir'
                                )}
                            />
                        </div>
                    ))}
                </Form.Item>
                <AddInputBtn
                    onClick={() => {
                        resourceDirList.push('');
                        setResourceDirList(resourceDirList.concat([]));
                    }}
                >
                    {t('resources.application.tips.addPath')}
                </AddInputBtn>
            </>
        );
    };
    const renderHelmForm = () => {
        return (
            <>
                <Form.Item
                    label={t('resources.application.fields.helm_repo_url')}
                    name="application_url"
                    rules={[{ required: true }]}
                >
                    <Input placeholder={t('resources.application.form.placeholder.helm')} />
                </Form.Item>
                <Form.Item
                    label={t('resources.application.fields.install_type')}
                    name="install_type"
                    rules={[{ required: true }]}
                >
                    <Select style={{ width: '100%' }}>
                        <Select.Option value={MANIFEST_TYPE.HELMCHART}>Helm Chart</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label={t('resources.application.fields.nocalhost_config')}
                    name="nocalhost_config"
                >
                    <Input.TextArea
                        placeholder={t('resources.application.form.placeholder.nc_config')}
                        autoSize={{ minRows: 3 }}
                    ></Input.TextArea>
                </Form.Item>
            </>
        );
    };
    const renderLocalForm = () => {
        return (
            <>
                <Form.Item
                    label={t('resources.application.fields.install_type')}
                    name="install_type"
                    rules={[{ required: true }]}
                >
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
                        label={t('resources.application.fields.application_name')}
                        name="application_name"
                        rules={[
                            {
                                required: true,
                                message: t('resources.application.form.placeholder.name'),
                            },
                        ]}
                    >
                        <Input
                            placeholder={t('resources.application.form.placeholder.name')}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t('resources.application.fields.source')}
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
                            <Button onClick={() => props.onCancel()}>
                                {t('common.bt.cancel')}
                            </Button>
                        </ButtonBox>
                        <ButtonBox>
                            <Button type="primary" htmlType="submit">
                                {t('common.bt.submit')}
                            </Button>
                        </ButtonBox>
                    </Footer>
                </Form>
            </FormBox>
        </div>
    );
}

export default CreateApplicationForm;
