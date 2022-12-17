import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Role, Token } from '../../constants/auth';
import { JwtDecode } from '../../utils/auth';

const PrivateLayout = ({ children }) => {
    let permission = 0;
    const navigate = useNavigate();
    if (localStorage.getItem(Token.accessToken)) {
        navigate('/');
        const { role } = JwtDecode();
        permission = role;
    }
    if (!permission == Role.ADMIN) return <Navigate to="/" />;
    return children;
};

export default PrivateLayout;
