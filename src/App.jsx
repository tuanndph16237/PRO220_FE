import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import './index.css';
import MainLayout from './layouts/main';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import AdminLayout from './layouts/admin';
import BookingPage from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import BannerManage from './pages/Admin/Banner';

import PageNotFound from './pages/PageNotFound';
import UpdateBanner from './pages/Admin/Banner/UpdateBanner';



import OrderManage from './pages/Admin/Order';
import UpdateOrder from './pages/Admin/Order/UpdateOrder';
import Personal from './pages/Setting';
import UpdateProfile from './pages/Setting/UpdateProfile';
import PrivateSetting from './components/Private/PrivateSetting';
import ChangePassword from './pages/Setting/ChangePassword';
import Orders from './pages/Setting/Orders';
import CreateOrder from './pages/Admin/Order/CreateOrder';


function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="dat-lich" element={<BookingPage />} />

                <Route path="dang-nhap" element={<Login />} />
                <Route path="dang-ky" element={<Register />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route path="quan-ly-banner" element={<BannerManage />} />
                <Route path="quan-ly-banner/:id" element={<UpdateBanner />} />



                <Route path="don-hang" element={<OrderManage />} />
                <Route path="them-don-hang" element={<CreateOrder />} />
                <Route path="don-hang/:id" element={<UpdateOrder />} />

            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
