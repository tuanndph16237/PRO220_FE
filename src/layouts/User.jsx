import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout, saveUserValues } from '../slices/user';
import { JwtDecode } from '../utils/auth';
import { ROLE, Token } from '../constants/auth';
import { isEmpty } from 'lodash';
import jwtDecode from 'jwt-decode';

const User = (props) => {
    const items = [];
    const [isAdmin, setIsAdmin] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser.values);
    const accessToken = useSelector((state) => state.user.currentUser.accessToken);
    const isLogged = useSelector((state) => state.user.isLogged);

    useEffect(() => {
        const userDecode = JwtDecode();
        if (!isEmpty(userDecode) || !isEmpty(accessToken)) {
            const Jwt = userDecode ? userDecode : jwtDecode(accessToken);
            dispatch(saveUserValues(Jwt));
            setIsAdmin(!!Jwt.role);
        }
    }, [isLogged]);
    const hanldelogout = () => {
        dispatch(logout());
        localStorage.removeItem(Token.accessToken);
    };
    return (
        <div>
            {!isLogged ? (
                <div className="flex items-center">
                    <div className="">
                        <Link
                            to="dang-nhap"
                            className="text-slate-300 focus:outline-none 
                focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 
            "
                        >
                            <span className="block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                                Đăng nhập
                            </span>
                        </Link>
                    </div>
                    <div className="">
                        <button
                            type="button"
                            className="text-slate-300 focus:ring-4 focus:outline-none 
focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                        >
                            <Link
                                to="dang-ky"
                                className="text-white bg-[#02b875] hover:bg-[#02B875] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                            >
                                <span className="text-base">Đăng ký miễn phí</span>
                            </Link>
                        </button>
                    </div>
                </div>
            ) : (
                <Dropdown
                    className="relative"
                    menu={{ items }}
                    dropdownRender={(menu) => (
                        <div
                            className={
                                props.layoutAdmin
                                    ? 'dropdown-content absolute top-[-32px] right-0 w-[150px]'
                                    : 'dropdown-content absolute top-[-10px] right-0 w-[150px]'
                            }
                        >
                            <div
                                className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
                                id="user-dropdown"
                            >
                                <div className="py-3 px-4">
                                    <span className="block text-sm text-gray-900">{user.name}</span>
                                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                        {user.number_phone}
                                    </span>
                                </div>
                                <ul className="py-1" aria-labelledby="user-menu-button">
                                    {isAdmin && (
                                        <li>
                                            <Link
                                                to="/admin"
                                                className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                            >
                                                Quản lý cửa hàng
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <Link
                                            to="/cai-dat/tai-khoan"
                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                        >
                                            Tài khoản
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/cai-dat/quan-ly-don-hang"
                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                        >
                                            Đơn hàng
                                        </Link>
                                    </li>

                                    <li>
                                        <Link
                                            onClick={hanldelogout}
                                            to="/"
                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                        >
                                            Đăng xuất
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                    trigger={['click']}
                >
                    <Space className="relative">
                        <button
                            type="button"
                            className=" text-sm rounded-full dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded="false"
                            data-dropdown-toggle="user-dropdown"
                            data-dropdown-placement="bottom"
                        >
                            <img
                                className="w-10 h-10 rounded-full"
                                src={
                                    user.image
                                        ? user.image
                                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvPJKXmD3mIlfOVee-apUyIhjnkCDFLtLGpxUA5-8hA&s'
                                }
                                alt="user photo"
                            />
                        </button>
                    </Space>
                </Dropdown>
            )}
        </div>
    );
};

export default User;
