import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Button, Form, Input, notification, Select, Spin } from 'antd';
import { createShowroomAsync } from '../../../slices/showroom';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import _ from 'lodash';
import './showroom.css';
import UploadImage from '../../../components/UploadImage';
import { useNavigate } from 'react-router-dom';
import { searchInListShowroom } from '../../../api/showroom';
import { getDistrict } from '../../../api/district';

const DrawerCreateShowroom = () => {
    useDocumentTitle('Tạo cửa hàng');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.showroom.create.loading);
    const [defaultList, setDefaultList] = useState([]);
    const [url, setUrl] = useState(null);
    const [address, setAddress] = useState('');
    const [zone, setZone] = useState([]);

    const fetchApiDistrict = async () => {
        try {
            const dataDistrict = await getDistrict();
            setZone(dataDistrict.data);
        } catch (error) {}
    };

    useEffect(() => {
        fetchApiDistrict();
    }, []);

    const coordinate = useRef({
        latitude: '',
        longitude: '',
    });

    const noti = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    const formRef = useRef(null);

    useEffect(() => {
        formRef.current?.setFieldsValue({
            address: address,
        });
    }, [address]);

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

    useEffect(() => {
        var geocoder = new maptiler.Geocoder({
            input: 'search',
            key: 'CKlzQ1LLayVnG9v67Xs3',
        });
        geocoder.on('select', (item) => {
            let coordinates = item.center;
            coordinate.current.latitude = coordinates[1];
            coordinate.current.longitude = coordinates[0];
            setAddress(item.place_name_vi || item.place_name_en);
        });
    }, []);

    const onFinish = async (values) => {
        const data = {
            ...values,
            images: [url],
            longitude: _.toString(coordinate.current.longitude),
            latitude: _.toString(coordinate.current.latitude),
        };
        dispatch(createShowroomAsync(data))
            .then((res) => {
                if (res.payload.status == 200) {
                    noti(NOTIFICATION_TYPE.SUCCESS, 'Thêm showroom thành công!');
                    navigate('/admin/quan-ly-cua-hang');
                } else {
                    noti(NOTIFICATION_TYPE.ERROR, 'Thêm showroom thất bại!');
                }
            })
            .catch((err) => {
                noti(NOTIFICATION_TYPE.ERROR, 'Thêm showroom thất bại!', `${err}`);
            });
    };

    return (
        <>
            {loading && (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            )}
            <Form
                ref={formRef}
                id="form-add-banner"
                className="form-add-banner bg-white px-6 max-w-screen-lg mx-auto"
                name="booking-form"
                layout={'vertical'}
                initialValues={{
                    remember: false,
                    districtId: '----chọn địa điểm cửa hàng----',
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label={<p className="text-base font-semibold">Tên cửa hàng</p>}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập tên cửa hàng" />
                </Form.Item>
                <Form.Item
                    label={<p className="text-base font-semibold">Liên hệ cửa hàng</p>}
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập số điện thoại liên hệ" />
                </Form.Item>
                <Form.Item
                    label={<p className="text-base font-semibold">Địa chỉ cửa hàng</p>}
                    name="address"
                    initialValue={address}
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Input className="h-10 text-base border-[#02b875] w-full" placeholder="Nhập địa chỉ" id="search" />
                </Form.Item>
                <Form.Item
                    name="districtId"
                    label={<p className="text-base font-semibold">Cửa hàng</p>}
                    rules={[
                        {
                            required: true,
                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                        },
                    ]}
                >
                    <Select size="large" className="h-10 w-full text-base border-[#02b875]">
                        {zone.map((item) => (
                            <Select.Option value={item._id} key={item._id} label={item.name}>
                                <div span={24}>
                                    <div span={24}>
                                        <span className="text-base font-medium text-[#02b875]">{item.name}</span>
                                    </div>
                                </div>
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <p className="text-base font-semibold">
                    <span className="text-[#ff4d4f]">*</span> Ảnh
                </p>
                <UploadImage onChangeUrl={handleChangeUrl} defaultFileList={defaultList} />
                {!url && <div className="text-[#ff4d4f]">Vui lòng tải ảnh lên!</div>}
                <div className="absolute mt-6 flex align-center">
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
                        className="h-10 text-[#ccc] bg-white hover:text-white hover:bg-[#02b875] border border-slate-300 border-solid focus:ring-4 font-medium rounded-lg text-base px-5 py-2"
                    >
                        Hủy
                    </button>
                </div>
            </Form>
        </>
    );
};
export default DrawerCreateShowroom;
