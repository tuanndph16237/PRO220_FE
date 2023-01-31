import React from 'react';
import { Navigate } from 'react-router-dom';
import { JwtDecode } from '../../utils/auth';

const PrivateSetting = ({ children }) => {
    if (!JwtDecode()) return <Navigate to="/dang-nhap" />;
    return children;
};

export default PrivateSetting;
