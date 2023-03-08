import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { JwtDecode } from '../../utils/auth';
import { getRolePermissionAsync } from '../../slices/role';

const PrivateLayout = ({ children }) => {
    const roleLogin = JwtDecode();
    const dispatch = useDispatch();
    if (!checkAuth()) {
        return <Navigate to="/dang-nhap" />;
    }
    useEffect(() => {
        dispatch(getRolePermissionAsync(roleLogin.role));
    }, []);

    return children;
};

export default PrivateLayout;
