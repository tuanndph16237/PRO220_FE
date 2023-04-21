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
                                <Link to="/quen-mat-khau" className="login-form-forgot float-right">
                                        Quên mật khẩu?
                                    </Link>
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
        </div>
    );
};

export default Login;