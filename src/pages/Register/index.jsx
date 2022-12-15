import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import app from './fisebase_config';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Notification } from '../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../constants/status';
import { register } from '../../api/account';
const auth = getAuth(app);
const Register = () => {
    useDocumentTitle('Đăng ký tài khoản');
    const [otp, setOtp] = useState('');
    const [isVerify, setIsVerify] = useState(false);
    const [sendOTP, setSendOTP] = useState(false);
    const navigate = useNavigate();

    const formatErrorMessageSendOTP = (message) => {
        switch (message) {
            case 'reCAPTCHA has already been rendered in this element':
                return 'ReCapCha đã tồn tại! Vui lòng tải lại trang.';
            case 'Firebase: Error (auth/too-many-requests).':
                return 'Nhận mã OTP xác thực quá nhiều!';
            case 'Firebase: Error (auth/invalid-verification-code).':
                return 'Mã OTP không hợp lệ vui lòng nhập lại!';
            case 'Firebase: Invalid format. (auth/invalid-phone-number).':
                return 'Số điện thoại không hợp lệ';
            default:
                message;
        }
    };

    const onSignInSubmit = (phoneNumber) => {
        onCaptchVerify();
        const phoneConvert = '+84' + phoneNumber;
        const appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, phoneConvert, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Đã gửi mã OTP thành công!', 'Qúy khách vui lòng nhập mã OTP!');
                setSendOTP(true);
            })
            .catch((error) => {
                console.log('error', error);
                Notification(
                    NOTIFICATION_TYPE.ERROR,
                    'Đã có lỗi xảy ra! Vui lòng thử lại',
                    formatErrorMessageSendOTP(error.message),
                );
            });
    };

    const onCaptchVerify = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            'sign-in-button',
            {
                size: 'invisible',
                callback: (response) => response,
            },
            auth,
        );
    };

    const verifyCode = () => {
        window.confirmationResult
            .confirm(otp)
            .then((result) => {
                // User signed in successfully.
                setIsVerify(true);
                Notification(NOTIFICATION_TYPE.WARNING, 'Xác thực thành công!', 'Vui lòng nhập các trường còn thiếu.');
            })
            .catch((error) => {
                console.log('nhap sai otp', error);
                Notification(NOTIFICATION_TYPE.ERROR, 'Đã có lỗi xảy ra!', error.message);
            });
    };

    const onFinish = (values) => {
        if (!isVerify) return onSignInSubmit(values.phone);
        register({ ...values, image: '' })
            .then(({ data }) => {
                Notification(NOTIFICATION_TYPE.WARNING, data.message);
                // setTimeout(() => {
                //     navigate('/dang-nhap');
                // }, 500);
            })
            .catch((err) => {
                Notification(NOTIFICATION_TYPE.ERROR, err.message);
                setOtp('');
                setIsVerify(false);
                setSendOTP(false);
            });
    };

    return (
        <div>
            <div className="flex h-full my-10 items-center font-sans font-semibold text-2xl">
                <div id="sign-in-button"></div>
                <Form
                    name="normal_login"
                    className="login-form w-[400px] m-auto"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <h1 className="text-[28px] mb-6">Đăng ký tài khoản</h1>
                    {isVerify ? (
                        <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập Họ và tên!' }]}>
                            <Input className="py-2 text-base" placeholder="Họ và tên" />
                        </Form.Item>
                    ) : null}
                    {isVerify ? (
                        <Form.Item name="email">
                            <Input className="py-2 text-base" placeholder="Email" />
                        </Form.Item>
                    ) : null}
                    <Form.Item
                        name="number_phone"
                        rules={[
                            { required: true, message: 'Vui lòng nhập Số điện thoại!' },
                            { min: 10, message: 'Số điện thoại không đúng định dạng!' },
                            { max: 11, message: 'Số điện thoại không đúng định dạng!' },
                        ]}
                    >
                        <Input className="py-2 text-base" placeholder="Số điện thoại" />
                    </Form.Item>
                    {!sendOTP ? (
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={sendOTP}
                                className="login-form-button mt-2 bg-[#02b875] w-full h-10 text-base font-medium"
                            >
                                Nhận mã OTP xác thực
                            </Button>
                        </Form.Item>
                    ) : null}
                    {!isVerify ? (
                        <div>
                            <Input
                                type="text"
                                className="w-full h-10 rouded py-2 text-base"
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Mã OTP"
                                disabled={!sendOTP}
                            />
                            <Button
                                onClick={verifyCode}
                                type="primary"
                                disabled={!sendOTP}
                                className="login-form-button my-4 bg-[#02b875] w-full h-10 text-base font-medium"
                            >
                                Xác thực
                            </Button>
                        </div>
                    ) : null}
                    {isVerify ? (
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: 'Vui lòng nhập Mật khẩu!' },
                                { min: 6, message: 'Mật khẩu phải đủ 8 ký tự!' },
                            ]}
                        >
                            <Input.Password className="py-2 text-base" type="password" placeholder="Mật khẩu" />
                        </Form.Item>
                    ) : null}
                    <p>
                        Bằng việc bấm nút Đăng ký bên dưới, tôi xác nhận đã đọc, hiểu và đồng ý với các{' '}
                        <span className="underline text-[#02b875]">Điều kiện và Điều khoản</span> của Dodoris.
                    </p>

                    {isVerify ? (
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                // disabled={!isVerify}
                                className="login-form-button mt-4 bg-[#02b875] w-full h-10 text-base font-medium"
                            >
                                Đăng ký
                            </Button>
                        </Form.Item>
                    ) : null}
                    <p className="my-5 text-center">Đã có tài khoản?</p>
                    <Link
                        to="/dang-nhap"
                        className="inline-block leading-10 text-base h-10 w-full rounded text-[#1464f4] text-center border border-[#1464f4] hover:text-[#fff] hover:bg-[#02b875] hover:border-none"
                    >
                        Đăng nhập
                    </Link>
                </Form>
            </div>
        </div>
    );
};

export default Register;
