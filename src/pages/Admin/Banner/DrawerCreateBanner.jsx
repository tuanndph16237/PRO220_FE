import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Drawer, Form, Input, Switch } from 'antd';
import './banner.css';
import UploadImage from '../../../components/UploadImage';
import { createBannerAsync } from '../../../slices/banner';
const DrawerCreateBanner = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState(null);
    const handleClose = () => {
        onClose(false);
    };

    const onFinish = (values) => {
        const data = { ...values, url };
        dispatch(createBannerAsync(data));
    };
    return (
        <>
            <Drawer title="Thêm banner" placement="right" width="40%" onClose={handleClose} open={open}>
                <Form
                    id="form-add-banner"
                    className="form-add-banner bg-white px-6 max-w-screen-lg mx-auto"
                    name="booking-form"
                    layout={'vertical'}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<p className="text-base font-semibold">Tên banner</p>}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                            },
                        ]}
                    >
                        <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập tên banner" />
                    </Form.Item>
                    <p className="text-base font-semibold">
                        <span className="text-[#ff4d4f]">*</span> Ảnh
                    </p>
                    <UploadImage onSendUrl={(value) => setUrl(value)} />
                    {!url && <div className="text-[#ff4d4f]">Vui lòng tải ảnh lên!</div>}
                    <Form.Item
                        label={<p className="text-base font-semibold">Trạng thái kích hoạt</p>}
                        name="enabled"
                        initialValue={true}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Chuyển hướng</p>}
                        name="redirectTo"
                        initialValue="#"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này. Mặc định là #',
                            },
                        ]}
                    >
                        <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập đường dẫn chuyển hướng" />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Độ ưu tiên</p>}
                        name="priority"
                        initialValue={0}
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này. Mặc định là 0',
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            value={0}
                            min={0}
                            className="h-10 text-base border-[#02b875]"
                            placeholder="Nhập số"
                        />
                    </Form.Item>
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
                                <Button type="dashed" disabled size="large" className="mr-4">
                                    Thêm
                                </Button>
                            )}
                        </Form.Item>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="h-10 text-[#ccc] bg-white hover:text-white hover:bg-[#02b875] border border-slate-300 border-solid focus:ring-4 font-medium rounded-lg text-base px-5 py-2"
                        >
                            Hủy
                        </button>
                    </div>
                </Form>
            </Drawer>
        </>
    );
};
export default DrawerCreateBanner;
