import React, { useEffect, useState } from 'react';
import { getByIdDistrict, updateDistricts } from '../../../api/district';
import { Button, Form, Input, Spin, notification } from 'antd';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { useParams, useNavigate } from 'react-router-dom';
import _ from 'lodash';
const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const UpdateDistrict = () => {
    const navigate = useNavigate();
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
        noti(NOTIFICATION_TYPE.SUCCESS, `cập nhật địa chỉ thành công`);
        setTimeout(() => {
            navigate('/admin/province');
        }, 1000);
    };
    const onFinishFailed = (errorInfo) => {
        noti(NOTIFICATION_TYPE.ERROR, `cập nhật địa chỉ thất bại!`);
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
                        className="ml-auto mr-auto mt-20"
                    >
                        <Form.Item
                            label={<p>Nhập tên tỉnh</p>}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'nhập vào địa chỉ tỉnh thành!',
                                },
                            ]}
                        >
                            <Input className="h-10 text-base capitalize border-[#02b875]" />
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
            )}
        </div>
    );
};

export default UpdateDistrict;
