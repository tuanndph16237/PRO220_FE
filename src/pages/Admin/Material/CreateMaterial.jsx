import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Button, Form, Input, InputNumber, notification } from 'antd';
import UploadImage from '../../../components/UploadImage';
import { createMaterialAsync } from '../../../slices/material';
import { useNavigate } from 'react-router-dom';
import { NOTIFICATION_TYPE } from '../../../constants/status';
const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const CreateMaterial = () => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState(null);
    const [defaultList, setDefaultList] = useState([]);
    const loading = useSelector((state) => state.material.materials.loading);
    const navigate = useNavigate();

    const handleChangeUrl = (value) => {
        setUrl(value);
        if (!value) return setDefaultList([]);
        setDefaultList([
            {
                name: 'Click để xem ảnh!',
                url: value,
                status: 'done',
                thumbUrl: value,
            },
        ]);
    };

    const onFinish = (values) => {
        const data = { ...values, image: url };
        dispatch(createMaterialAsync(data)).then((res) => {
            noti(NOTIFICATION_TYPE.SUCCESS, `thêm mới vật tư thành công`);
            setTimeout(() => navigate('/admin/quan-ly-vat-tu'), 1500);
        });
    };

    return (
        <>
            <Form
                id="form-add-material"
                className="form-add-material bg-white px-6 max-w-screen-lg mx-auto"
                name="booking-form"
                layout={'vertical'}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label={<p className="text-base font-semibold">Tên vật tư</p>}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập tên vật tư" />
                </Form.Item>
                <Form.Item
                    label={<p className="text-base font-semibold">Giá nhập</p>}
                    name="priceInitial"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        size="large"
                        formatter={(value) => `${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                        parser={(value) => value.replace(new RegExp(/\$\s?|(,*)/g), '')}
                        className="h-10 w-full text-base border-[#02b875]"
                        placeholder="Nhập vào giá lấy hàng"
                    />
                </Form.Item>
                <Form.Item
                    label={<p className="text-base font-semibold">Giá</p>}
                    name="price"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        size="large"
                        formatter={(value) => `${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                        parser={(value) => value.replace(new RegExp(/\$\s?|(,*)/g), '')}
                        className="h-10 w-full text-base border-[#02b875]"
                        placeholder="Nhập vào giá"
                    />
                </Form.Item>
                <Form.Item
                    label={<p className="text-base font-semibold">Số lượng (tự động thêm vật tư vào tất cả kho)</p>}
                    name="quantity"
                    rules={[
                        {
                            required: false,
                        },
                    ]}
                >
                    <InputNumber
                        min={0}
                        size="large"
                        placeholder="nhập vào số lượng cho tất cả kho"
                        formatter={(value) => `${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                        parser={(value) => value.replace(new RegExp(/\$\s?|(,*)/g), '')}
                        className="h-10 w-full text-base border-[#02b875]"
                    />
                </Form.Item>
                <Form.Item
                    label={<p className="text-base font-semibold">Đơn vị</p>}
                    name="unit"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Đơn vị vật tư" />
                </Form.Item>
                <p className="text-base font-semibold">
                    <span className="text-[#ff4d4f]">*</span> Ảnh
                </p>
                <UploadImage onChangeUrl={handleChangeUrl} defaultFileList={defaultList} />
                {!url && <div className="text-[#ff4d4f]">Vui lòng tải ảnh lên!</div>}
                <div className="my-2">
                    <Form.Item>
                        {url ? (
                            <button
                                htmltype="submit"
                                className="mr-4 h-10 w-full text-white bg-[#02b875] hover:bg-[#09915f] hover:text-white focus:ring-4 font-medium rounded-lg text-base px-5 py-2"
                            >
                                Thêm
                            </button>
                        ) : (
                            <Button type="dashed" disabled size="large" loading={loading} className="mr-4 w-full">
                                Thêm
                            </Button>
                        )}
                    </Form.Item>
                </div>
            </Form>
        </>
    );
};
export default CreateMaterial;
