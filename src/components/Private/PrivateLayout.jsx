import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { checkAuth, isTokenExpired } from '../../utils/auth';
import { useDispatch } from 'react-redux';
import { JwtDecode } from '../../utils/auth';
import { getRolePermissionAsync } from '../../slices/role';
import { logout } from '../../slices/user';
import { Token } from '../../constants/auth';

const PrivateLayout = ({ children }) => {
    const roleLogin = JwtDecode();
    const dispatch = useDispatch();
    if (!checkAuth()) {
        return <Navigate to="/dang-nhap" />;
    }
    if (roleLogin && isTokenExpired(roleLogin)) {
        dispatch(logout());
        localStorage.removeItem(Token.accessToken);
        return <Navigate to="/" />;
    }
    useEffect(() => {
        dispatch(getRolePermissionAsync(roleLogin.role));
    }, []);

    return children;
};

export default PrivateLayout;
