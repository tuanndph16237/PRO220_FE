
import React from 'react';
import { LockOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
const Register = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div className="flex h-full my-10 items-center font-sans font-semibold text-2xl">
            <Form
                name="normal_login"
                className="login-form w-[400px] m-auto"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <h1 className="text-[28px] mb-6">Đăng ký tài khoản</h1>
                <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập Họ và tên!' }]}>
                    <Input
                        className="py-2 text-base"
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Họ và tên"
                    />
                </Form.Item>
                <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập Số điện thoại!' }]}>
                    <Input
                        className="py-2 text-base"
                        prefix={<PhoneOutlined className="site-form-item-icon" />}
                        placeholder="Số điện thoại"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập Mật khẩu!' }]}>
                    <Input.Password
                        className="py-2 text-base"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập lại Mật khẩu!' }]}>
                    <Input.Password
                        className="py-2 text-base"
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                    />
                </Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <p className="mb-5">Đăng ký nhận thông tin chương trình khuyến mãi, dịch vụ từ Dodoris</p>
                </Form.Item>
                <Form.Item name="remember">
                    <p>
                        Bằng việc bấm nút Đăng ký bên dưới, tôi xác nhận đã đọc, hiểu và đồng ý với các{' '}
                        <a href="#" className="underline text-[#02b875]">
                            Điều kiện và Điều khoản
                        </a>{' '}
                        của Dodoris.
                    </p>
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button text-base bg-[#02b875] w-full h-10"
                    >
                        Đăng ký
                    </Button>
                    <p className="my-5 text-center">Đã có tài khoản?</p>
                    <Link
                        to="/dang-ky"

                        className="inline-block leading-10 text-base h-10 w-full rounded text-[#1464f4] text-center border border-[#1464f4] hover:text-[#fff] hover:bg-[#02b875] hover:border-none"
                    >
                        Đăng nhập
                    </Link>

                </Form.Item>
            </Form>

        </div>
    );
};

export default Register;
