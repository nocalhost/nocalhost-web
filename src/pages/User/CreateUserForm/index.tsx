import React, { useState } from 'react';
import { Button, Form, Input, Switch } from 'antd';
import { FormBox, Card, Title, Info, Footer, ButtonBox } from './style-components';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './resetAntd.css';

interface PropsType {
    onCancel(): void;
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
    const [values, setValues] = useState(initFormValue);
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
    const onFinish = () => {
        console.log(values);
    };
    const checkConfirmPassword = (_: any, value: any) => {
        if (value !== values.password) {
            return Promise.reject(new Error('两次密码输入不一致'));
        }
        return Promise.resolve();
    };
    return (
        <div id="creareUserForm">
            <FormBox>
                <Form onFinish={onFinish} validateTrigger="onBlur">
                    <Form.Item
                        label="用户名称"
                        name="name"
                        rules={[{ required: true, message: '请输入用户名.' }]}
                    >
                        <Input value={values.name} name="name" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{ type: 'email', required: true, message: '请输入正确的邮箱号.' }]}
                    >
                        <Input value={values.email} name="email" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入正确密码.', min: 6 }]}
                    >
                        <Input.Password
                            value={values.password}
                            name="password"
                            onChange={handleInputChange}
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="confirm_password"
                        validateTrigger="onBlur"
                        rules={[{ validator: checkConfirmPassword, required: true, min: 6 }]}
                    >
                        <Input.Password
                            onChange={handleInputChange}
                            name="confirm_password"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Card>
                        <div>
                            <Title>是否激活使用状态</Title>
                            <Info>状态开启则用户可以正常使用 Nocalhost 产品</Info>
                        </div>
                        <Switch defaultChecked onChange={onChangeStatus} />
                    </Card>
                    <Card>
                        <div>
                            <Title>是否设置为管理员</Title>
                            <Info>设置为管理员，则该用户有权限添加编辑用户、集群</Info>
                        </div>
                        <Switch onChange={onChangeAdmin} />
                    </Card>
                    <Footer>
                        <ButtonBox>
                            <Button onClick={() => props.onCancel()}>取消</Button>
                        </ButtonBox>
                        <ButtonBox>
                            <Button htmlType="submit">完成</Button>
                        </ButtonBox>
                        <ButtonBox>
                            <Button type="primary">完成并继续添加</Button>
                        </ButtonBox>
                    </Footer>
                </Form>
            </FormBox>
        </div>
    );
}

export default CreateUserForm;
