import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Footer, Content } = Layout;

const MainLayout = () => {
    return (
        <Layout>
            <Header>Header</Header>
            <Content>
                <Outlet />
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    );
};

export default MainLayout;
