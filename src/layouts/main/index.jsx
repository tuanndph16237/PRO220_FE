import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';
import './main.css';

const { Content } = Layout;

const MainLayout = () => {
    return (
        <Layout>
            <Header />
            <Content className="content-main bg-white">
                <Outlet />
            </Content>
            <Footer />
        </Layout>
    );
};

export default MainLayout;