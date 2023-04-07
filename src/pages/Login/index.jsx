
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Token } from '../../constants/auth';
import { R_NUMBER_PHONE } from '../../constants/regex';
import { loginAsync } from '../../slices/user';
import './login.css';
const Login = () => {
    const user = useSelector((state) => state.user);
    const isLogged = useSelector((state) => state.user.isLogged);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (user.currentUser.accessToken !== '') {
            localStorage.setItem(Token.accessToken, user.currentUser.accessToken);
        }
    }, [user.currentUser.accessToken]);
    useEffect(() => {
        if (isLogged) {
            setTimeout(() => {
                navigate('/');
            }, 100);
        }
    }, [isLogged]);
    const onFinish = async (values) => {
        dispatch(loginAsync(values));
    };

    return (
        <div className="login-page">
            <Spin tip="Loading" spinning={user.loading} size="large">
                <div>
                    <div className="login-content flex items-center font-sans font-semibold text-2xl">
                        <Form
                            name="normal_login"
                            id="login-form"
                            className="login-form w-[380px] m-auto"
                            onFinish={onFinish}
                        >
                            <h1 className="title-login">Đăng nhập</h1>
                            <Form.Item
                                name="number_phone"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Số điện thoại!' },
                                    {
                                        pattern: R_NUMBER_PHONE,
                                        message: 'Số điện thoại không đúng định dạng.',
                                    },
                                ]}
                            >
                                <Input className="py-2 text-base" placeholder="Số điện thoại" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Mật khẩu!' },
                                    { min: 8, message: 'Mật khẩu phải đủ 8 ký tự!' },
                                ]}
                            >
                                <Input.Password className="py-2 text-base" type="password" placeholder="Mật khẩu" />
                            </Form.Item>
                            <Form.Item>
                                <Form.Item valuePropName="checked" noStyle>
                                    <Checkbox className="float-left">Ghi nhớ tài khoản</Checkbox>
                                </Form.Item>

                                <a className="login-form-forgot float-right" href="">
                                    Quên mật khẩu?
                                </a>
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="btn-primary w-full h-10 font-medium rounded-lg text-sm my-8"
                                >
                                    Đăng nhập
                                </Button>
                                <p className="my-5 pb-6 text-center">
                                    Chưa có tài khoản?
                                    <Link to="/dang-ky" className="text-base rounded text-[#02b875] text-underline">
                                        {' '}
                                        Đăng ký
                                    </Link>
                                </p>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Spin>

import React from 'react';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const Login = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="flex h-[580px] items-center font-sans font-semibold text-2xl">
            <Form
                name="normal_login"
                className="login-form w-[360px] m-auto"
                initialValues={{ remember: false }}
                onFinish={onFinish}
            >
                <h1 className="text-[28px] mb-6">Đăng nhập</h1>
                <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                    <Input
                        className="py-2 text-base"
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="Số điện thoại"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                    <Input.Password
                        className="py-2 text-base"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="float-left">Ghi nhớ tài khoản</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot float-right" href="">
                        Quên mật khẩu?
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button text-base bg-[#02b875] w-full h-10"
                    >
                        Đăng nhập
                    </Button>
                    <p className="my-5 text-center">Chưa có tài khoản?</p>
                    <Link
                        to="/dang-ky"
                        className="inline-block leading-10 text-base h-10 w-full rounded text-[#1464f4] text-center border border-[#1464f4] hover:text-[#fff] hover:bg-[#02b875] hover:border-none"
                    >
                        Đăng ký tài khoản
                    </Link>
                </Form.Item>
            </Form>

        </div>
    );
};

export default Login;
