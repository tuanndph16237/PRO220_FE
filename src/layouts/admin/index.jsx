import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;

const AdminLayout = () => {
    return (
        <Layout>
            <Sider>Sider</Sider>
            <Layout>
                <Header>Header</Header>
                <Content>
                    <Outlet />
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
