import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import app from './fisebase_config';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Notification } from '../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../constants/status';
import { register } from '../../api/auth';
import { R_NUMBER_PHONE } from '../../constants/regex';
const auth = getAuth(app);
const Register = () => {
    useDocumentTitle('Đăng ký tài khoản');
    const [otp, setOtp] = useState('');
    const [isVerify, setIsVerify] = useState(false);
    const [sendOTP, setSendOTP] = useState(false);
    const [loadingSendOTP, setLoadingSendOTP] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingCreatingAccount, setLoadingCreatingAccount] = useState(false);
    const navigate = useNavigate();

    const formatErrorMessageSendOTP = (message) => {
        switch (message) {
            case 'reCAPTCHA has already been rendered in this element':
                return 'ReCapCha đã tồn tại! Vui lòng tải lại trang.';
            case 'Firebase: Error (auth/too-many-requests).':
            case 'Firebase: Exceeded quota. (auth/quota-exceeded).':
                return 'Nhận mã OTP xác thực quá nhiều!';
            case 'Firebase: Error (auth/invalid-verification-code).':
                return 'Mã OTP không hợp lệ vui lòng nhập lại!';
            case 'Firebase: Invalid format. (auth/invalid-phone-number).':
                return 'Số điện thoại không hợp lệ';
            case 'Firebase: Error (auth/code-expired).':
                return 'Hết thời gian xác thực OTP!';
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
            })
            .finally(() => {
                setLoadingSendOTP(false);
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
        setLoadingVerify(true);
        window.confirmationResult
            .confirm(otp)
            .then((result) => {
                // User signed in successfully.
                setIsVerify(true);
                Notification(NOTIFICATION_TYPE.WARNING, 'Xác thực thành công!', 'Vui lòng nhập các trường còn thiếu.');
            })
            .catch((error) => {
                console.log('nhap sai otp', error);
                Notification(NOTIFICATION_TYPE.ERROR, 'Đã có lỗi xảy ra!', formatErrorMessageSendOTP(error.message));
                if (formatErrorMessageSendOTP(error.message) === 'Hết thời gian xác thực OTP!') {
                    setOtp('');
                    setIsVerify(false);
                    setSendOTP(false);
                    setLoadingSendOTP(false);
                }
            })
            .finally(() => {
                setLoadingVerify(false);
            });
    };

    const onFinish = (values) => {
        if (!isVerify) {
            setLoadingSendOTP(true);
            return onSignInSubmit(values.number_phone);
        }
        setLoadingCreatingAccount(true);
        register(values)
            .then(({ data }) => {
                Notification(NOTIFICATION_TYPE.WARNING, data.message);
                setTimeout(() => {
                    navigate('/dang-nhap');
                }, 500);
            })
            .catch((err) => {
                Notification(NOTIFICATION_TYPE.ERROR, err.message);
                setOtp('');
                setIsVerify(false);
                setSendOTP(false);
                setLoadingSendOTP(false);
            })
            .finally(() => {
                setLoadingCreatingAccount(false);
            });
    };

    return (
        <div className="login-page">
            <div className="register-content items-center font-sans font-semibold text-2xl">
                <div id="sign-in-button"></div>
                <Form name="normal_login" className="login-form w-[380px] m-auto" onFinish={onFinish}>
                    <h1 className="title-login">Đăng ký tài khoản</h1>
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
                            {
                                pattern: R_NUMBER_PHONE,
                                message: 'Số điện thoại không đúng định dạng.',
                            },
                        ]}
                    >
                        <Input className="py-2 text-base" placeholder="Số điện thoại" disabled={isVerify} />
                    </Form.Item>
                    {!sendOTP ? (
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={sendOTP}
                                loading={loadingSendOTP}
                                className="login-form-button btn-primary w-full h-10 font-medium mt-2"
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
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Mã OTP"
                                disabled={!sendOTP}
                            />
                            <Button
                                onClick={verifyCode}
                                type="primary"
                                disabled={!sendOTP}
                                loading={loadingVerify}
                                className="login-form-button btn-primary w-full h-10 font-medium my-4 text-base"
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
                                { min: 8, message: 'Mật khẩu phải đủ 8 ký tự!' },
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
                                loading={loadingCreatingAccount}
                                className="login-form-button btn-primary w-full h-10 font-medium mt-4 text-base"
                            >
                                Đăng ký
                            </Button>
                        </Form.Item>
                    ) : null}
                    <p className="my-5 pb-14 text-center">
                        Đã có tài khoản?
                        <Link to="/dang-nhap" className="text-base rounded text-[#02b875] text-underline">
                            {' '}
                            Đăng nhập
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default Register;
