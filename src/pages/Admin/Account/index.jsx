import React, { useState, useEffect } from 'react';
import { DeleteOutlined, EditOutlined, SyncOutlined } from '@ant-design/icons';
import { Popconfirm, Table, Row, Space, Avatar, Button, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { getAccounts, removeAccount } from '../../../api/account';
import { getAllShowroomAsync } from '../../../slices/showroom';
import CreateAccount from './CreateAccount';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { getAllRoleAsync } from '../../../slices/role';
import UpdateAccount from './UpdateAccount';
import Filter from '../../../components/Filter/Filter';

const AccountManager = () => {
    useDocumentTitle('Quản lý thành viên');
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const roles = useSelector((state) => state.role.valueRole);

    const [open, setOpen] = useState(false);
    const [idUpdate, setIdUpdate] = useState();
    const [data, setData] = useState([]);
    const [roleFilter, setRoleFilter] = useState([]);
    const [showroomsFilter, setShowroomsFilter] = useState([]);

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

    const getAllAccount = (filter) => {
        getAccounts(filter)
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
            return;
        }
        setShowroomsFilter(showrooms.map((showroom) => ({ label: showroom.name, value: showroom._id })));
    }, [showrooms]);
    useEffect(() => {
        if (roles.length === 0) {
            dispatch(getAllRoleAsync());
            return;
        }

        setRoleFilter(roles.map((role) => ({ label: role.name, value: role.id })));
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

    const handleFilter = async (filter) => {
        await getAllAccount(filter);
    };

    return (
        <div className="banner-content">
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
                                label: <Space align="center">Tên</Space>,
                                key: 'name',
                                name: 'Tên',
                            },
                            {
                                label: <Space align="center">Số điện thoại</Space>,
                                key: 'number_phone',
                                name: 'Số điện thoại',
                            },
                            {
                                label: <Space align="center">Email</Space>,
                                key: 'email',
                                name: 'Email',
                            },
                            {
                                label: <Space align="center">Vai trò</Space>,
                                key: 'roleId',
                                type: 'select',
                                mode: 'multiple',
                                values: roleFilter,
                                name: 'Vai trò',
                            },
                            {
                                label: <Space align="center">Cửa hàng</Space>,
                                key: 'showroomId',
                                type: 'select',
                                mode: 'multiple',
                                values: showroomsFilter,
                                name: 'Cửa hàng',
                            },
                        ]}
                        onFilter={handleFilter}
                    />
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
