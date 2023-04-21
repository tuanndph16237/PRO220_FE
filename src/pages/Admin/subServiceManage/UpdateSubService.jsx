import { Button, Form, Input, Select, Space, Spin } from 'antd';
import React, { useState } from 'react';
import _ from 'lodash';
import { getApiServiceById, getApiSubServiceById, updateApiService, updateApiSubService } from '../../../api/service';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateSubService = () => {
    const navigate = useNavigate()
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState({});
    const [form] = Form.useForm();
    useEffect(() => {
        (async () => {
            const { data } = await getApiSubServiceById(id);
            setInitialValues(data);
        })();
    }, [id]);
    const onFinish = async (values) => {
        await updateApiSubService(id, values)
        Notification(NOTIFICATION_TYPE.SUCCESS, 'Sửa dịch vụ phát sinh thành công!')
        navigate('/admin/quan-ly-sub-dich-vu')
        return;
    };

    return (
        <div>
            {_.isEmpty(initialValues) ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <Form form={form} initialValues={initialValues} name="dynamic_form_complex" onFinish={onFinish} style={{ maxWidth: 600 }} autoComplete="off">
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
            )}
        </div>
    );
};

export default UpdateSubService;
