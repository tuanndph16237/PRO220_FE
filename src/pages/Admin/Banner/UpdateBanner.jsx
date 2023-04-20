import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { getBannerById } from '../../../api/banner';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { Button, Form, Input, Spin, Switch, Select, notification } from 'antd';
import UploadImage from '../../../components/UploadImage';
import { REDIRECT_BANNER } from '../../../constants/orther';
import { NOTIFICATION_TYPE, UPLOAD_IMAGES_STATUS } from '../../../constants/status';
import { useDispatch, useSelector } from 'react-redux';
import { updateBannerAsync } from '../../../slices/banner';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};
const UpdateBanner = () => {
    useDocumentTitle('Cập nhật banner');
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.banner.update.loading);

    const [url, setUrl] = useState(null);
    const [banner, setBanner] = useState({});
    const [defaultList, setDefaultList] = useState([]);
    const [initialValues, setInitialValues] = useState({});

    useEffect(() => {
        (async () => {
            const { data } = await getBannerById(id);
            setBanner(data);
            setUrl(data.url);
            setDefaultList([
                {
                    name: data.name,
                    url: data.url,
                    status: 'done',
                    thumbUrl: data.url,
                },
            ]);
            setInitialValues(data);
        })();
    }, [id]);

    const onFinish = (values) => {
        const data = { ...values, url };
        dispatch(
            updateBannerAsync({
                _id: banner._id,
                data,
            }),
        )
            .then((res) => {
                noti(NOTIFICATION_TYPE.SUCCESS, 'Cập nhật banner thành công');
                navigate('/admin/quan-ly-banner');
            })
            .catch((err) => {
                noti(NOTIFICATION_TYPE.ERROR, 'Cập nhật banner thất bại', err.message || '');
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
            {_.isEmpty(banner) ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <Form
                    id="form-add-banner"
                    className="form-add-banner bg-white px-6 max-w-screen-lg mx-auto"
                    name="booking-form"
                    layout={'vertical'}
                    initialValues={initialValues}
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
                    <UploadImage onChangeUrl={handleChangeUrl} defaultFileList={defaultList} />
                    {!url && <div className="text-[#ff4d4f]">Vui lòng tải ảnh lên!</div>}
                    <Form.Item
                        label={<p className="text-base font-semibold">Trạng thái kích hoạt</p>}
                        name="enabled"
                        // initialValue={banner.enabled}
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Chuyển hướng</p>}
                        name="redirectTo"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này. Mặc định là #',
                            },
                        ]}
                    >
                        <Select className="h-10 text-base border-[#02b875]" placeholder="Nhập đường dẫn chuyển hướng">
                            {_.map(REDIRECT_BANNER, (item) => (
                                <Select.Option value={item.value} key={item.value}>
                                    {item.label}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Độ ưu tiên</p>}
                        name="priority"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này. Mặc định là 0',
                            },
                        ]}
                    >
                        <Input
                            type="number"
                            min={0}
                            className="h-10 text-base border-[#02b875]"
                            placeholder="Nhập số"
                        />
                    </Form.Item>
                    <div className="">
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                disabled={!url ? true : false}
                                loading={loading}
                                className="btn-submit mr-4 h-10 text-white bg-[#02b875] hover:bg-[#09915f] hover:text-white focus:ring-4 font-medium rounded-lg text-base px-5 py-2"
                            >
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            )}
        </div>
    );
};

export default UpdateBanner;
