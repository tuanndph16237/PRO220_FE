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
    { key: 'Quản lý cửa hàng', path: 'quan-ly-cua-hang', icon: <FileDoneOutlined />, label: 'Quản lý cửa hàng' },
    { key: 'Quản lý kho', path: 'quan-ly-kho', icon: <FileDoneOutlined />, label: 'Quản lý kho' },
    { key: 'Quản lý tỉnh', path: 'province', icon: <FileDoneOutlined />, label: 'Quản lý địa chỉ' },
];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const handleClick = ({
        item: {
            props: { path },
        },
        key,
    }) => {
        navigate(`/admin/${path}`);
    };

    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
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
                        <div className="pt-2">
                            <User layoutAdmin={true} />
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
