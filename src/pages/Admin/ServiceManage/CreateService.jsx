import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';

const CreateService = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Received values of form:', values);
    };

    const fields = [
        {
            name: ['username'],
            value: 'Ant Design',
        },
    ];

    return (
        <Form form={form} name="dynamic_form_complex" onFinish={onFinish} style={{ maxWidth: 600 }} autoComplete="off">
            <Form.Item name="dich_vu" label="Dịch vụ" rules={[{ required: true, message: 'phải nhập dịch vụ!' }]}>
                <Input />
            </Form.Item>
            <Form.List name="fee">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field) => (
                            <Space key={field.key} align="baseline">
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, curValues) =>
                                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                    }
                                >
                                    {() => (
                                        <Form.Item
                                            {...field}
                                            label="Loại dịch vụ"
                                            name={[field.name, 'dich_vu_loai']}
                                            rules={[{ required: true, message: 'phải nhập loại dịch vụ!' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="Phụ phí"
                                    name={[field.name, 'price']}
                                    rules={[{ required: true, message: 'phải nhập phụ phí!' }]}
                                >
                                    <Input />
                                </Form.Item>

                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Thêm loại dịch vụ
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateService;
