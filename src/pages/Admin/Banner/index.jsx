import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { Switch, Table, Row, Button } from 'antd';
import { getAllBannerAsync, updateBannerAsync } from '../../../slices/banner';
import './banner.css';

const BannerManage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const dispatch = useDispatch();
    const banners = useSelector((state) => state.banner.banners);

    const data = banners.map((banner) => ({ ...banner, key: banner._id }));
    console.log('data', data);

    useEffect(() => {
        dispatch(getAllBannerAsync());
    }, []);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
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

    const handleRemoveBanner = (ids) => {};

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
                        <Link to="#">
                            <DeleteOutlined className="text-xl" />
                        </Link>
                    </Row>
                );
            },
        },
    ];

    return (
        <div className="banner-content">
            <div className="flex justify-between align-center pb-4">
                <Button
                    size="large"
                    class="focus:outline-none text-base text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                    disabled={_.isEmpty(selectedRowKeys) ? true : false}
                >
                    Xóa {_.isEmpty(selectedRowKeys) ? '' : _.get(selectedRowKeys, 'length', '') + ' banner'}
                </Button>
                <button
                    type="button"
                    class="focus:outline-none h-10 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5"
                >
                    <PlusOutlined className="pr-2 text-white " />
                    Thêm
                </button>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </div>
    );
};

export default BannerManage;
