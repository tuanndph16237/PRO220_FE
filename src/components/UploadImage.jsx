import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload, notification } from 'antd';
import { NOTIFICATION_TYPE, UPLOAD_IMAGES_STATUS } from '../constants/status';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};
const UploadImage = (props) => {
    const [fileList, setFileList] = useState(props.defaultFileList);

    useEffect(() => {
        setFileList(props.defaultFileList);
    }, [props.defaultFileList]);

    const onChange = async ({ file, fileList }) => {
        const isRemove = _.get(file, 'status', null);
        if (isRemove === UPLOAD_IMAGES_STATUS.REMOVED) return props.onChangeUrl(null);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'web_app');

        setFileList([
            {
                name: 'Đang tải ảnh lên',
                url: file.name,
                status: UPLOAD_IMAGES_STATUS.UPLOADING,
                thumbUrl: file.name,
            },
        ]);

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
            props.onChangeUrl(urlCloudinary);
            return;
        }
        props.onChangeUrl(null);
        noti(NOTIFICATION_TYPE.ERROR, 'Tải ảnh lên thất bại', 'Đã có lỗi xảy ra vui lòng thử lại!');
    };

    return (
        <div className="py-2">
            <Upload
                action={import.meta.env.VITE_URL_UPLOAD_IMAGE_CLOU}
                accept="image/png, image/jpeg"
                maxCount={1}
                listType="picture"
                fileList={fileList || []}
                onChange={onChange}
                beforeUpload={() => false} //return false so that antd not upload image now
            >
                <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
            </Upload>
        </div>
    );
};
export default UploadImage;
