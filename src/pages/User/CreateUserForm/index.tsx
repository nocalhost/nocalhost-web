import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, Input, Switch, message } from 'antd';
import { FormBox, Card, Title, Info, Footer, ButtonBox } from './style-components';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './resetAntd.css';
import HTTP from '../../../api/fetch';
import { useTranslation } from 'react-i18next';
interface PropsType {
    onCancel(): void;
    onOk(): void;
    formData?: FormType;
}

interface FormType {
    email?: string;
    is_admin?: number;
    name?: string;
    status?: number;
    id?: number | string;
    isDetail?: boolean | undefined;
}

// confirm_password: "a19930731"
// email: "296115103@qq.com"
// is_admin: 0
// name: "chuckie"
// password: "a19930731"
// status: 1

const initFormValue = {
    confirm_password: '',
    email: '',
    is_admin: 0,
    name: '',
    password: '',
    status: 1,
};

function CreateUserForm(props: PropsType) {
    const [values, setValues] = useState({ ...initFormValue });
    const [form] = Form.useForm();
    const isEdit = Object.prototype.hasOwnProperty.call(props?.formData || {}, 'id');
    const couterRef = useRef<boolean>();
    const { t } = useTranslation();
    useEffect(() => {
        setValues({ ...initFormValue, ...props.formData });
        form.setFieldsValue({
            name: props?.formData?.name,
            email: props?.formData?.email,
        });
    }, [props.formData]);
    const onChangeStatus = (checked: boolean) => {
        setValues({ ...values, status: checked ? 1 : 0 });
    };
    const onChangeAdmin = (checked: boolean) => {
        setValues({ ...values, is_admin: checked ? 1 : 0 });
    };
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const onFinish = async () => {
        if (isEdit) {
            const result = await HTTP.put(`/users/${props?.formData?.id}`, {
                ...values,
            });
            if (result.code === 0) {
                props.onOk();
                message.success(t('common.message.edit'));
            }
        } else {
            const result = await HTTP.post(`/users`, {
                ...values,
            });
            if (result.code === 0) {
                message.success(t('common.message.add'));
                if (couterRef.current) {
                    form.resetFields();
                } else {
                    props.onOk();
                }
            }
        }
    };
    const checkConfirmPassword = (_: any, value: any) => {
        if (value !== values.password) {
            return Promise.reject(new Error(t('resources.users.valid.comfirmPassword')));
        }
        return Promise.resolve();
    };
    return (
        <div id="creareUserForm">
            <FormBox>
                <Form onFinish={onFinish} form={form} validateTrigger="onBlur">
                    <Form.Item
                        label={t('resources.users.fields.name')}
                        name="name"
                        rules={[{ required: true, message: t('resources.users.valid.name') }]}
                    >
                        <Input
                            disabled={props.formData?.isDetail}
                            value={values.name}
                            name="name"
                            placeholder={t('resources.users.form.placeholder.name')}
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t('resources.users.fields.email')}
                        name="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,
                                message: t('resources.users.valid.email'),
                            },
                        ]}
                    >
                        <Input
                            disabled={props.formData?.isDetail}
                            value={values.email}
                            placeholder={t('resources.users.form.placeholder.email')}
                            name="email"
                            onChange={handleInputChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label={t('resources.users.fields.password')}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: t('resources.users.valid.password'),
                                min: 6,
                            },
                        ]}
                    >
                        <Input.Password
                            disabled={props.formData?.isDetail}
                            value={values.password}
                            name="password"
                            placeholder={t('resources.users.form.placeholder.password')}
                            onChange={handleInputChange}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label={t('resources.users.fields.confirm_password')}
                        name="confirm_password"
                        validateTrigger="onBlur"
                        rules={[{ validator: checkConfirmPassword, required: true, min: 6 }]}
                    >
                        <Input.Password
                            disabled={props.formData?.isDetail}
                            onChange={handleInputChange}
                            name="confirm_password"
                            placeholder={t('resources.users.form.placeholder.confirm_password')}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Card>
                        <div>
                            <Title>{t('resources.users.formLabel.statusTitle')}</Title>
                            <Info>{t('resources.users.formLabel.statusInfo')}</Info>
                        </div>
                        <Switch
                            disabled={props.formData?.isDetail}
                            checked={values.status === 1}
                            onChange={onChangeStatus}
                        />
                    </Card>
                    <Card>
                        <div>
                            <Title>{t('resources.users.formLabel.adminTitle')}</Title>
                            <Info>{t('resources.users.formLabel.adminInfo')}</Info>
                        </div>
                        <Switch
                            disabled={props.formData?.isDetail}
                            checked={values.is_admin === 1}
                            onChange={onChangeAdmin}
                        />
                    </Card>
                    {!props.formData?.isDetail && (
                        <Footer>
                            <ButtonBox>
                                <Button onClick={() => props.onCancel()}>
                                    {t('common.bt.cancel')}
                                </Button>
                            </ButtonBox>
                            <ButtonBox>
                                <Button
                                    htmlType="submit"
                                    onClick={() => {
                                        couterRef.current = false;
                                    }}
                                >
                                    {' '}
                                    {t('common.bt.submit')}
                                </Button>
                            </ButtonBox>
                            {!isEdit && (
                                <ButtonBox>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        onClick={() => {
                                            couterRef.current = true;
                                        }}
                                    >
                                        {t('common.bt.submitGoon')}
                                    </Button>
                                </ButtonBox>
                            )}
                        </Footer>
                    )}
                </Form>
            </FormBox>
        </div>
    );
}

export default CreateUserForm;
