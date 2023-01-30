import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { getOrdersAsync } from '../../../slices/order';
import { getAllShowroomAsync } from '../../../slices/showroom';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import { HOUR_DATE_TIME } from '../../../constants/format';
import { ORDER_STATUS } from '../../../constants/order';
import SpinCustomize from '../../../components/Customs/Spin';

const OrderManage = () => {
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const orders = useSelector((state) => state.order.orders.values);
    const loading = useSelector((state) => state.order.orders.loading);

    useEffect(() => {
        dispatch(getOrdersAsync());
    }, []);

    useEffect(() => {
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
    }, [showrooms]);

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
            title: 'Tên khách hàng',
            dataIndex: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'number_phone',
        },
        {
            title: 'Cửa hàng sửa chữa',
            dataIndex: 'showroomId',
            render: (showroomId) => _.get(_.find(showrooms, ['_id', showroomId]), 'name', ''),
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
        },
        {
            title: 'Phụ giá',
            dataIndex: 'subPrice',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status, data) => ORDER_STATUS[status],
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
    return (
        <div className="banner-content">
            {loading ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <>
                    <div className="flex justify-between align-center pb-4">
                        <button className="h-10 w-20  text-white bg-[#02b875] hover:bg-[#09915f] hover:!text-white font-medium rounded-lg text-base ">
                            <span>
                                <PlusOutlined className="pr-2 text-white " />
                            </span>
                            Thêm
                        </button>
                    </div>
                    <Table
                        scroll={{
                            x: 3000,
                        }}
                        columns={columns}
                        dataSource={orders}
                    />
                </>
            )}
        </div>
    );
};

export default OrderManage;
