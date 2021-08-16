import React, { useState, useContext } from 'react';
import {
    Box,
    LoginHeader,
    Card,
    Title,
    AdminCount,
    Flex,
    Logo,
    LogoName,
    DocBox,
} from './style-components';
import { Link } from 'react-router-dom';
import IconLogo from '../../images/logo.png';
import './reset.less';
import { Form, Input, Typography, Button } from 'antd';
import HTTP from '../../api/fetch';
import decodeJwt from 'jwt-decode';
import { LoginToken } from '../../types';
import { UserContext, UPDATE_USER } from '../../provider/appContext';
import { ReactComponent as IconEnter } from '../../images/icon/icon_state_enter.svg';
import Icon from '@ant-design/icons';
import { ReactComponent as IconDoc } from '../../images/icon/icon_btn_normal_docs.svg';
import { ReactComponent as IconExplain } from '../../images/icon/icon_label_explain.svg';
// icon_state_enter.svg
function Login() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(UserContext);
    const onFinish = async () => {
        setLoading(true);
        const result = await HTTP.post('login', { email, password });
        if (result.code === 0) {
            const token = result.data.token;
            const refreshToken = result.data.refresh_token;
            const decodeToken: any = decodeJwt(token);
            const loginToken: LoginToken = decodeToken;
            localStorage.setItem('token', token);
            localStorage.setItem('username', loginToken.email);
            localStorage.setItem('permissions', loginToken.is_admin === 1 ? 'admin' : 'user');
            localStorage.setItem('userInfo', JSON.stringify(loginToken));
            localStorage.setItem('refreshToken', refreshToken);

            const user = await HTTP.get('me');
            setLoading(false);
            location.replace('/dashboard/overview');
            if (user.code === 0) {
                localStorage.setItem('user', JSON.stringify(user));
                dispatch({ type: UPDATE_USER, user: user?.data });
                localStorage.setItem('userId', user.id);
            }
        }
        setLoading(false);
    };
    return (
        <div id="login">
            <Box>
                <LoginHeader>
                    <Link to="https://nocalhost.dev">
                        <Flex>
                            <Logo src={IconLogo}></Logo>
                            <LogoName>Nocalhost Service Dashboard</LogoName>
                        </Flex>
                    </Link>
                    <a
                        href="https://nocalhost.dev/docs/server/deploy-server/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <DocBox>
                            <Icon
                                component={IconDoc}
                                style={{ fontSize: '20px', color: '#b6c2cd' }}
                            ></Icon>
                            <div style={{ color: '#36435c', marginLeft: '6px' }}>Docs</div>
                        </DocBox>
                    </a>
                </LoginHeader>
                <Title>
                    <Typography.Title level={1}>Login</Typography.Title>
                </Title>

                <Card>
                    <Form onFinish={onFinish}>
                        <Form.Item
                            label="Email Address"
                            name="username"
                            rules={[{ required: true, type: 'email', message: '请输入正确Email.' }]}
                        >
                            <Input
                                placeholder="Email address"
                                value={email}
                                onChange={(e: any) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: '请输入密码.' }]}
                        >
                            <Input.Password
                                placeholder="Password"
                                value={password}
                                onChange={(e: any) => {
                                    setPassword(e.target.value);
                                }}
                            ></Input.Password>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Login
                                <Icon
                                    component={IconEnter}
                                    style={{ fontSize: '20px', color: '#fff' }}
                                ></Icon>
                            </Button>
                        </Form.Item>
                    </Form>
                    <AdminCount>
                        <a
                            href="https://nocalhost.dev/docs/server/deploy-server#access-the-web-service"
                            target="_blank"
                            rel="noreferrer"
                            id="admin"
                        >
                            <Icon
                                component={IconExplain}
                                style={{ fontSize: '20px', marginRight: '4px' }}
                            ></Icon>
                            <span>Get the default admin account</span>
                        </a>
                    </AdminCount>
                </Card>
            </Box>
        </div>
    );
}

export default Login;
