import React from 'react';
import { Routes, Route } from 'react-router-dom';
import 'antd/dist/reset.css';
import './index.css';
import MainLayout from './layouts/main';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import AdminLayout from './layouts/admin';
function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="about" element={<AboutPage />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    );
}

export default App;
