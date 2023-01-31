import React from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../../utils/auth';

const PrivateLayout = ({ children }) => {
    if (!checkAuth()) {
        return <Navigate to="/dang-nhap" />;
    }
    return children;
};


export default PrivateLayout;

