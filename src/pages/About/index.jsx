import React from 'react';
import {CheckCircleOutlined} from '@ant-design/icons'

const AboutPage = () => {
    return <div>
        <div className='ml-40 mr-40 ' >
            {/* <div className='mt-4 text-center	'>
                <p className='normal-case text-[#02b875] font-bold text-3xl'>Dodoris Việt Nam</p>
            </div>
            <div>
                <div className='mt-4'>
                    <p className='normal-case font-bold text-xl'>1. Lịch sử hình thành Dodoris Việt Nam</p>
                </div>
                <div className='text-lg mt-2'>
                    <p>
                    Được thành lập vào năm 1996, công ty Dodoris Việt Nam là liên doanh giữa Công ty 
                    Dodoris (Nhật Bản), Công ty Dodoris (Thái Lan) và Tổng Công ty Máy Động Lực 
                    và Máy Nông nghiệp Việt Nam với 2 ngành sản phẩm chính: xe máy và xe ô tô. 
                    Gần 30 năm có mặt tại Việt Nam, Dodoris Việt Nam đã không ngừng phát triển và trở 
                    thành một trong những công ty dẫn đầu trong lĩnh vực sửa chửa và bảo dưỡng xe gắn máy 
                    uy tín tại thị trường Việt Nam
                    </p>
                    <p>
                    Dodoris Việt Nam tự hào mang đến cho khách hàng những sản phẩm chất lượng cao, 
                    dịch vụ tận tâm và những đóng góp vì một xã hội giao thông lành mạnh. Với khẩu hiệu 
                    <a className='font-bold'>“Sức mạnh của những Ước mơ”</a>, Dodoris mong muốn được chia sẻ và cùng mọi người thực hiện 
                    ước mơ thông qua việc tạo thêm ra nhiều niềm vui mới cho người dân và xã hội.
                    </p>
                </div>
                <div className='ml-28 mt-4'>
                    <img src="https://toplist.vn/images/800px/cua-hang-sua-chua-xe-may-uy-tin-nhat-tai-ha-noi-379886.jpg" alt="" />
                </div>
            </div> */}
            <div className='mt-4 mb-4'>
                <div>
                    <p className='uppercase font-bold text-4xl text-[#02b875]'>Lý do chọn của hàng</p>
                </div>
                <div className='mt-3'>
                    <p className='text-2xl normal-case'>Chuỗi của hàng sửa xe Dodoris</p>
                </div>
                <div>
                    <p className='text-lg mt-3 w-[500px]'>
                    Với bề dày 25 năm kinh nghiệm, hệ thống Sửa xe DoDoris luôn tự hào với sự tin tưởng 
                    của khách hàng khi sử dụng dịch vụ của chuỗi cửa hàng
                    </p>
                </div>
                <div className='flex text-lg mt-14 mb-28  normal-case font-bold'>
                    <div className='mr-6'>
                        <div className='flex '>
                            <div className='text-[#02b875]'>
                                 < CheckCircleOutlined/>
                            </div>
                            <p className='pl-3'>Trang thiết bị hiện đại</p>
                        </div>
                        <div className='flex'>
                            <div className='text-[#02b875]'>
                                < CheckCircleOutlined/>
                            </div>
                            <p className='pl-3'>Phân viên chu đáo</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex'>
                            <div className='text-[#02b875]'>
                                < CheckCircleOutlined/>
                            </div>
                            <p className='pl-3'>Hỗ trợ nhanh chóng</p>
                        </div>
                        <div className='flex'>
                            <div className='text-[#02b875]'>
                                < CheckCircleOutlined/>
                            </div>
                            <p className='pl-3'>Chính xác kỹ thuật</p>
                        </div>
                    </div>
                </div>
                <div >
                    <img className='h-52 w-[100%]'  src="https://i.pinimg.com/originals/74/0a/9e/740a9e03819515466f4ca138057a27e7.png" alt="" />
                </div>
            </div>
            <div className='mt-24 flex'>
                <div>
                    <p className='uppercase font-bold text-4xl text-[#02b875] w-80'>Chất lương và trình độ</p>
                </div>
                <div className='ml-28 ' >
                    <img src="http://suaxemaytainha.com/wp-content/uploads/2021/06/0000001-25.jpg" alt="" />
                </div>
            </div>
        </div>
        
    </div>;
};

export default AboutPage;
