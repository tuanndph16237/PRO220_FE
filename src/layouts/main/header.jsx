import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import User from '../User';
import { JwtDecode } from '../../utils/auth';
import { useSelector } from 'react-redux';

const Header = () => {
    const [activeMenu, setActiveMenu] = useState('home');
    const a = useSelector((state) => state.user.currentUser.values);
    const handleClick = (menu) => {
        setActiveMenu(menu);
    };
    return (
        <header className="header-main">
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5">
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Link to="/" className="flex items-center">
                        <img src="/images/myLogo.png" className="mr-3 sm:h-10" alt="Dodoris Logo" />
                        <span className="self-center text-xl text-[#02b875] font-bold whitespace-nowrap">DODORIS</span>
                    </Link>
                    <div className="flex items-center md:order-2">
                        <User />
                    </div>
                    <div
                        className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                        id="mobile-menu-2"
                    >
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0">
                            <li>
                                <Link
                                    to="/"
                                    className={`block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875] ${
                                        activeMenu === 'home' ? 'active' : ''
                                    }`}
                                    onClick={() => handleClick('home')}
                                    aria-current="page"
                                >
                                    Trang chủ
                                </Link>
                            </li>
                            {a.role == 'Quản Lý' || a.role == 'Admin' ||a.role == 'Nhân Viên Kho' ? (
                                <></>
                            ) : (
                                <li>
                                    <Link
                                        to="dat-lich"
                                        className={`block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875] ${
                                            activeMenu === 'booking' ? 'active' : ''
                                        }`}
                                        onClick={() => handleClick('booking')}
                                        aria-current="page"
                                    >
                                        Đặt lịch
                                    </Link>
                                </li>
                            )}
                            <li>
                                <Link
                                    to="#"
                                    className={`block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875] ${
                                        activeMenu === 'services' ? 'active' : ''
                                    }`}
                                    onClick={() => handleClick('services')}
                                    aria-current="page"
                                >
                                    Dịch vụ của chúng tôi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="gioi-thieu"
                                    className={`block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875] ${
                                        activeMenu === 'about' ? 'active' : ''
                                    }`}
                                    onClick={() => handleClick('about')}
                                    aria-current="page"
                                >
                                    Giới thiệu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="tin-tuc"
                                    className={`block py-2 pl-3 pr-4 text-base text-[#3c3c3c] rounded md:bg-transparent md:p-0 hover:text-[#02b875] ${
                                        activeMenu === 'news' ? 'active' : ''
                                    }`}
                                    onClick={() => handleClick('news')}
                                    aria-current="page"
                                >
                                    Tin tức
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