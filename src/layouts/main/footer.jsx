import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-main bg-white border-gray-200 px-2 sm:px-4 pb-2.5">
            <div className="container mx-auto pt-12">
                <div className="flex justify-between items-center border-b py-6">
                    <div></div>
                    <ul className="flex space-x-6 justify-center">
                        <li className="text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <img src="/images/facebook.png" className="sm:h-8" alt="Facebook Logo" />
                            </Link>
                        </li>
                        <li className="text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <img src="/images/zalo.png" className="sm:h-8" alt="Zalo Logo" />
                            </Link>
                        </li>
                        <li className="text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                <img src="/images/youtube.png" className="sm:h-8" alt="Youtube Logo" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="container flex flex-wrap justify-between mx-auto pt-8 border-b py-6">
                <div>
                    <h2 className="mb-4 text-base font-semibold text-gray-900 uppercase">Công ty Dodoris Việt Nam</h2>
                    <ul className="">
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0">
                            Số GCNĐKDN: 888888888
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0">
                            Đăng ký lần đầu: Ngày 26/6/2022
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0">
                            Phường Phúc Thắng, Thành Phố Phúc Yên, Tỉnh Vĩnh Phúc, Việt Nam
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-4 text-base font-semibold text-gray-900 uppercase">Về Dodoris</h2>
                    <ul className="">
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="/">Trang chủ</Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="/dat-lich">Đặt lịch</Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="/dich-vu-cua-chung-toi">Dịch vụ của chúng tôi</Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="/gioi-thieu">Giới thiệu</Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="/tin-tuc">Tin tức</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-4 text-base font-semibold text-gray-900 uppercase">Chính sách</h2>
                    <ul className="">
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="https://github.com/themesberg/flowbite">Chính sách bảo mật</Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="https://discord.gg/4eeurUVvTy">Chính sách bảo dưỡng</Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="https://discord.gg/4eeurUVvTy">Điều khoản dịch vụ</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-4 text-base font-semibold text-gray-900 uppercase">Tài nguyên</h2>
                    <ul className="">
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="https://github.com/themesberg/flowbite">Blogs</Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="https://discord.gg/4eeurUVvTy">Cộng đồng</Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="https://discord.gg/4eeurUVvTy">Trợ giúp</Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="mb-4 text-base font-semibold text-gray-900 uppercase">Liên hệ</h2>
                    <ul className="">
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="#">
                                <span>
                                    <svg
                                        className="w-4 h-4 inline mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        ></path>
                                    </svg>
                                    0376021530
                                </span>
                            </Link>
                        </li>
                        <li className="mb-2 text-[#777e90] text-base rounded md:bg-transparent md:p-0 hover:text-[#02b875]">
                            <Link to="#">
                                <span>
                                    <svg
                                        className="w-4 h-4 inline mr-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                        ></path>
                                    </svg>
                                    dodoris@gmail.com
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sm:block sm:text-center pt-4">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400 block text-center">
                    © 2022 <Link to="/">Dodoris™</Link>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
