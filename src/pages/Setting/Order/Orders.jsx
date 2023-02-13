import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.css';

const Orders = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Orders;
