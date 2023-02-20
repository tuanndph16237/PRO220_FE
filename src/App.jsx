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
import ShowRoom from './pages/Admin/showRoom';
import PrivateLayout from './components/Private/PrivateLayout';
import PageNotFound from './pages/PageNotFound';
import UpdateBanner from './pages/Admin/Banner/UpdateBanner';
import PrivateRouter from './components/Private/PrivateRouter';
import OrderManage from './pages/Admin/Order';
import UpdateOrder from './pages/Admin/Order/UpdateOrder';
import Personal from './pages/Setting';
import UpdateProfile from './pages/Setting/UpdateProfile';
import PrivateSetting from './components/Private/PrivateSetting';
import ChangePassword from './pages/Setting/ChangePassword';
import Orders from './pages/Setting/Order/Orders';
import Warehouse from './pages/Admin/Warehouse/Warehouse';
import CreateOrder from './pages/Admin/Order/CreateOrder';
import OrderDetail from './pages/Setting/Order/OrderDetail';
import MaterialManage from './pages/Admin/Material/index';
import DistrictManage from './pages/Admin/District';
import DrawerCreateDistrict from './pages/Admin/District/DrawerCreateDistrict';
import UpdateDistrict from './pages/Admin/District/DrawerUpdateDistrict';
import UpdateMaterial from './pages/Admin/Material/UpdateMaterial';
import ListOrder from './pages/Setting/Order/ListOrder';
import DrawerCreateShowroom from './pages/Admin/showRoom/DrawerCreateShowroom';
import CreateMaterial from './pages/Admin/Material/CreateMaterial';

function App () {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="dat-lich" element={<BookingPage />} />
                <Route
                    path="dang-nhap"
                    element={
                        <PrivateRouter>
                            <Login />
                        </PrivateRouter>
                    }
                />
                <Route
                    path="cai-dat"
                    element={
                        <PrivateSetting>
                            <Personal />
                        </PrivateSetting>
                    }
                >
                    <Route index path="tai-khoan" element={<UpdateProfile />} />
                    <Route index path="doi-mat-khau" element={<ChangePassword />} />
                    <Route path="quan-ly-don-hang" element={<Orders />}>
                        <Route path="" element={<ListOrder status={''} />} />
                        <Route path="da-xac-nhan-lich" element={<ListOrder status={2} />} />
                        <Route path="cho-xac-nhan-lich" element={<ListOrder status={1} />} />
                        <Route path="dang-xu-ly" element={<ListOrder status={3} />} />
                        <Route path="thanh-toan" element={<ListOrder status={4} />} />
                        <Route path="hoan-thanh" element={<ListOrder status={5} />} />
                        <Route path="huy" element={<ListOrder status={0} />} />
                        <Route path=":id" element={<OrderDetail />} />
                        <Route path="da-xac-nhan-lich/:id" element={<OrderDetail />} />
                        <Route path="cho-xac-nhan-lich/:id" element={<OrderDetail />} />
                        <Route path="dang-xu-ly/:id" element={<OrderDetail />} />
                        <Route path="thanh-toan/:id" element={<OrderDetail />} />
                        <Route path="hoan-thanh/:id" element={<OrderDetail />} />
                        <Route path="huy/:id" element={<OrderDetail />} />
                    </Route>
                </Route>
                <Route path="dang-ky" element={<Register />} />
            </Route>
            <Route
                path="/admin"
                element={
                    <PrivateLayout>
                        <AdminLayout />
                    </PrivateLayout>
                }
            >
                <Route path="dang-ky" element={<Register />} />
                <Route path="quan-ly-banner" element={<BannerManage />} />
                <Route path="quan-ly-cua-hang" element={<ShowRoom />} />
                <Route path="quan-ly-vat-tu" element={<MaterialManage />} />
                <Route path="quan-ly-vat-tu/:id" element={<UpdateMaterial />} />
                <Route path="them-cua-hang" element={<DrawerCreateShowroom />} />
                <Route path="quan-ly-banner/:id" element={<UpdateBanner />} />
                <Route path="don-hang" element={<OrderManage />} />
                <Route path="them-don-hang" element={<CreateOrder />} />
                <Route path="don-hang/:id" element={<UpdateOrder />} />
                <Route path="quan-ly-kho" element={<Warehouse />} />
                <Route path='tinh' element={<DistrictManage/>}/>
                <Route path='tinh/them' element={<DrawerCreateDistrict/>}/>
                <Route path='tinh/:id' element={<UpdateDistrict/>}/>
                <Route path="them-vat-tu" element={<CreateMaterial />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default App;
