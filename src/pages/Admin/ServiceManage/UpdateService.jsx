import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useState } from 'react';
const dataApi = [
    {
        key: 1,
        name: 'Thay xăm',
        value: '50.000',
    },
    {
        key: 2,
        name: 'Thay lốp',
        value: '50.000',
    },
    {
        key: 3,
        name: 'Thay xích',
        value: '30.000',
    },
    {
        key: 4,
        name: 'Kích bình điện',
        value: '60.000',
    },
];

const UpdateService = () => {
    const [form] = Form.useForm();
    const [dataUpdate, setDataUpdate] = useState(dataApi);
    const onFinish = (values) => {
        return;
    };

    return (
        <Form form={form} name="dynamic_form_complex" onFinish={onFinish} style={{ maxWidth: 600 }} autoComplete="off">
            <Form.Item name="dich_vu" label="Dịch vụ" rules={[{ required: true, message: 'phải nhập dịch vụ!' }]}>
                <Input defaultValue={'sửa chửa tại cửa hàng'} />
            </Form.Item>
            <Form.List name="fee">
                {({ add, remove }) => (
                    <>
                        {dataUpdate.map((field) => (
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
                                            <Input defaultValue={field.name} />
                                        </Form.Item>
                                    )}
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    label="Phụ phí"
                                    name={[field.name, 'price']}
                                    rules={[{ required: true, message: 'phải nhập phụ phí!' }]}
                                >
                                    <Input defaultValue={field.value} />
                                </Form.Item>

                                <MinusCircleOutlined
                                    onClick={() =>
                                        setDataUpdate((oldItem) => {
                                            return oldItem.filter((item) => item.key !== field.key);
                                        })
                                    }
                                />
                            </Space>
                        ))}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() =>
                                    setDataUpdate([...dataUpdate, { key: dataUpdate.length + 1, name: '', value: '' }])
                                }
                                block
                                icon={<PlusOutlined />}
                            >
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

export default UpdateService;
