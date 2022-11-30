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
                <Route path="dang-ky" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default App;
