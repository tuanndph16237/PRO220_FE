import React, { useEffect, useState } from 'react';
import { UserSwitchOutlined, UnlockOutlined, FileDoneOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { themeCustom } from '../../utils/theme';
import './setting.css';
import { JwtDecode } from '../../utils/auth';

const { Content, Sider } = Layout;

const Personal = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [path, setPath] = useState('tai-khoan');
    const { pathname } = useLocation();

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleClick = ({
        item: {
            props: { path },
        },
    }) => {
        navigate(`/cai-dat/${path}`);
    };
    useEffect(() => {
        const subString = pathname.substring(9);
        if (pathname.substring(9, 26) == 'quan-ly-don-hang/') {
            setPath('quan-ly-don-hang');
        } else {
            setPath(subString);
        }
        let dataItem = [];
        const Jwt = JwtDecode();
        if (Jwt.role) {
            dataItem.push(
                {
                    key: 'tai-khoan',
                    path: 'tai-khoan',
                    icon: <UserSwitchOutlined />,
                    label: 'Cập nhật tài khoản',
                },
                {
                    key: 'doi-mat-khau',
                    path: 'doi-mat-khau',
                    icon: <UnlockOutlined />,
                    label: 'Đổi mật khẩu',
                },
            );
        } else {
            dataItem.push(
                {
                    key: 'tai-khoan',
                    path: 'tai-khoan',
                    icon: <UserSwitchOutlined />,
                    label: 'Cập nhật tài khoản',
                },
                {
                    key: 'doi-mat-khau',
                    path: 'doi-mat-khau',
                    icon: <UnlockOutlined />,
                    label: 'Đổi mật khẩu',
                },
                {
                    key: 'quan-ly-don-hang',
                    path: 'quan-ly-don-hang',
                    icon: <FileDoneOutlined />,
                    label: 'Quản lý đơn hàng',
                },
            );
        }
        setItems(dataItem);
    }, [pathname]);

    return (
        <Layout
            style={{
                width: '100%',
                backgroundColor: themeCustom.color.setting,
                padding: '20px 0px',
            }}
        >
            <Layout
                className="setting-content"
                style={{
                    width: '75%',
                    margin: 'auto',
                    borderRadius: '40px',
                }}
            >
                <Sider
                    onCollapse={(value) => setCollapsed(value)}
                    style={{ backgroundColor: themeCustom.color.white, minHeight: 550 }}
                >
                    <Menu
                        style={{ backgroundColor: themeCustom.color.white }}
                        defaultSelectedKeys={['tai-khoan']}
                        selectedKeys={[path]}
                        mode="inline"
                        items={items}
                        onClick={handleClick}
                    />
                </Sider>
                <Layout className="site-layout" style={{ backgroundColor: themeCustom.color.setting }}>
                    <Content
                        style={{
                            margin: '0 16px',
                        }}
                    >
                        <div
                            style={{
                                padding: 24,
                                minHeight: 550,
                                background: colorBgContainer,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Personal;
