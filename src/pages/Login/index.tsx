import React, { useState, useContext } from 'react';
import { Box, LoginHeader, Card, Title, AdminCount } from './style-components';
import { Link } from 'react-router-dom';
import Logo from '../../images/logo-white.png';
import './reset.css';
import { Form, Input, Typography, Button } from 'antd';
import HTTP from '../../api/fetch';
import decodeJwt from 'jwt-decode';
import { LoginToken } from '../../types';
import { UserContext, UPDATE_USER } from '../../provider/appContext';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(UserContext);
    const onFinish = async () => {
        try {
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
                location.replace('/dashboard/overview');
                if (user.code === 0) {
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch({ type: UPDATE_USER, user: user?.data });
                    localStorage.setItem('userId', user.id);
                }
            }
        } catch (error) {}
    };
    return (
        <div id="login">
            <Box>
                <LoginHeader>
                    <Link to="https://nocalhost.dev">
                        <img src={Logo} height="48" />
                    </Link>
                    <Link to="https://nocalhost.dev/getting-started/">Docs</Link>
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
                            <Button type="primary" htmlType="submit">
                                Login
                            </Button>
                        </Form.Item>
                    </Form>
                    <AdminCount>
                        <a
                            href="https://nocalhost.dev/FAQ/default-account"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Get the default admin account
                        </a>
                    </AdminCount>
                </Card>
            </Box>
        </div>
    );
}

export default Login;
