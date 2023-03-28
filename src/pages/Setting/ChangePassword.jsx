import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import _, { isEmpty } from 'lodash';
import { Password, updateAccount } from '../../api/account';
import { JwtDecode } from '../../utils/auth';
import { Notification } from '../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../constants/status';

const ChangePassword = () => {
    const [validate, setValidate] = useState({});
    const idUser = _.get(JwtDecode(), '_id');
    const onFinish = async (values) => {
        const value = {
            _id: idUser,
            ..._.omit(values, ['confirm']),
        };
        const { data } = await Password(_.omit(value, ['password']));
        setValidate(() => {
            if (data == NOTIFICATION_TYPE.ERROR) {
                return { validateStatus: NOTIFICATION_TYPE.ERROR, help: 'mật khẩu không khớp!' };
            } else {
                return { validateStatus: NOTIFICATION_TYPE.SUCCESS };
            }
        });
        if (data == NOTIFICATION_TYPE.SUCCESS) {
            const { data } = await updateAccount(_.omit(value, ['currentPassword']));
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhập mật khẩu thành công!');
        }
    };
    const change = (a) => {
        if (!isEmpty(validate)) {
            setValidate({});
        }
    };
    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Mật khẩu hiện tại"
                    name="currentPassword"
                    className="currentPassword"
                    {...validate}
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password onChange={(a) => change(a)} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Mật khẩu mới"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="confirm"
                    label="Nhập lại mật khẩu mới"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ChangePassword;