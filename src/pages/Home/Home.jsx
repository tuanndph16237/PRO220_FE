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
                    <div className="image">
                        <img
                            className="rounded"
                            src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-card/120-anniversary-motos-apparel-mc.jpg?impolicy=myresize&rw=760"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="image">
                        <img
                            className="rounded"
                            src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-card/120-homecoming-media-card.jpg?impolicy=myresize&rw=760"
                            alt=""
                        />
                    </div>
                    <div className="text ml-[30px]">
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
                </div>
            </div>
            <div data-aos="fade-up" data-aos-anchor-placement="center-bottom" className="py-[64px] px-[200px]">
                <h1 className="text-[28px] mb-[30px]">Mới cho năm 2023</h1>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <div className="">
                            <img
                                className="rounded h-[500px]"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-carousel/new-nightster-media-carousel.jpg?impolicy=myresize&r"
                                alt=""
                            />
                        </div>
                        <div className="mt-[16px]  text-center">
                            <h3 className="text-[17px]">NIGHTSTER™ 2023</h3>
                            <p className="text-[14px] py-2">
                                Được thiết kế để truyền cảm hứng cho cả những tay đua mới và lão làng nhờ khả năng xử lý
                                nhanh nhẹn và kiểu dáng cổ điển.
                            </p>
                            <a href="#" className="text-[16px] font-bold">
                                <span>
                                    XEM TIẾP <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="">
                            <img
                                className="rounded"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-carousel/new-nightster-special-media-carousel.jpg?impolicy=myresize&r"
                                alt=""
                            />
                        </div>
                        <div className="mt-[16px] text-center">
                            <h3 className="text-[17px]">NIGHTSTER™ SPECIAL 2023</h3>
                            <p className="text-[14px] py-2">
                                Chuyến đi chinh phục màn đêm cho hai người. Nightster™ Special 2023 đem đến một chuyến
                                đi mới ly kỳ mang hình bóng Sportster™ cổ điển.
                            </p>
                            <a href="#" className="text-[16px] font-bold">
                                <span>
                                    XEM TIẾP <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="">
                            <img
                                className="rounded"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-carousel/new-breakout-media-carousel.jpg?impolicy=myresize&r"
                                alt=""
                            />
                        </div>
                        <div className="mt-[16px] text-center">
                            <h3 className="text-[17px]">BREAKOUT™</h3>
                            <p className="text-[14px] py-2">
                                Để đêm nào cũng là đêm lái xe với Breakout 117 2023–chiếc cruiser hầm hố trong lớp mạ
                                crôm.
                            </p>
                            <a href="#" className="text-[16px] font-bold">
                                <span>
                                    XEM TIẾP <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="">
                            <img
                                className="rounded"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-carousel/new-freewheeler-media-carousel.jpg?impolicy=myresize&r"
                                alt=""
                            />
                        </div>
                        <div className="mt-[16px] text-center">
                            <h3 className="text-[17px]">FREEWHEELER™ 2023</h3>
                            <p className="text-[14px] py-2">
                                Phong thái hot-rod trên ba bánh xe, Freewheeler 2023 mang đến phong cách mạnh mẽ, sự tự
                                tin và hiệu suất.
                            </p>
                            <a href="#" className="text-[16px] font-bold">
                                <span>
                                    XEM TIẾP <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="">
                            <img
                                className="rounded"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2023/media-carousel/new-cvorgl-media-carousel.jpg?impolicy=myresize&r"
                                alt=""
                            />
                        </div>
                        <div className="mt-[16px] text-center">
                            <h3 className="text-[17px]">PHIÊN BẢN KỈ NIỆM CVO™ ROAD GLIDE™ 2023</h3>
                            <p className="text-[14px] py-2">
                                Một chiếc bagger tùy chỉnh số lượng cực kỳ hạn chế, được trang bị các chi tiết, sức mạnh
                                và kiểu dáng độc quyền để kỷ niệm 120 năm xe mô tô Harley-Davidson®. Đó là chuyến đi
                                cuối cùng đến sự kiện H-D Homecoming™.
                            </p>
                            <a href="#" className="text-[16px] font-bold">
                                <span>
                                    XEM TIẾP <i className="fa-solid fa-arrow-right"></i>
                                </span>
                            </a>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="mt-[60px] mb-[30px] px-[280px]">
                <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
                    <h1 className="text-[32px]">
                        Xem hàng mới về{' '}
                        <span className="inline-block border-t-2 border-[#fa6600] h-[10px] w-[24px]"></span>
                    </h1>
                    <div className="grid grid-cols-2 mt-[10px]">
                        <div>
                            <img
                                className="rounded"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2022/4x3/gm-new-arrivals-mens-hero-card-4x3.jpg?impolicy=myresize&rw=650"
                                alt=""
                            />
                            <a href="#" className="inline-block font-bold text-[16px] pt-[22px]">
                                MUA ĐỒ NAM <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                        <div>
                            <img
                                className="rounded"
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2022/4x3/gm-new-arrivals-womens-hero-card-4x3.jpg?impolicy=myresize&rw=650"
                                alt=""
                            />
                            <a href="#" className="inline-block font-bold text-[16px] pt-[22px]">
                                MUA ĐỒ NỮ <i className="fa-solid fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" className="mt-[60px]">
                    <h1 className="text-[32px]">
                        Mua Phụ tùng & Quần áo{' '}
                        <span className="inline-block border-t-2 border-[#fa6600] h-[10px] w-[24px]"></span>
                    </h1>
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
                                src="https://www.harley-davidson.com/content/dam/h-d/images/promo-images/2022/1x1/gm-parts-hero-card-3-up.jpg?impolicy=myresize&rw=400"
                                alt=""
                            />
                            <h2 className="text-[21px] mt-[20px]">PHỤ TÙNG & PHỤ KIỆN</h2>
                            <p className="text-[16px] mb-[20px]">
                                Đẩy nó lên một tốc độ cao hơn. Thời điểm hoàn hảo <br></br> để tân trang lại chuyến đi
                                của bạn.
                            </p>
                            <a href="#" className="text-[16px] font-bold">
                                <span>
                                    SHOP PARTS <i className="fa-solid fa-arrow-right"></i>
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
