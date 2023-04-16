import React, { useRef, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import app from '../Register/fisebase_config';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { Notification } from '../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../constants/status';
import { register } from '../../api/auth';
import { R_NUMBER_PHONE } from '../../constants/regex';
import { checkPhoneinSystem } from '../../api/order';
import _ from 'lodash';
import { updatePassword } from '../../api/account';
const auth = getAuth(app);
const ChangePassword = () => {
    useDocumentTitle('Quên Mật Khẩu');
    const [otp, setOtp] = useState('');
    const [isVerify, setIsVerify] = useState(false  );
    const [sendOTP, setSendOTP] = useState(false);
    const [loadingSendOTP, setLoadingSendOTP] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingCreatingAccount, setLoadingCreatingAccount] = useState(false);
    const navigate = useNavigate();
    const id = useRef('')

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

    const onFinish = async (values) => {
        if (!isVerify) {
            const { data } = await checkPhoneinSystem({ number_phone: values.number_phone });
            if (data.isPhoneInSystem) {
                id.current = data.accountId
                setLoadingSendOTP(true);
                return onSignInSubmit(values.number_phone);
            } else {
                Notification(NOTIFICATION_TYPE.ERROR, 'không tồn tại trong hệ thống!');
            }
        }else{  
            const datas ={
                _id:id.current,
                ..._.omit(values, ['confirm'])
            }
            const { data } = await updatePassword(datas);
            if (data) {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhập mật khẩu thành công!');
                navigate('/dang-nhap')
            }
        }
    };

    return (
        <div className="login-page">
            <div className="register-content items-center font-sans font-semibold text-2xl">
                <div id="sign-in-button"></div>
                <Form name="normal_login" className="login-form w-[380px] m-auto" onFinish={onFinish}>
                    <h1 className="title-login">Quên Mật Khẩu</h1>
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
                        <>
                            {' '}
                            <Form.Item
                                name="password" 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng không bỏ trống!',
                                    },
                                    { min: 8, message: 'Mật khẩu phải đủ 8 ký tự!' },
                                ]}
                                hasFeedback
                            >
                                <Input.Password placeholder="Mật khẩu mới"/>
                            </Form.Item>
                            <Form.Item
                                name="confirm"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Xác nhận mật khẩu!',
                                    },
                                    { min: 8, message: 'Mật khẩu phải đủ 8 ký tự!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(
                                                new Error('Mật khẩu không khớp!'),
                                            );
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Nhập lại mật khẩu mới"/>
                            </Form.Item>
                        </>
                    ) : null}
                    {isVerify ? (
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loadingCreatingAccount}
                                className="login-form-button btn-primary w-full h-10 font-medium mt-4 text-base"
                            >
                                Cập nhập
                            </Button>
                        </Form.Item>
                    ) : null}
                    <p className="my-5 pb-14 text-center">
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default ChangePassword;
