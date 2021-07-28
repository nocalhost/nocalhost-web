import React, { useState, useContext } from 'react';
import { Box, LoginHeader, Card } from './style-components';
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
                location.replace('/');
                if (user.code === 0) {
                    localStorage.setItem('user', JSON.stringify(user));
                    dispatch(UPDATE_USER, user?.data);
                    localStorage.setItem('userId', user.id);
                }
            }
        } catch (error) {
            console.log(error);
        }
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
                <Card>
                    <Typography.Title level={2}>Sign in</Typography.Title>
                    <Form onFinish={onFinish}>
                        <Form.Item
                            label=""
                            name="username"
                            rules={[{ required: true, type: 'email', message: '请输入正确Email.' }]}
                        >
                            <Input
                                placeholder="Email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label=""
                            name="password"
                            rules={[{ required: true, message: '请输入密码.' }]}
                        >
                            <Input
                                placeholder="Password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Box>
        </div>
    );
}

export default Login;
