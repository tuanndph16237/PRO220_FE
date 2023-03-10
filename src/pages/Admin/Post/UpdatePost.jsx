import React, { useEffect, useState } from 'react';
import { Button, Drawer, Form, Input } from 'antd';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import SpinCustomize from '../../../components/Customs/Spin';
import { getPostById, updatePost } from '../../../api/post';
import UploadImage from '../../../components/UploadImage';
import CkEditor from '../../../components/CKEditor';

const UpdatePost = ({ idUpdate, onClose, onRefetch }) => {
    useDocumentTitle('Cập nhật tin tức');
    const [loading, setLoading] = useState(false);

    const [updating, setUpdating] = useState(false);
    const [url, setUrl] = useState();
    const [data, setData] = useState({});
    const [defaultList, setDefaultList] = useState([]);

    useEffect(() => {
        setLoading(true);
        getPostById(idUpdate)
            .then(({ data: res }) => {
                setData(res);
                setUrl(res.image);
                setDefaultList([
                    {
                        name: res.name,
                        url: res.image,
                        status: 'done',
                        thumbUrl: res.image,
                    },
                ]);
                setInitialValues(data);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idUpdate]);

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

    const handleClose = () => {
        onClose(false);
    };
    const onFinish = (values) => {
        const update = { ...data, ...values };
        setUpdating(true);
        updatePost(update)
            .then(({ data: res }) => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhật thành công');
                onRefetch(res);
            })
            .catch((err) => {
                console.log('update-post', err);
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhật thất bại');
            })
            .finally(() => {
                setUpdating(false);
            });
    };
    return (
        <div>
            {loading ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <Drawer title="Cập nhật tin tức" placement="right" width="80%" onClose={handleClose} open={idUpdate}>
                    <Form
                        id="form-update-post"
                        className="form-add-banner bg-white mx-auto"
                        name="booking-form"
                        initialValues={data}
                        layout={'vertical'}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={<p className="text-base font-semibold">Tiêu đề</p>}
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                },
                            ]}
                        >
                            <Input className="text-base border-[#02b875]" placeholder="Nhập Tiêu đề" />
                        </Form.Item>
                        <p className="text-base font-semibold">
                            <span className="text-[#ff4d4f]">*</span> Ảnh
                        </p>
                        <UploadImage onChangeUrl={handleChangeUrl} defaultFileList={defaultList} />
                        {!url && <div className="text-[#ff4d4f]">Vui lòng tải ảnh lên!</div>}
                        <Form.Item
                            label={<p className="text-base font-semibold">Nội dung</p>}
                            name="content"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <CkEditor
                                content={data.content}
                                width={500}
                                onChange={(value) => {
                                    setData({ ...data, content: value });
                                }}
                            />
                        </Form.Item>
                        <div className="absolute bottom-0 flex align-center">
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    disabled={!url ? true : loading}
                                    loading={loading}
                                    className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] h-10 hover:!text-white hover:out
                        font-medium rounded-lg text-sm text-center md:mr-0"
                                >
                                    Cập nhật
                                </Button>
                            </Form.Item>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="ml-2 h-10 text-[#ccc] bg-white hover:text-white hover:bg-[#02b875] border border-slate-300 border-solid 
                            focus:ring-4 font-medium rounded-lg text-sm px-5 py-2"
                            >
                                Hủy
                            </button>
                        </div>
                    </Form>
                </Drawer>
            )}
        </div>
    );
};

export default UpdatePost;
