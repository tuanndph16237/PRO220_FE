import React from 'react';
import { Button, Input } from 'antd';
export const ModalOtp = ({ otp, setOtp, loadingVerify, verifyCode }) => {
    return (
        <div className="pt-6">
            <Input
                type="text"
                className="w-full h-10 rouded py-2 text-base"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Mã OTP"
            />
            <Button
                onClick={verifyCode}
                type="primary"
                loading={loadingVerify}
                className="login-form-button btn-primary w-full h-10 font-medium my-4 text-base"
            >
                Xác thực
            </Button>
        </div>
    );
};
