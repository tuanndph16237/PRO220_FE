import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Image, Space, Spin } from 'antd';
import UploadImage from '../../components/UploadImage';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateUser } from '../../slices/user';
import { JwtDecode } from '../../utils/auth';
import { Notification } from '../../utils/notifications';
import _ from 'lodash';
import { NOTIFICATION_TYPE, UPLOAD_IMAGES_STATUS } from '../../constants/status';
import { getUser } from '../../api/account';
const prefixSelector = (
    <Form.Item noStyle>
        <span>+84</span>
    </Form.Item>
);
const UpdateProfile = () => {
    const [visible, setVisible] = useState(false);
    const [url, setUrl] = useState(null);
    const [defaultList, setDefaultList] = useState([]);
    const [initialValues, setInitialValues] = useState({});
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser.values);
    const onFinish = (values) => {
        const data = {
            ...values,
            _id: currentUser._id,
            image: url,
        };
        dispatch(UpdateUser(data));
        Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhập thành công!');
    };
    const handleChangeUrl = (value) => {
        setUrl(value);
        if (!value) return setDefaultList([]);
        setDefaultList([
            {
                name: 'Click để xem ảnh!',
                url: value,
                status: UPLOAD_IMAGES_STATUS.DONE,
                thumbUrl: value,
            },
        ]);
    };
    useEffect(() => {
        (async () => {
            const { data } = await getUser(JwtDecode()._id);
            setInitialValues(_.omit(data, ['updatedAt', '__v', 'showroomId', 'role', 'password', 'createdAt']));
            setUrl(data.image);
            setDefaultList([
                {
                    name: a.name,
                    url: data.image,
                    status: 'done',
                    thumbUrl: data.image,
                },
            ]);
        })();
    }, []);
    return (
        <div>
            {_.isEmpty(initialValues) ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <>
                    <Space className="relative">
                        <Image
                            className="w-10 h-10 rounded-full"
                            preview={{
                                visible: false,
                            }}
                            style={{
                                width: '200px',
                                height: '200px',
                            }}
                            src={url}
                            onClick={() => setVisible(true)}
                        />
                    </Space>
                    <div
                        style={{
                            display: 'none',
                        }}
                    >
                        <Image.PreviewGroup
                            preview={{
                                visible,
                                onVisibleChange: (vis) => setVisible(vis),
                            }}
                        >
                            <Image className="w-1" src={url} />
                        </Image.PreviewGroup>
                    </div>
                    <div className="content">
                        <Form
                            name="basic"
                            labelCol={{
                                span: 8,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            initialValues={initialValues}
                            onFinish={onFinish}
                            autoComplete="off"
                            className="flex flex-col justify-center"
                        >
                            <UploadImage onChangeUrl={handleChangeUrl} defaultFileList={defaultList} />
                            <div>
                                <Form.Item
                                    label="name"
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your name!',
                                        },
                                    ]}
                                    className="updateProfile"
                                >
                                    <Input/>
                                </Form.Item>

                                <Form.Item
                                    label="email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
                                        },
                                    ]}
                                    className="updateProfile"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="number_phone"
                                    label="Phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your phone number phone!',
                                        },
                                    ]}
                                    className="updateProfile"
                                >
                                    <Input
                                        addonBefore={prefixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                    className="updateProfile"
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </>
            )}
        </div>
    );
};

export default UpdateProfile;
