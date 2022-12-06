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

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const BannerManage = () => {
    const dispatch = useDispatch();
    const banners = useSelector((state) => state.banner.banners.values);
    const loadding = useSelector((state) => state.banner.banners.loading);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);

    const data = banners.map((banner) => ({ ...banner, key: banner._id }));
    useEffect(() => {
        dispatch(getAllBannerAsync());
    }, []);

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
                            size="large"
                            onClick={() => handleRemoveBannerByIds(selectedRowKeys)}
                            className="focus:outline-none text-base text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            disabled={_.isEmpty(selectedRowKeys) ? true : false}
                        >
                            Xóa {_.isEmpty(selectedRowKeys) ? '' : _.get(selectedRowKeys, 'length', '') + ' banner'}
                        </Button>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="focus:outline-none h-10 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5"
                        >
                            <PlusOutlined className="pr-2 text-white " />
                            Thêm
                        </button>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </>
            )}
            {open && <DrawerCreateBanner open={open} onClose={setOpen} />}
        </div>
    );
};

export default BannerManage;
