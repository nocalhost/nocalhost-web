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
    password?: string;
    confirm_password?: string;
}

const initFormValue = {
    confirm_password: '',
    email: '',
    is_admin: 0,
    name: '',
    password: '',
    status: 1,
};

function CreateUserForm(props: PropsType) {
    const [values, setValues] = useState<FormType>({ ...initFormValue });
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
            let editValue = values;
            if (!values.password) {
                editValue = {
                    email: values.email,
                    name: values.name,
                    is_admin: values.is_admin,
                    status: values.status,
                };
            }

            const result = await HTTP.put(`users/${props?.formData?.id}`, {
                ...editValue,
            });
            if (result.code === 0) {
                props.onOk();
                message.success(t('common.message.edit'));
            }
        } else {
            const result = await HTTP.post(`users`, {
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
        if (value && value.length < 6) {
            return Promise.reject(new Error(t('resources.users.valid.password')));
        }
        if ((values.password || value) && value !== values.password) {
            return Promise.reject(new Error(t('resources.users.valid.comfirmPassword')));
        }
        return Promise.resolve();
    };
    const checkPassword = (_: any, value: any) => {
        if (value && value.length < 6) {
            return Promise.reject(new Error(t('resources.users.valid.password')));
        }
        if (values.confirm_password && value && value !== values.confirm_password) {
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
                                required: !isEdit,
                                validator: checkPassword,
                            },
                        ]}
                    >
                        <Input.Password
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
                        rules={[{ validator: checkConfirmPassword, required: !isEdit }]}
                    >
                        <Input.Password
                            onChange={handleInputChange}
                            name="confirm_password"
                            placeholder={t('resources.users.form.placeholder.confirm_password')}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    {!props.formData?.isDetail && (
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
                    )}
                    {!props.formData?.isDetail && (
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
                    )}
                    <Footer>
                        <ButtonBox>
                            <Button onClick={() => props.onCancel()}>
                                {t('common.bt.cancel')}
                            </Button>
                        </ButtonBox>
                        <ButtonBox>
                            <Button
                                htmlType="submit"
                                type="primary"
                                onClick={() => {
                                    couterRef.current = false;
                                }}
                            >
                                {' '}
                                {t('common.bt.submit')}
                            </Button>
                        </ButtonBox>
                        {!isEdit && !props.formData?.isDetail && (
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
                </Form>
            </FormBox>
        </div>
    );
}

export default CreateUserForm;
