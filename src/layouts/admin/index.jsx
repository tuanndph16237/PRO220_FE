
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { Layout, Menu, Dropdown, Space } from 'antd';
import { useSelector } from 'react-redux';

import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useNavigation } from 'react-router-dom';
import { Layout, Menu, Dropdown, Space } from 'antd';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    ContactsOutlined,
    FileTextOutlined,
    FileDoneOutlined,
} from '@ant-design/icons';
import './admin-layout.css';

import User from '../User';
import _ from 'lodash';
import { PERMISSION_TYPE, PERMISSION_LABLEL } from '../../constants/permission';

const { Header, Sider, Content } = Layout;

const siderBarItems = [
    {
        label: PERMISSION_LABLEL.STATISTICS,
        key: 'thong-ke',
        code: PERMISSION_TYPE.CONFIRM,


const { Header, Sider, Content } = Layout;

const items = [
    {
        label: 'Thống kê',
        key: 'thong-ke',

        icon: <PieChartOutlined />,
        children: [
            { key: 'Thống kê đơn hàng', path: 'thong-ke-don-hang', label: 'Thống kê đơn hàng' },
            { key: 'Thống kê doanh thu', path: 'thong-ke-doanh-thu', label: 'Thống kê doanh thu' },
        ],
    },
    {

        label: PERMISSION_LABLEL.ORDER_MANAGE,
        key: 'Quản lý đơn hàng',
        code: PERMISSION_TYPE.NULL,
        icon: <FileTextOutlined />,
        children: [
            { key: 'Đơn hàng', code: PERMISSION_TYPE.SHOW, path: 'don-hang', label: 'Đơn hàng' },
            { key: 'Thêm đơn hàng', code: PERMISSION_TYPE.CREATE, path: 'them-don-hang', label: 'Thêm đơn hàng' },
        ],
    },
    {
        key: PERMISSION_LABLEL.PART_MANAGE,
        code: PERMISSION_TYPE.CONFIRM,
        path: 'quan-ly-vat-tu',
        icon: <FileDoneOutlined />,
        label: 'Quản Lý Vật Tư',
    },
    {
        key: PERMISSION_LABLEL.BANNER_MANAGE,
        code: PERMISSION_TYPE.CONFIRM,
        path: 'quan-ly-banner',
        icon: <FileDoneOutlined />,
        label: 'Quản Lý Banner',
    },
    {
        label: PERMISSION_LABLEL.ROLE_MANAGE,
        key: 'Quản lý vai trò',
        code: PERMISSION_TYPE.CONFIRM,
        icon: <ContactsOutlined />,
        children: [
            { key: 'Vai trò', path: 'quan-ly-vai-tro', label: 'Vai trò' },
            { key: 'Quyền', path: 'quan-ly-quyen', label: 'Quản lý quyền' },
        ],
    },
    {
        key: PERMISSION_LABLEL.ACCOUNT_MANAGE,
        path: 'quan-ly-tai-khoan',
        code: PERMISSION_TYPE.CONFIRM,
        icon: <FileDoneOutlined />,
        label: 'Quản Lý Thành Viên',
    },
    {
        label: PERMISSION_LABLEL.SERVICE_MANAGE,
        key: PERMISSION_LABLEL.SERVICE_MANAGE,
        code: PERMISSION_TYPE.CONFIRM,
        icon: <FileDoneOutlined />,
        children: [
            { key: 'danh sach dịch vụ', path: 'quan-ly-dich-vu', label: 'Danh sách dịch vụ' },
            { key: 'Thêm dịch vụ', path: 'them-dich-vu', code: PERMISSION_TYPE.CREATE, label: 'Thêm dịch vụ' },
        ],
    },
    {
        key: PERMISSION_LABLEL.SHOWROOM_MANAGE,
        label: 'Quản Lý Cửa Hàng',
        code: PERMISSION_TYPE.NULL,
        icon: <FileDoneOutlined />,
        children: [
            { key: 'Cửa hàng', path: 'quan-ly-cua-hang', code: PERMISSION_TYPE.SHOW, label: 'Cửa hàng' },
            { key: 'Thêm cửa hàng', path: 'them-cua-hang', code: PERMISSION_TYPE.CREATE, label: 'Thêm cửa hàng' },
        ],
    },
    {
        key: PERMISSION_LABLEL.WAREHOUSE_MANAGE,
        path: 'quan-ly-kho',
        icon: <FileDoneOutlined />,
        code: PERMISSION_TYPE.CONFIRM,
        label: 'Quản Lý Kho',
    },
    {
        key: PERMISSION_LABLEL.LOCATION_MANAGE,
        path: 'province',
        icon: <FileDoneOutlined />,
        code: PERMISSION_TYPE.CONFIRM,
        label: 'Quản Lý Địa Chỉ',
    },
    {
        key: 'Quản lý tin tức',
        path: 'quan-ly-tin-tuc',
        code: PERMISSION_TYPE.CONFIRM,
        icon: <FileDoneOutlined />,
        label: PERMISSION_LABLEL.NEWS_MANAGE,
    },

        label: 'Quản lý đơn hàng',
        key: 'Quản lý đơn hàng',
        icon: <FileTextOutlined />,
        children: [
            { key: 'Đơn hàng', path: 'don-hang', label: 'Đơn hàng' },
            { key: 'Thêm đơn hàng', path: 'them-don-hang', label: 'Thêm đơn hàng' },
        ],
    },
    { key: 'Quản lý vật tư', path: 'quan-ly-vat-tu', icon: <FileDoneOutlined />, label: 'Quản lý vật tư' },
    { key: 'Quản lý banner', path: 'quan-ly-banner', icon: <FileDoneOutlined />, label: 'Quản lý banner' },
    {
        label: 'Quản lý vai trò',
        key: 'Quản lý vai trò',
        icon: <ContactsOutlined />,
        children: [
            { key: 'Vai trò', path: 'vai-tro', label: 'Vai trò' },
            { key: 'Thêm vai trò', path: 'them-vai-tro', label: 'Thêm vai trò' },
        ],
    },

];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const [siderBar, setSiderBar] = useState([]);
    const rolePermission = useSelector((state) => state.role.valueRolePermission.data);

    const navigate = useNavigate();


    const navigate = useNavigate();

    const handleClick = ({
        item: {
            props: { path },
        },
        key,
    }) => {
        navigate(`/admin/${path}`);
    };


    const handleCheckIsAllow = (rolePermissionApi) => {
        let listPermissions = [];
        siderBarItems.forEach((siderBarItem) => {
            if (_.some(rolePermissionApi, (rolePermission) => rolePermission.name == siderBarItem.label)) {
                listPermissions.push(siderBarItem);
            }
        });
        const siderBarList = listPermissions.map((permission) => {
            switch (permission.code) {
                case PERMISSION_TYPE.CONFIRM:
                    return permission;
                    break;
                case PERMISSION_TYPE.NULL:
                    return loopCheckRole(permission, rolePermissionApi);
                    break;
                default:
                    break;
            }
        });
        setSiderBar(siderBarList);
    };

    const loopCheckRole = (permission, rolePermissionApi) => {
        const findMatch = rolePermissionApi.find((catePermission) => catePermission.name == permission.label);
        const childrenData = permission.children.filter((children) => {
            if (_.some(findMatch.listPermissions, (rolePermission) => rolePermission.code == children.code))
                return children;
        });
        return { ...permission, children: childrenData };
    };

    useEffect(() => {
        handleCheckIsAllow(rolePermission);
    }, [rolePermission]);



    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}

                className="sider-admin-bg "

                className="sider-admin-bg"

                id="sider-admin"
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
            >

                <Link to={'/'}>
                    <div className="flex items-center justify-center gap-4">
                        <img src="/images/admin-logo.png" className="my-4 sm:h-16" alt="Dodoris Logo" />
                        <p className="text-[#ffff] font-bold">Dodoris</p>
                    </div>
                </Link>
                <Menu
                    style={{ backgroundColor: '#17274e' }}
                    theme="dark"
                    className="menu-admin-bg "
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={siderBar}
                    onClick={handleClick}
                />
            </Sider>
            <Layout className="site-layout h-screen " style={{ overflow: 'initial', marginLeft: collapsed ? 80 : 200 }}>

                <img src="/images/admin-logo.png" className="mx-auto my-4 sm:h-16" alt="Dodoris Logo" />
                <Menu
                    style={{ backgroundColor: '#17274e' }}
                    theme="dark"
                    className="menu-admin-bg"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onClick={handleClick}
                />
            </Sider>
            <Layout className="site-layout h-screen" style={{ overflow: 'initial', marginLeft: collapsed ? 80 : 200 }}>

                <Header
                    style={{
                        padding: 0,
                        backgroundColor: '#ffffff',
                        borderBottom: '1px solid #ccc',
                    }}
                >

                    <div className="flex justify-between items-center px-10">

                    <div className="flex justify-between content-center px-8">

                        <div>
                            {collapsed ? (
                                <span onClick={() => setCollapsed(!collapsed)} className="trigger">
                                    <MenuUnfoldOutlined className="cursor-pointer" style={{ fontSize: '20px' }} />
                                </span>
                            ) : (
                                <span onClick={() => setCollapsed(!collapsed)} className="trigger">
                                    <MenuFoldOutlined className="cursor-pointer" style={{ fontSize: '20px' }} />
                                </span>
                            )}
                        </div>

                        <User layoutAdmin={true} />
               <div>
                            <Dropdown
                                className="relative"
                                menu={[]}
                                dropdownRender={(menu) => (
                                    <div className="dropdown-content absolute top-[-32px] right-0">
                                        <div
                                            className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
                                            id="user-dropdown"
                                        >
                                            <div className="py-3 px-4">
                                                <span className="block text-sm text-gray-900">user.displayName</span>
                                                <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                                    user.email
                                                </span>
                                            </div>
                                            <ul className="py-1" aria-labelledby="user-menu-button">
                                                <li>
                                                    <Link
                                                        to="#"
                                                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                                    >
                                                        Tài khoản
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="#"
                                                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                                    >
                                                        Đơn hàng
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        // onClick={logout}
                                                        to="/"
                                                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                                    >
                                                        Đăng xuất
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                                trigger={['click']}
                            >
                                <Space className="relative">
                                    <button
                                        type="button"
                                        className=" text-sm rounded-full dark:focus:ring-gray-600 pt-2"
                                        id="user-menu-button"
                                        aria-expanded="false"
                                        data-dropdown-toggle="user-dropdown"
                                        data-dropdown-placement="bottom"
                                    >
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvPJKXmD3mIlfOVee-apUyIhjnkCDFLtLGpxUA5-8hA&s"
                                            alt="user photo"
                                        />
                                    </button>
                                </Space>
                            </Dropdown>
                        </div>

                    </div>
                </Header>
                <Content className="bg-white p-6">
                    <div className="site-layout-background">
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
