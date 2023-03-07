import React, { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Row, Space, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { useEffect } from 'react';
import { getAccounts, removeAccount } from '../../../api/account';
import { getAllShowroomAsync } from '../../../slices/showroom';
import CreateAccount from './CreateAccount';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { getAllRoleAsync } from '../../../slices/role';
import UpdateAccount from './UpdateAccount';

const AccountManager = () => {
    useDocumentTitle('Quản lý thành viên');
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const roles = useSelector((state) => state.role.valueRole);

    const [open, setOpen] = useState(false);
    const [idUpdate, setIdUpdate] = useState();
    const [data, setData] = useState([]);

    const handleRefetch = async () => {
        setOpen(false);
        await getAllAccount();
    };

    const handleRefetchUpdateAccount = (updated) => {
        const newData = data.map((item) => {
            if (item._id === updated._id) return updated;
            return item;
        });
        setData(newData);
        setIdUpdate(null);
    };

    const handleRemoveAccount = async (id) => {
        removeAccount(id)
            .then(async (res) => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Xóa thành công!');
                await getAllAccount();
            })
            .catch((err) => {
                Notification(NOTIFICATION_TYPE.ERROR, err.message);
                console.log('remove-account', err);
            });
    };

    const getAllAccount = () => {
        getAccounts()
            .then(({ data: res }) => {
                const newData = res.map((item, index) => {
                    return {
                        key: item._id,
                        ...item,
                    };
                });
                setData(newData);
            })
            .catch((err) => {
                console.log('get acounts err', err);
            });
    };

    useEffect(() => {
        (() => getAllAccount())();
    }, []);

    useEffect(() => {
        if (showrooms.length === 0) {
            dispatch(getAllShowroomAsync());
        }
    }, [showrooms]);
    useEffect(() => {
        if (roles.length === 0) {
            dispatch(getAllRoleAsync());
        }
    }, [roles]);

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            render: (name, data) => {
                return (
                    <Space>
                        <Avatar src={<img src={data.image} alt="avatar" />} />
                        <div>
                            <p className="font-semibold">{name}</p>
                        </div>
                    </Space>
                );
            },
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'number_phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Vai trò',
            dataIndex: 'roleId',
            render: (roleId) => {
                const role = roles.find((role) => role.id === roleId);
                if (!role) return '';
                return role.name;
            },
        },
        {
            title: 'Cửa hàng',
            dataIndex: 'showroomId',
            render: (showroomId) => {
                const showroom = showrooms.find((showroom) => showroom._id === showroomId);
                if (!showroom) return '';
                return showroom.name;
            },
        },
        {
            title: '',
            render: (data) => {
                return (
                    <Row>
                        <EditOutlined className="text-xl pr-4" onClick={() => setIdUpdate(data._id)} />
                        <Popconfirm
                            title={`Bạn chắc chắn muốn xóa ${data.name} không?`}
                            onConfirm={() => {
                                handleRemoveAccount([data._id]);
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
            <div className="flex justify-between align-center pb-4">
                <div>
                    {/* <button className="pr-6" onClick={() => handleFilter()}>
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
                            /> */}
                </div>
                <Button onClick={() => setOpen(true)} className="btn-primary text-white" type="primary">
                    Thêm thành viên
                </Button>
            </div>
            <Table columns={columns} dataSource={data} />
            {open && <CreateAccount open={open} onClose={setOpen} onRefetch={handleRefetch} />}
            {idUpdate && (
                <UpdateAccount idUpdate={idUpdate} onClose={setIdUpdate} onRefetch={handleRefetchUpdateAccount} />
            )}
        </div>
    );
};

export default AccountManager;
