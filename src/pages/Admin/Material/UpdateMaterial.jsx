import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { getMaterialById } from '../../../api/material';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Button, Form, Input, Spin, Switch, Select, notification, InputNumber } from 'antd';
import UploadImage from '../../../components/UploadImage';
import { NOTIFICATION_TYPE, UPLOAD_IMAGES_STATUS } from '../../../constants/status';
import { useDispatch, useSelector } from 'react-redux';
import { updateMaterialAsync } from '../../../slices/material';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};
const UpdateMaterial = () => {
    useDocumentTitle('Cập nhật vật tư');
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.material.update.loading);

    const [material, setMaterial] = useState({});
    const [url, setUrl] = useState(null);
    const [defaultList, setDefaultList] = useState([]);
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await getMaterialById(id);
            setMaterial(data);
            setUrl(data.image);
            setDefaultList([
                {
                    name: data.name,
                    url: data.image,
                    status: 'done',
                    thumbUrl: data.url,
                },
            ]);
            setInitialValues(data);
        })();
    }, [id]);

    const onFinish = (values) => {
        const data = { ...values, image: url };
        dispatch(
            updateMaterialAsync({
                _id: material._id,
                data,
            }),
        )
            .then((res) => {
                noti(NOTIFICATION_TYPE.SUCCESS, 'Cập nhật  thành công');
                navigate('/admin/quan-ly-vat-tu');
            })
            .catch((err) => {
                noti(NOTIFICATION_TYPE.ERROR, 'Cập nhật thất bại', err.message || '');
            });
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

    return (
        <div>
            {_.isEmpty(material) ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <Form
                    id="form-add-material"
                    className="form-add-material bg-white px-6 max-w-screen-lg mx-auto"
                    name="booking-form"
                    layout={'vertical'}
                    initialValues={initialValues}
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
                        <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập tên " />
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
                            className="h-10 text-base border-[#02b875] w-full"
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
                            className="h-10 text-base border-[#02b875] w-full"
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

                    <Form.Item>
                        <Button
                            htmlType="submit"
                            disabled={!url ? true : false}
                            loading={loading}
                            className="btn-submit mr-4 h-10 text-white bg-[#02b875] hover:bg-[#09915f] hover:text-white focus:ring-4 font-medium rounded-lg text-base px-5 py-2 w-full"
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default UpdateMaterial;
