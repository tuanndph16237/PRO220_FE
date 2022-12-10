import React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom';
const PageNotFound = () => {
    return (
        <div className="bg-[#02b875] h-screen flex justify-center content-center  items-center">
            <Result
                status="404"
                subTitle={<span className="text-white">Xin lỗi, trang này không tồn tại!</span>}
                extra={
                    <Link to="/" className="text-white hover:text-white text-base font-medium">
                        Trang chủ
                    </Link>
                }
            />
        </div>
    );
};

export default PageNotFound;
