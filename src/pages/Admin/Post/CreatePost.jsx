import React, { useState } from 'react';
import { Button, Drawer, Form, Input, message } from 'antd';
import CkEditor from '../../../components/CKEditor';
import UploadImage from '../../../components/UploadImage';
import { createPost } from '../../../api/post';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { Notification } from '../../../utils/notifications';

const CreatePost = ({ open, onClose, onRefetch }) => {
    const [loading, setLoading] = useState(false);
    const [url, setUrl] = useState('https://cmu-cdn.vinfast.vn/2023/03/d4bf9b19-chucmungphunucongdong83.jpg');
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
    const onFinish = (values) => {
        const data = { image: url, ...values };
        setLoading(true);
        createPost(data)
            .then(({ data: res }) => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Thêm tin tức thành công');
                onRefetch();
            })
            .catch((err) => {
                console.log('create-acount', err);
                Notification(NOTIFICATION_TYPE.ERROR, 'Thêm tin tức thất bại', message.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    return (
        <div>
            <Drawer title="Thêm tin tức" placement="right" width="80%" onClose={handleClose} open={open}>
                <Form
                    id="form-add-post"
                    className="form-add-banner bg-white mx-auto"
                    name="booking-form"
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
                        <CkEditor width={500} onChange={(value) => {}} />
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
                                Thêm
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
        </div>
    );
};

export default CreatePost;
