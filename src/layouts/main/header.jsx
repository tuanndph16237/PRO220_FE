import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Space } from 'antd';

const Header = () => {
    const items = [];
    return (
        <header>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link to="/" className="flex items-center">
                        <img src="/images/logo.png" className="mr-3 sm:h-16" alt="Dodoris Logo" />
                        <span className="self-center text-xl text-[#02b875] font-bold whitespace-nowrap">DODORIS</span>
                    </Link>
                    <div className="flex items-center md:order-2">
                        {/* <Dropdown
                            className="relative"
                            menu={{ items }}
                            dropdownRender={(menu) => (
                                <div className="dropdown-content absolute top-[-10px] right-0">
                                    <div
                                        className="z-50 my-4 text-base list-none bg-white rounded divide-y divide-gray-100 shadow"
                                        id="user-dropdown"
                                    >
                                        <div className="py-3 px-4">
                                            <span className="block text-sm text-gray-900">user.displayName</span>
                                            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                                                user.email
                                            </span>
                                        </div>
                                        <ul className="py-1" aria-labelledby="user-menu-button">
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                                >
                                                    Tài khoản
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    className="block py-2 px-4 text-sm text-gray-700 hover:bg-[#02b875] hover:text-white"
                                                >
                                                    Đơn hàng
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    // onClick={logout}
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
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLvPJKXmD3mIlfOVee-apUyIhjnkCDFLtLGpxUA5-8hA&s"
                                        alt="user photo"
                                    />
                                </button>
                            </Space>
                        </Dropdown> */}
                        <div className="flex items-center">
                            <div className="">
                                <Link
                                    to="dang-nhap"
                                    className="text-slate-300 focus:ring-4 focus:outline-none 
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
                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                            <li>
                                <Link
                                    to="#"
                                    className="block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875]"
                                    aria-current="page"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="dat-lich"
                                    className="block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875]"
                                    aria-current="page"
                                >
                                    Đăt lịch
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875]"
                                    aria-current="page"
                                >
                                    Dịch vụ của chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875]"
                                    aria-current="page"
                                >
                                    Giới thiệu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="#"
                                    className="block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875]"
                                    aria-current="page"
                                >
                                    Tin tức
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
