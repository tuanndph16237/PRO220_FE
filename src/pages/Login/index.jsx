import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Token } from '../../constants/auth';
import { NOTIFICATION_TYPE } from '../../constants/status';
import { loginAsync } from '../../slices/user';
import { Notification } from '../../utils/notifications';
const Login = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const notificationRef = useRef('');
    const navigate = useNavigate();
    useEffect(() => {
        if (user.error !== '') {
            notificationRef.current = user.error;
            if (notificationRef.current !== '') {
                Notification(NOTIFICATION_TYPE.ERROR, notificationRef.current);
            }
        }
    }, [user.error]);
    useEffect(() => {
        if (user.currentUser.accessToken !== '') {
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Đăng Nhập Thành Công');
            localStorage.setItem(Token.accessToken, user.currentUser.accessToken);
            setTimeout(() => {
                navigate('/');
            }, 1500);
        }
    }, [user.currentUser.accessToken]);
    const onFinish = async (values) => {
        dispatch(loginAsync(values));
    };

    return (
        <>
            <Spin tip="Loading" spinning={user.loading} size="large">
                <div className="flex h-[580px] items-center font-sans font-semibold text-2xl">
                    {/* {contextHolder} */}
                    <Form
                        name="normal_login"
                        className="login-form w-[360px] m-auto"
                        initialValues={{ remember: false }}
                        onFinish={onFinish}
                    >
                        <h1 className="text-[28px] mb-6">Đăng nhập</h1>
                        <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
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
            </Spin>
        </>
    );
};

export default Login;
