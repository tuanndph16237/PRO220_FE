import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getOrdersAsync } from '../../../slices/order';
import { getAllShowroomAsync } from '../../../slices/showroom';
import { EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import { HOUR_DATE_TIME } from '../../../constants/format';
import { ORDER_STATUS, VEHICLE_TYPE } from '../../../constants/order';
import SpinCustomize from '../../../components/Customs/Spin';
import Filter from '../../../components/Filter/Filter';

const OrderManage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const orders = useSelector((state) => state.order.orders.values);
    const loading = useSelector((state) => state.order.orders.loading);
    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            render: (_id) => (
                <Link className="text-[#02b875]" to={_id}>
                    # {_id.substring(18)}
                </Link>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status, data) => ORDER_STATUS[status],
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'name',
        },
        {
            title: 'Địa chỉ sửa chữa',
            dataIndex: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'number_phone',
        },
        {
            title: 'Số km xe đã chạy',
            dataIndex: 'km',
        },
        {
            title: 'Loại xe',
            dataIndex: 'vehicleType',
            render: (value) => {
                const vehicle = VEHICLE_TYPE.find((item) => item.value == value);
                if (vehicle) {
                    return vehicle.label;
                }
            },
        },
        {
            title: 'Biển kiểm soát',
            dataIndex: 'licensePlates',
        },
        {
            title: 'Loại hình dịch vụ',
            dataIndex: 'serviceType',
            render: (servviceType) => (servviceType ? 'Tại cửa hàng' : 'Tại nhà'),
        },
        {
            title: 'Thời gian sửa chữa',
            dataIndex: 'appointmentSchedule',
            render: (date) => moment(date).format(HOUR_DATE_TIME),
        },

        {
            title: 'Mô tả',
            dataIndex: 'description',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            render: (value) => value && value.toLocaleString('en') + ' VNĐ',
        },
        {
            title: 'Phụ giá',
            dataIndex: 'subPrice',
            render: (value) => value && value.toLocaleString('en') + ' VNĐ',
        },
        // {
        //     title: 'VAT',
        //     render: () => '10%',
        // },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            render: (value) => value && value.toLocaleString('en') + ' VNĐ',
        },
        {
            title: 'Cửa hàng sửa chữa',
            dataIndex: 'showroomId',
            render: (showroomId) => _.get(_.find(showrooms, ['_id', showroomId]), 'name', ''),
        },
        {
            title: '',
            render: (data) => {
                return (
                    <Link to={data._id}>
                        <EditOutlined className="text-xl pr-4" />
                    </Link>
                );
            },
        },
    ];
    useEffect(() => {
        handleFilter();
    }, []);

    useEffect(() => {
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
    }, [showrooms]);

    const handleFilter = (values = {}) => {
        dispatch(getOrdersAsync(values));
    };
    return (
        <div className="banner-content">
            {
                <div>
                    <div className="flex justify-between align-center pb-4">
                        <div>
                            <button className="pr-6" onClick={() => handleFilter()}>
                                <Tooltip title="Làm mới đơn hàng">
                                    <SyncOutlined style={{ fontSize: '18px', color: '#000' }} />
                                </Tooltip>
                            </button>
                            <Filter
                                items={[
                                    {
                                        label: <Space align="center">Mã đơn hàng</Space>,
                                        key: '_id',
                                        name: 'Mã đơn hàng',
                                    },
                                    {
                                        label: <Space align="center">Trạng thái</Space>,
                                        key: 'status',
                                        type: 'select',
                                        mode: 'multiple',
                                        values: [
                                            {
                                                label: 'Hủy',
                                                value: 0,
                                            },
                                            {
                                                label: 'Chờ xác nhận',
                                                value: 1,
                                            },
                                            {
                                                label: 'Đã xác nhận',
                                                value: 2,
                                            },
                                            {
                                                label: 'Đang xử lý',
                                                value: 3,
                                            },
                                            {
                                                label: 'Thanh toán',
                                                value: 4,
                                            },
                                            {
                                                label: 'Hoàn thành',
                                                value: 5,
                                            },
                                        ],
                                        name: 'Trạng thái',
                                    },
                                    {
                                        label: <Space align="center">Tên khách hàng</Space>,
                                        key: 'name',
                                        type: 'string',
                                    },
                                    {
                                        label: <Space align="center">Số điện thoại</Space>,
                                        key: 'number_phone',
                                        name: 'Số điện thoại',
                                    },
                                    {
                                        label: <Space align="center">Biển kiểm soát</Space>,
                                        key: 'licensePlates',
                                        name: 'Biển kiểm soát',
                                    },
                                    {
                                        label: <Space align="center">Ngày tạo</Space>,
                                        key: 'createdAt',
                                        type: 'date',
                                        name: 'Ngày tạo',
                                    },
                                    {
                                        label: <Space align="center">Thời gian sửa chữa</Space>,
                                        key: 'appointmentSchedule',
                                        type: 'date',
                                        name: 'Thời gian sửa chữa',
                                    },
                                ]}
                                onFilter={handleFilter}
                            />
                        </div>
                        <Button
                            onClick={() => {
                                navigate('/admin/them-don-hang');
                            }}
                            className="btn-primary text-white"
                            type="primary"
                        >
                            Thêm đơn hàng
                        </Button>
                    </div>

                    {loading ? (
                        <div className="absolute top-1/2 left-1/2">
                            <SpinCustomize />
                        </div>
                    ) : (
                        <Table
                            scroll={{
                                x: 3000,
                            }}
                            columns={columns}
                            dataSource={orders}
                        />
                    )}
                </div>
            }
        </div>
    );
};

export default OrderManage;
