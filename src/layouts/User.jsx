import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Divider, Dropdown, List, Skeleton, Space } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { logout, saveUserValues } from '../slices/user';
import { isTokenExpired, JwtDecode } from '../utils/auth';
import { Token } from '../constants/auth';
import { isEmpty } from 'lodash';
import jwtDecode from 'jwt-decode';
import { BellOutlined } from '@ant-design/icons';

const User = (props) => {
    const items = [];
    const [isAdmin, setIsAdmin] = useState(false);
    const [url, setUrl] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser.values);
    const accessToken = useSelector((state) => state.user.currentUser.accessToken);
    const isLogged = useSelector((state) => state.user.isLogged);
    const { pathname } = useLocation();

    useEffect(() => {
        const userDecode = JwtDecode();
        if (!isEmpty(userDecode) || !isEmpty(accessToken)) {
            const Jwt = userDecode ? userDecode : jwtDecode(accessToken);
            dispatch(saveUserValues(Jwt));
            setIsAdmin(!!Jwt.role);
        }
    }, [isLogged]);
    useEffect(() => {
        const url = window.location.href;
        const split = url.split('/')[3];
        setUrl(split);
    }, []);

    useEffect(() => {
        (() => {
            {
                const roleLogin = JwtDecode();
                if (roleLogin && isTokenExpired(roleLogin)) {
                    dispatch(logout());
                    localStorage.removeItem(Token.accessToken);
                }
            }
        })();
    }, [pathname]);
    const hanldelogout = () => {
        dispatch(logout());
        localStorage.removeItem(Token.accessToken);
    };

    const listData = Array.from({ length: 10 }).map((_, i) => ({
        href: 'https://ant.design',
        title: `ant design part ${i + 1}`,
        avatar: `https://joesch.moe/api/v1/random?key=${i}`,
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    }));

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
                                className="text-white bg-[#02b875] hover:bg-[#09915f] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                            >
                                <span className="text-base">Đăng ký miễn phí</span>
                            </Link>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex gap-7 items-center">
                    <Dropdown
                        className="relative"
                        menu={{ items }}
                        dropdownRender={(menu) => (
                            <div
                                className={
                                    props.layoutAdmin
                                        ? 'dropdown-content absolute top-[-32px] right-0 min-w-[450px]'
                                        : 'dropdown-content absolute top-[-10px] right-0 min-w-[450px]'
                                }
                            >
                                <div
                                    className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow "
                                    id="user-dropdown"
                                >
                                    <div className="py-3 px-4">
                                        <span className="block text-sm text-gray-900">Thông Báo</span>
                                    </div>
                                    <div
                                        style={{
                                            height: 500,
                                            overflow: 'auto',
                                            padding: '0 16px',
                                        }}
                                    >
                                        <List
                                            itemLayout="vertical"
                                            size="small"
                                            dataSource={listData}
                                            renderItem={(item) => (
                                                <List.Item>
                                                    <Skeleton loading={false} active avatar>
                                                        <List.Item.Meta
                                                            avatar={<Avatar className="w-6 h-6" src={item.avatar} />}
                                                            title={
                                                                <a className="font-light" href={item.href}>
                                                                    {item.title}
                                                                </a>
                                                            }
                                                            description={item.description}
                                                        />
                                                        {/* {item.content} */}
                                                    </Skeleton>
                                                </List.Item>
                                            )}
                                        />
                                    </div>
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
                                <div
                                    className={
                                        props.layoutAdmin
                                            ? 'w-5 h-5 rounded-[50%] absolute bg-red-500 top-2 right-[-12px]'
                                            : 'w-5 h-5 rounded-[50%] absolute bg-red-500 top-[-8px] right-[-12px]'
                                    }
                                >
                                    <span className="text-white">10</span>
                                </div>
                                <BellOutlined className="w-5 h-6 text-2xl relative" />
                            </button>
                        </Space>
                    </Dropdown>

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
                                        {isAdmin && url !== 'admin' && (
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
                                        {!isAdmin && (
                                            <li>
                                                <Link
                                                    to="/cai-dat/quan-ly-don-hang"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                                >
                                                    Đơn hàng
                                                </Link>
                                            </li>
                                        )}
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
                                    className="w-6 h-6 rounded-full"
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
                </div>
            )}
        </div>
    );
};

export default User;
