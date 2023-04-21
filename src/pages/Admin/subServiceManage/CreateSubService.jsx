import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
import { createApiSubService } from '../../../api/service';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { useNavigate } from 'react-router-dom';

const CreateSubService = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        await createApiSubService(values)
        Notification(NOTIFICATION_TYPE.SUCCESS, 'Thêm dịch vụ phát sinh thành công!')
        navigate('/admin/quan-ly-sub-dich-vu')
        return;
    };
    return (
        <Form form={form} name="dynamic_form_complex" onFinish={onFinish} style={{ maxWidth: 600 }} autoComplete="off">
            <Form.Item name="name" label="Dịch vụ phát sinh" rules={[{ required: true, message: 'phải nhập dịch vụ phát sinh!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="fee" label="Giá" rules={[{ required: true, message: 'phải nhập giá!' }]}>
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateSubService;
