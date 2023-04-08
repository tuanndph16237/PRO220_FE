import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Switch, Table, Row, Button, Spin } from 'antd';
import { getAllBannerAsync, removeBannerByIdsAsync, updateBannerAsync } from '../../../slices/banner';
import './banner.css';
import DrawerCreateBanner from './DrawerCreateBanner';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const BannerManage = () => {
    useDocumentTitle('Quản lý banner');
    const dispatch = useDispatch();
    const banners = useSelector((state) => state.banner.banners.values);
    const loadding = useSelector((state) => state.banner.banners.loading);
    const messageCreated = useSelector((state) => state.banner.create.message);
    const statusNotiCreated = useSelector((state) => state.banner.create.status);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);

    const data = banners.map((banner) => ({ ...banner, key: banner._id }));
    useEffect(() => {
        dispatch(getAllBannerAsync());
    }, []);

    useEffect(() => {
        if (messageCreated && statusNotiCreated) return noti(statusNotiCreated, messageCreated);
    }, [messageCreated, statusNotiCreated]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleUpdateBanner = (data) => {
        dispatch(
            updateBannerAsync({
                _id: data._id,
                data: _.pick(data, ['name', 'url', 'enabled', 'redirectTo', 'priority']),
            }),
        );
    };

    const handleRemoveBannerByIds = (ids) => {
        dispatch(removeBannerByIdsAsync(ids)).then((res) => {
            const bannerRemoved = _.get(res, 'payload.data.dataDeleted', null);
            if (bannerRemoved) {
                noti(
                    NOTIFICATION_TYPE.SUCCESS,
                    'Xóa thành banner công!',
                    `Bạn đã xóa ${bannerRemoved.name}  thành công!`,
                );
            } else {
                const ids = _.get(res, 'payload.data.ids', null);
                noti(
                    NOTIFICATION_TYPE.SUCCESS,
                    'Xóa thành banner công!',
                    `Bạn đã xóa ${ids.length} banner  thành công!`,
                );
            }
        });
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
        },
        {
            title: 'Ảnh',
            dataIndex: 'url',
            width: 500,
            render: (url) => (
                <a target="_blank" href={url} className="text-[#02b875]">
                    <img src={url} alt="" />
                </a>
            ),
        },
        {
            title: 'Chuyển hướng',
            dataIndex: 'redirectTo',
        },
        {
            title: 'Trạng thái kích hoạt',
            dataIndex: 'enabled',
            render: (enabled, data) => (
                <Switch checked={enabled} onChange={(checked) => handleUpdateBanner({ ...data, enabled: checked })} />
            ),
        },
        {
            title: 'Độ ưu tiên',
            dataIndex: 'priority',
        },
        {
            title: '',
            render: (data) => {
                return (
                    <Row>
                        <Link to={data._id}>
                            <EditOutlined className="text-xl pr-4" />
                        </Link>
                        <Popconfirm
                            title={`Bạn chắc chắn muốn xóa ${data.name} không?`}
                            onConfirm={() => {
                                handleRemoveBannerByIds([data._id]);
                            }}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined className="text-xl" />
                        </Popconfirm>
                    </Row>
                );
            },
        },
    ];

    return (
        <div className="banner-content">
            {loadding ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <>
                    <div className="flex justify-between align-center pb-4">
                        <Button
                            type="primary"
                            onClick={() => handleRemoveBannerByIds(selectedRowKeys)}
                            className="btn-primary text-white"
                            disabled={_.isEmpty(selectedRowKeys) ? true : false}
                        >
                            Xóa {_.isEmpty(selectedRowKeys) ? '' : _.get(selectedRowKeys, 'length', '') + ' banner'}
                        </Button>
                        <Button type="primary" onClick={() => setOpen(true)} className="btn-primary text-white">
                            Thêm banner
                        </Button>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </>
            )}
            {open && <DrawerCreateBanner open={open} onClose={setOpen} />}
        </div>
    );
};

export default BannerManage;
