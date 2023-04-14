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
            
            <div
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                className="bg-[#eeeceb] py-[20px] px-[200px]"
            >
                <div className="grid grid-cols-2 items-center mb-[60px]">
                <div className="image">
                        <img
                            className="rounded"
                            src="https://cuuhoxemay24h.com/uploads/news/2019_08/cuu-ho-xe-may-24h-ha-noi-dang-web_1000_486_500_243.jpg"
                            alt=""
                        />
                    </div>
                    <div className="text ml-[60px]">
                        <h1 className="text-[32px] leading-tight">
                        CHÚNG TÔI SẼ NHANH CHÓNG CÓ MẶT PHỤC VỤ BẠN TẬN NƠI <br></br> CAM KẾT CỦA CHÚNG TÔI 
                        </h1>
                        <p className="text-[16px] my-[10px]">
                        Linh kiện, phụ tùng chuẩn và chính hãng <br></br> -Không đẩy giá phụ tùng, linh kiện lên cao mà chỉ lấy thêm chi phí dịch vụ di chuyển (55.000đ trong 1 phạm vi 10km, xa hơn sẽ thương lượng) 
                        <br></br> Chi phí sửa chữa, bảo dưỡng sẽ thông nhất sau khi chúng tôi có mặt và kiểm tra tình trạng xe máy của bạn trước khi quyết định sửa chữa. 
                        <br></br> Đối với những sửa chữa nhỏ chúng tôi hoàn toàn không tính chi phí.
                        </p>
                        <a href="#" className="text-[16px] font-bold">
                            <span>
                                GỌI NGAY: 0376021530 <i className="fa-solid fa-arrow-right"></i>
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
                                src="http://thanhxuan.com.vn/Image/Editor/Img/xemay/day-nghe-sua-chua-xe-may.jpg"
                                alt=""
                            />
                            <h2 className="text-[21px] mt-[20px]"> lưu ý, cách nhận biết</h2>
                            <p className="text-[16px] mb-[20px]">
                            Ở trên là những thông tin lưu ý, cách nhận biết cũng như sửa chữa xe máy những bệnh thường gặp,<br></br> hy vọng với những thông tin bổ ích đó sẽ là một cuốn cẩm nang nhỏ<br></br>
                            giúp các bạn đang sử dụng xe máy biết cách phòng tránh cũng như giải quyết các bệnh này một cách hiệu quả nhất.
                            </p>
                            
                        </div>

                        <div>
                            <img
                                className="rounded"
                                src="http://thanhxuan.com.vn/Image/Editor/Img/xemay/day-nghe-sua-chua-xe-may-2017-2018.jpg"
                                alt=""
                            />
                            <h2 className="text-[21px] mt-[20px]">Trong trường hợp không có thời gian</h2>
                            <p className="text-[16px] mb-[20px]">
                            Nếu bạn không có thời gian hoặc công cụ để giải quyết khắc phục các bệnh trên thì hãy mang xe đến trung tâm sửa xe máy <br></br>
                            của chúng tôi để được hỗ trợ tư vấn cũng như sửa chữa nhanh chóng uy tín với chi phi hợp lý nhất nhé! ngoài ra trung tâm chúng tôi còn cung cấp thêm các dịch vụ khác như sửa xe tay ga,<br></br> 
                            vệ sinh kim phun xăng điện tử, làm nồi xe tay ga.</p>
                            
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
            <h1 className="text-[32px]">Cách chọn phụ tùng thay thế</h1>
            <div className="grid grid-cols-2 items-center mb-[60px]">
                    <div className="text ml-[60px]">
                        <h1 className="text-[32px] leading-tight">
                        Khi chọn phụ tùng thay thế cho xe motor-gắn máy cần lưu ý các điểm sau: <br></br> 
                        </h1>
                        <p className="text-[16px] my-[10px]">
                        Phụ tùng phải có xuất xứ, nguồn gốc rõ ràng. Địa chỉ sản xuất, uy tín , chất lượng sản phẩm. <br></br> Phụ tùng phải có thương hiệu, 
                         <br></br> 
                         uy tín trên thị trường nhằm tránh mua nhầm hàng giả, hàng kém chất lượng.
                        </p>
                        
                    </div>
                    <div className="image">
                        <img
                            className="rounded"
                            src="https://dayngheso1.vn/wp-content/uploads/2018/12/dao-tao-sua-chua-xe-may-tai-tap-doan-viet.jpg"
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