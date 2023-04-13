import React, { useRef, useState } from 'react';
import _ from 'lodash';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import AOS from 'aos';
import 'aos/dist/aos.css';

import './home.css';

import { Autoplay, Pagination } from 'swiper';

const Home = () => {
    return (
        <div>
            <ul className="flex justify-center items-center my-[24px]">
                <li className="border-r border-[#757575] px-[15px] text-[18px] font-bold my-[10px]">
                    <a href="#">SPORT</a>
                </li>
                <li className="border-r border-[#757575] px-[15px] text-[18px] font-bold my-[10px]">
                    <a href="#">CRUISER</a>
                </li>
                <li className="border-r border-[#757575] px-[15px] text-[18px] font-bold my-[10px]">
                    <a href="#">GRAND AMERICAN TOURING</a>
                </li>
                <li className="px-[15px] text-[18px] font-bold my-[10px]">
                    <a href="#">ADVENTURE TOURING</a>
                </li>
            </ul>
            <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="bg-[#eeeceb] py-[20px] px-[200px]"
            >
                <div className="grid grid-cols-2 items-center mb-[60px]">
                <div className="image">
                        <img
                            className="rounded"
                            src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-card/120-anniversary-motos-apparel-mc.jpg?impolicy=myresize&rw=760"
                            alt=""
                        />
                    </div>
                    <div className="text ml-[60px]">
                        <h1 className="text-[32px] leading-tight">
                            TRANG & PHỤC MÔ TÔ <br></br> KỶ NIỆM 120 NĂM
                        </h1>
                        <p className="text-[16px] my-[10px]">
                            Kỷ niệm 120 năm niềm tự hào và tay nghề thủ <br></br> công của Harley-Davidson với Bộ sưu
                            tập kỷ niệm <br></br> phiên bản giới hạn gồm xe mô tô và trang phục kỷ <br></br> niệm.
                        </p>
                        <a href="#" className="text-[16px] font-bold">
                            <span>
                                MUA NGAY <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </a>
                    </div>
                    
                </div>
                
            </div>
            
            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="py-[64px] px-[200px]">
                
                <div className="grid grid-cols-3 gap-8 mt-[10px]">
                   <div>
                            <img
                                className="rounded"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2022/1x1/mens-gm-hero-card-3-up.jpg?impolicy=myresize&rw=400"
                                alt=""
                            />
                            <h2 className="text-[21px] mt-[20px]">TRANG PHỤC CỦA NAM &</h2>
                            <p className="text-[16px] mb-[20px]">
                                Thể hiện người lái lên và xuống xe mô tô với thiết bị <br></br> lái H-D chính hãng và
                                thông thường.
                            </p>
                            <a href="#" className="text-[16px] font-bold">
                                <span>
                                    MUA ĐỒ NAM <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>

                        <div>
                            <img
                                className="rounded"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2022/1x1/womens-gm-hero-card-3-up.jpg?impolicy=myresize&rw=400"
                                alt=""
                            />
                            <h2 className="text-[21px] mt-[20px]">TRANG PHỤC CỦA NỮ &</h2>
                            <p className="text-[16px] mb-[20px]">
                                Cho cả thế giới thấy bạn đi cùng ai. Mua tất cả các <br></br> thiết bị lái H-D và thông
                                thường tại đây.
                            </p>
                            <a href="#" className="text-[16px] font-bold">
                                <span>
                                    MUA ĐỒ NỮ <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>
            </div>
            </div>

            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="py-[64px] px-[200px]">
            <h1 className="text-[32px]">Phụ kiện và vật tư</h1>
            <div className="grid grid-cols-3 gap-8 mt-[10px]">
                <div>
                <img
                                className="rounded"
                                src="https://res.cloudinary.com/vannam042/image/upload/v1680858768/web_app/bn143zucnlcegtl6adb3.jpg"
                                alt=""
                            />
                            <h2 className="text-[21px] mt-[20px]">Dầu làm mát xe máy</h2>
                            <p className="text-[16px] mb-[20px]">
                                20% Off<br></br> 195,000 VNĐ
                            </p>
                </div>

                <div>
                <img
                                className="rounded"
                                src="https://res.cloudinary.com/vannam042/image/upload/v1680858671/web_app/czotd09rbw1wsmjrdngu.jpg"
                                alt=""
                            />
                            <h2 className="text-[21px] mt-[20px]">Dầu máy</h2>
                            <p className="text-[16px] mb-[20px]">
                                20% Off<br></br> 190,000 VNĐ
                            </p>
                </div>

                <div>
                <img
                                className="rounded"
                                src="https://res.cloudinary.com/vannam042/image/upload/v1680858094/web_app/qemoqjlgtnddqckizgcf.jpg"
                                alt=""
                            />
                            <h2 className="text-[21px] mt-[20px]">Bóng đèn</h2>
                            <p className="text-[16px] mb-[20px]">
                                15% Off<br></br> 	160,000 VNĐ
                            </p>
                </div>
                
            </div>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="py-[64px] px-[200px]">
            <h1 className="text-[32px]">Recent News</h1>
            <div className="grid grid-cols-2 items-center mb-[60px]">
                    <div className="text ml-[60px]">
                        <h1 className="text-[32px] leading-tight">
                        LỄ HỘI HARLEY-DAVIDSON <br></br> HOMECOMING
                        </h1>
                        <p className="text-[16px] my-[10px]">
                        Hãy tham gia cùng chúng tôi tại Milwaukee, WI từ ngày 13 đến <br></br> ngày 16 tháng 7 năm
                            2023, để tham dự lễ ra mắt đầu tiên của <br></br> lễ hội kéo dài bốn ngày thường niên khó
                            quên với âm nhạc, <br></br> ẩm thực và văn hóa mô tô.
                        </p>
                        <a href="#" className="text-[16px] font-bold">
                            <span>
                            XEM THÔNG TIN SỰ KIỆN <i className="fa-solid fa-arrow-right"></i>
                            </span>
                        </a>
                    </div>
                    <div className="image">
                        <img
                            className="rounded"
                            src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-card/120-anniversary-motos-apparel-mc.jpg?impolicy=myresize&rw=760"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            
        </div>
    );
};

AOS.init({
    duration: 1000,
    easing: 'ease-out',
    once: true,
});

export default Home;
