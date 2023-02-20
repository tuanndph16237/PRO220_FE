import React, { useEffect, useState } from 'react';
import { getByIdDistrict, updateDistricts } from '../../../api/district';
import { Button, Form, Input, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

const UpdateDistrict = () => {
    const { id } = useParams();
    const [district, setDistrict] = useState({});
    const [initialValues, setInitialValues] = useState({});
    useEffect(() => {
        (async () => {
            const { data } = await getByIdDistrict(id);
            setDistrict(data);
            setInitialValues(data);
        })();
    }, [id]);

    const onFinish = async (data) => {
        const District = await updateDistricts(id, data);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div>
            {_.isEmpty(district) ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
            <div>
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    initialValues={initialValues}
                    className='ml-auto mr-auto mt-20'
                >
                    <Form.Item
                        label={<p>Nhập tên tỉnh</p>}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input className="h-10 text-base border-[#02b875]" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button className='bg-[#02b875] hover:bg-[#09915f] text-white ml-40' htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>)}
        </div>
    );
};

export default UpdateDistrict;
