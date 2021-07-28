import React, { useState } from 'react';
import { Button, Form, Input, Switch } from 'antd';
import { FormBox, Card, Title, Info, Footer, ButtonBox } from './style-components';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import './resetAntd.css';

interface PropsType {
    onCancel(): void;
}

function CreateUserForm(props: PropsType) {
    const [, setIsActive] = useState(true);
    const [, setIsAdmin] = useState(false);
    const onChangeStatus = (checked: boolean) => {
        setIsActive(checked);
    };
    const onChangeAdmin = (checked: boolean) => {
        setIsAdmin(checked);
    };

    return (
        <div id="creareUserForm">
            <FormBox>
                <Form>
                    <Form.Item
                        label="用户名称"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="邮箱"
                        name="email"
                        rules={[{ type: 'email', message: '请输入正确的邮箱号.' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码.' }]}
                    >
                        <Input.Password
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="enter-password"
                        rules={[{ required: true, message: '请输入确认密码.' }]}
                    >
                        <Input.Password
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                </Form>
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
                        <Button>完成</Button>
                    </ButtonBox>
                    <ButtonBox>
                        <Button type="primary">完成并继续添加</Button>
                    </ButtonBox>
                </Footer>
            </FormBox>
        </div>
    );
}

export default CreateUserForm;
