import React from 'react';
import _ from 'lodash';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, notification } from 'antd';
import { NOTIFICATION_TYPE } from '../constants/status';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};
const UploadImage = (props) => {
    const onChange = async ({ file, fileList }) => {
        const isRemove = _.get(file, 'status', null);
        if (isRemove === 'removed') return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'web_app');

        const { data } = await axios({
            url: import.meta.env.VITE_URL_UPLOAD_IMAGE_CLOU,
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-formendcoded',
            },
            data: formData,
        });
        const urlCloudinary = _.get(data, 'url', null);
        if (urlCloudinary) {
            props.onSendUrl(urlCloudinary);
            return;
        }
        noti(NOTIFICATION_TYPE.ERROR, 'Tải ảnh lên thất bại', 'Đã có lỗi xảy ra vui lòng thử lại!');
    };

    return (
        <>
            <Upload
                action={import.meta.env.VITE_URL_UPLOAD_IMAGE_CLOU}
                accept="image/png, image/jpeg"
                maxCount={props.multiple ? null : 1}
                listType="picture"
                onChange={onChange}
                beforeUpload={() => false} //return false so that antd not upload image now
            >
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        </>
    );
};
export default UploadImage;
