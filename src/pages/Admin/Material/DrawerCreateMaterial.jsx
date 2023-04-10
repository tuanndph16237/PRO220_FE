import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { Button, Drawer, Form, Input, Switch, Select, InputNumber, Space } from 'antd';
import UploadImage from '../../../components/UploadImage';
import { createMaterialAsync } from '../../../slices/material';

const DrawerCreateMaterial = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.material.create.loading);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const [url, setUrl] = useState(null);
    const [defaultList, setDefaultList] = useState([]);
    const handleClose = () => {
        onClose(false);
    };

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
    const onChange = (value) => {
        console.log('changed', value);
    };
    const onFinish = (values) => {
        const data = { ...values, image: url };
        console.log(data);
        dispatch(createMaterialAsync(data)).then((res) => handleClose());
    };
    return (
        <>
            <Drawer
                title="Thêm vật tư"
                placement="right"
                width="40%"
                onClose={handleClose}
                open={open}
                extra={
                    <Space>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Space>
                }
            >
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
                        className="w-52"
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
                            style={{ width: 400 }}
                            formatter={(value) => `${value}`.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g), ',')}
                            parser={(value) => value.replace(new RegExp(/\$\s?|(,*)/g), '')}
                            className="h-10 text-base border-[#02b875]"
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
                    <div className="absolute bottom-0 flex align-center">
                        <Form.Item>
                            {url ? (
                                <button
                                    htmltype="submit"
                                    className="mr-4 h-10 text-white bg-[#02b875] hover:bg-[#09915f] hover:text-white focus:ring-4 font-medium rounded-lg text-base px-5 py-2"
                                >
                                    Thêm
                                </button>
                            ) : (
                                <Button type="dashed" disabled size="large" loading={loading} className="mr-4">
                                    Thêm
                                </Button>
                            )}
                        </Form.Item>
                    </div>
                </Form>
            </Drawer>
        </>
    );
};
export default DrawerCreateMaterial;
