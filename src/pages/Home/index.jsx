import { Button } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import Banner from './Banner';

const HomePage = () => {
    return (
        <div>
            <Banner />
            <div className="mx-[30px] my-[50px] grid grid-cols-[580px,auto] gap-8 font-sans font-semi">
                <div className="pl-[140px]">
                    <div className="mb-[96px]">
                        <h1 className="text-[48px] mb-[16px]">Bảo hành & Dịch vụ</h1>
                        <p className="text-[16px]">VinFast đã đầu tư nghiêm túc và bài bản để phát triển hệ <br></br> thống Showroom, Nhà phân phối và xưởng dịch vụ rộng <br></br> khắp, đáp ứng tối đa nhu cầu của Khách hàng.</p>
                    </div>
                    <div className="mb-[60px]">
                        <h3 className="text-[24px] mb-[8px]">Chính sách bảo mật</h3>
                        <p className="text-[16px] mb-[24px]">Bảo hành vượt trội lên đến 10 năm</p>
                        <Link
                            to="/dang-ky"
                            className="inline-block leading-10 text-[14px] h-10 w-[236px] text-[#1464f4] text-center border border-[#1464f4] hover:text-[#fff] hover:bg-[#02b875] hover:border-none"
                        >
                            XEM CHI TIẾT
                        </Link>
                    </div>
                    <div>
                        <h3 className="text-[24px] mb-[8px]">Chính sách bảo mật</h3>
                        <p className="text-[16px] mb-[24px]">Bảo hành vượt trội lên đến 10 năm</p>
                        <Link
                            to="/dang-ky"
                            className="inline-block leading-10 text-[14px] h-10 w-[236px] text-[#1464f4] text-center border border-[#1464f4] hover:text-[#fff] hover:bg-[#02b875] hover:border-none"
                        >
                            ĐẶT LỊCH BẢO DƯỠNG
                        </Link>
                    </div>
                </div>
                <img className="" src="https://storage.googleapis.com/vinfast-data-01/bao-hanh-dich-vu-img_1666150271.png" alt="" />
            </div>
            <div class="mt-[60px] mx-[30px]">
                <div class="text-center">
                    <h1 class="text-[40px] mb-[14px]">BLOG SỬA CHỮA & BẢO DƯỠNG</h1>
                    <p class="text-[16px] mb-[20px]">Với phương châm luôn đặt lợi ích Khách hàng lên hàng đầu, Dodoris áp dụng chính sách cho sửa chữa & bảo dưỡng độc đáo, ưu việt và <br></br> khác biệt với tất cả các mô hình sửa chữa & bảo dưỡng khác từ trước tới nay trên thế giới.</p>
                </div>
                <div class="grid grid-cols-2 gap-8 mt-[35px]">
                    <div className="">
                        <div className="">
                            <a href="#">
                                <img className="w-[100%] h-[500px]" src="https://chuyenxe.com/wp-content/uploads/2019/04/bao-duong-xe-may-honda-2.jpg" alt="Làm sao để loại bỏ vết bẩn trên những chiếc túi cao cấp?" />
                            </a>
                        </div>
                        <div className="text-center py-6 bg-[#f8f9fa]">
                            <h5 className="mb-4">
                                <a href="#" className="text-[24px]">Những điều cần biết khi đi bảo dưỡng xe máy</a>
                            </h5>
                            <Link
                                to="/dang-ky"
                                className="inline-block leading-10 text-base h-10 w-[236px] text-[#1464f4] text-center border border-[#1464f4] hover:text-[#fff] hover:bg-[#02b875] hover:border-none"
                            >
                                XEM CHI TIẾT
                            </Link>
                        </div>
                    </div>
                    <div className="">
                        <a href="#">
                            <img className="w-[100%] h-[500px]" src="https://thietbiruaxegiare.net/wp-content/uploads/2019/06/co-nen-bao-duong-xe-may-tai-hang-3.jpg" alt="Làm sao để loại bỏ vết bẩn trên những chiếc túi cao cấp?" />
                        </a>
                        <div className="text-center py-6 bg-[#f8f9fa]">
                            <h5 className="mb-4">
                                <a href="#" className="text-[24px]">Lý do nên bảo dưỡng xe máy định kỳ</a>
                            </h5>
                            <Link
                                to="/dang-ky"
                                className="inline-block leading-10 text-base h-10 w-[236px] text-[#1464f4] text-center border border-[#1464f4] hover:text-[#fff] hover:bg-[#02b875] hover:border-none"
                            >
                                XEM CHI TIẾT
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
