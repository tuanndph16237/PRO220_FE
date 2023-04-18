import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { getOrdersAsync } from '../../../slices/order';
import { getAllShowroomAsync } from '../../../slices/showroom';
import { EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Select, Space, Table, Tag, Tooltip } from 'antd';
import { HOUR_DATE_TIME } from '../../../constants/format';
import { ORDER_STATUS, SEVICE_TYPE } from '../../../constants/order';
import SpinCustomize from '../../../components/Customs/Spin';
import Filter from '../../../components/Filter/Filter';
import { CSVLink } from 'react-csv';
import PermissionCheck from '../../../components/permission/PermissionCheck';
import { PERMISSION_LABLEL, PERMISSION_TYPE } from '../../../constants/permission';
import { getShowrooms } from '../../../api/showroom';
import { getOrderShowroom } from '../../../api/order';
import { JwtDecode } from '../../../utils/auth';

const OrderManage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const [options, setOptions] = useState([]);
    const orders = useSelector((state) => state.order.orders.values);
    const loading = useSelector((state) => state.order.orders.loading);
    const [handleOrder, setHandleOrder] = useState([]);
    const [csvData, setCsvData] = useState([]);
    const jwtDecode = JwtDecode();
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
            title: 'Tên khá ch hàng',
            dataIndex: 'name',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'number_phone',
        },
        {
            title: 'Loại hình dịch vụ',
            dataIndex: 'serviceType',
        },
        {
            title: 'Thời gian sửa chữa',
            dataIndex: 'appointmentSchedule',
            render: (date) => dayjs(date).format(HOUR_DATE_TIME),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            render: (value) =>
                value > 0 ? (
                    value.toLocaleString('en') + ' VNĐ'
                ) : (
                    <Tag color={'volcano'} key={'loser'}>
                        chưa thanh toán
                    </Tag>
                ),
        },
        {
            title: 'Cửa hàng sửa chữa',
            dataIndex: 'showroomId',
            render: (showroomId) => _.get(_.find(showrooms, ['_id', showroomId]), 'name', ''),
        },
    ];
    useEffect(() => {
        (async () => {
            const { data } = await getShowrooms();
            const setData = data.map((item) => {
                return {
                    label: item.name,
                    value: item._id,
                };
            });
            setOptions(setData);
            handleFilter();
        })();
    }, []);
    useEffect(() => {
        const handleOrder = orders.map((order) => {
            return { ...order, key: order._id };
        });
        setHandleOrder(handleOrder);
    }, [orders]);
    const handleExport = (event, done) => {
        const newCsvData = orders.map((order) => {
            const status = ORDER_STATUS[order.status];
            return {
                name: order.name,
                number_phone: order.number_phone,
                email: order.email,
                status,
                vehicleType: order.vehicleType,
                licensePlates: order.licensePlates,
                serviceType: order.serviceType,
                appointmentSchedule: dayjs(order.appointmentSchedule).format(HOUR_DATE_TIME),
                tg_tra_xe: dayjs(order.tg_tra_xe).format(HOUR_DATE_TIME),
                showroomId: _.get(_.find(showrooms, ['_id', order.showroomId]), 'name', ''),
                total: (order.total && order.total.toLocaleString('en') + ' VNĐ') || '',
                totalWithVat: (order.totalWithVat && order.totalWithVat.toLocaleString('en') + ' VNĐ') || '',
            };
        });
        setCsvData(newCsvData);
        done(true);
    };
    useEffect(() => {
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
    }, [showrooms]);

    const handleFilter = (values = {}) => {
        dispatch(getOrdersAsync(values));
    };
    const handleFilterShowroom = async (value) => {
        const { data } = await getOrderShowroom(value);
        const handleOrder = data.map((order) => {
            return { ...order, key: order._id };
        });
        console.log(handleOrder);
        setHandleOrder(handleOrder);
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
                            {jwtDecode.role == 'Admin' ? (
                                <>
                                    <Select
                                        defaultValue={'Mời bạn lựa chọn'}
                                        options={options}
                                        onChange={handleFilterShowroom}
                                    />
                                </>
                            ) : null}
                        </div>
                        <div>
                            <Button className="btn-primary text-white mr-5" type="primary">
                                <CSVLink
                                    data={csvData}
                                    headers={[
                                        { label: 'Tên khách hàng', key: 'name' },
                                        { label: 'Số điện thoại', key: 'number_phone' },
                                        { label: 'Email', key: 'email' },
                                        { label: 'Loại xe', key: 'vehicleType' },
                                        { label: 'Biển số xe', key: 'licensePlates' },
                                        { label: 'Trạng thái đơn hàng', key: 'status' },
                                        { label: 'Loại hình dịch vụ', key: 'serviceType' },
                                        { label: 'Thời gian sữa chữa', key: 'appointmentSchedule' },
                                        { label: 'Thời gian trả xe', key: 'tg_tra_xe' },
                                        { label: 'Cửa hàng', key: 'showroomId' },
                                        { label: 'Tổng tiền đơn hàng', key: 'total' },
                                        { label: 'Tổng tiền đơn hàng đã có VAT', key: 'totalWithVat' },
                                    ]}
                                    asyncOnClick={true}
                                    separator={';'}
                                    onClick={handleExport}
                                    filename={'Đơn hàng.csv'}
                                >
                                    Xuất excel
                                </CSVLink>
                            </Button>
                            <PermissionCheck
                                permissionHas={{ label: PERMISSION_LABLEL.ORDER_MANAGE, code: PERMISSION_TYPE.CREATE }}
                            >
                                <Button
                                    onClick={() => {
                                        navigate('/admin/them-don-hang');
                                    }}
                                    className="btn-primary text-white mr-5"
                                    type="primary"
                                >
                                    Thêm đơn hàng
                                </Button>
                            </PermissionCheck>
                        </div>
                    </div>
                    <p className="py-5 pt-2">
                        Số lượng đơn hàng: <span className="font-bold">{handleOrder?.length}</span>
                    </p>

                    {loading ? (
                        <div className="absolute top-1/2 left-1/2">
                            <SpinCustomize />
                        </div>
                    ) : (
                        <Table
                            scroll={{
                                x: 1500,
                            }}
                            columns={columns}
                            dataSource={handleOrder}
                        />
                    )}
                </div>
            }
        </div>
    );
};

export default OrderManage;
