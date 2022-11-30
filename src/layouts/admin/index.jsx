import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
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

const { Header, Sider, Content } = Layout;

const items = [
    {
        label: 'Thống kê',
        key: 'thong-ke',
        icon: <PieChartOutlined />,
        children: [
            { key: 'thong-ke-don-hang', label: 'Thống kê đơn hàng' },
            { key: 'thong-ke-doanh-thu', label: 'Thống kê doanh thu' },
        ],
    },
    {
        label: 'Quản lý đơn hàng',
        key: 'submenu',
        icon: <FileTextOutlined />,
        children: [
            { key: 'don-hang', label: 'Đơn hàng' },
            { key: 'them-don-hang', label: 'Thêm đơn hàng' },
        ],
    },
    { key: 'Option 3', icon: <FileDoneOutlined />, label: 'Quản lý vật tư' },
    {
        label: 'Quản lý vai trò',
        key: 'submenu',
        icon: <ContactsOutlined />,
        children: [
            { key: 'vai-tro', label: 'Vai trò' },
            { key: 'them-vai-tro', label: 'Thêm vai trò' },
        ],
    },
];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} className="sider-admin-bg" id="sider-admin">
                <img src="/images/admin-logo.png" class="mx-auto my-4 sm:h-16" alt="Dodoris Logo" />
                <Menu
                    style={{ backgroundColor: '#17274e' }}
                    theme="dark"
                    className="sider-admin-bg"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout h-screen">
                <Header
                    style={{
                        padding: 0,
                        backgroundColor: '#ffffff',
                        borderBottom: '1px solid #ccc',
                    }}
                >
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
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
