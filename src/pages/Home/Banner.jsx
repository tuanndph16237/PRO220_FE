import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
const contentStyle = {
    width: '100%',
    height: '600px',
    color: '#fff',
    lineHeight: '600px',
    textAlign: 'center',
    background: '#364d79',
    border: 'none',
};
const Banner = () => {
    return (
        <Carousel autoplay>
            <div>
                <Link to="dat-lich">
                    <img style={contentStyle} src="http://phatthanhvinh.com/uploads/banner/b.png" alt="" />
                </Link>
            </div>
            <div>
                <Link to="dat-lich">
                    <img
                        style={contentStyle}
                        src="https://bizweb.sapocdn.net/100/438/408/themes/886242/assets/slider_1.jpg?1669448380227"
                        alt=""
                    />
                </Link>
            </div>
        </Carousel>
    );
};

export default Banner;
