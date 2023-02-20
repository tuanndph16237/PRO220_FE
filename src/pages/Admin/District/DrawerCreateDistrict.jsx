import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { createDistricts } from '../../../api/district';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { useNavigate } from 'react-router-dom';
const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const DrawerCreateDistrict = () => {
    const navigate = useNavigate();
    const onFinish = async (data) => {
        const dataDrawer = await createDistricts(data);
        noti(NOTIFICATION_TYPE.SUCCESS, `thêm mới địa chỉ thành công`);
        setTimeout(() => {
            navigate('/admin/province');
        }, 1000);
    };
    const onFinishFailed = (errorInfo) => {
        noti(NOTIFICATION_TYPE.ERROR, `thêm mới địa chỉ thất bại!`);
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
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="ml-auto mr-auto mt-20"
            >
                <Form.Item
                    label="Tên tỉnh"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'nhập vào địa chỉ tỉnh thành!',
                        },
                    ]}
                >
                    <Input className="capitalize" />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button className="bg-[#02b875] hover:bg-[#09915f] text-white ml-40" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default DrawerCreateDistrict;
