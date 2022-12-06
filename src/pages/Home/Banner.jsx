import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Carousel } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBannerAsync } from '../../slices/banner';
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
    const dispatch = useDispatch();
    const banners = useSelector((state) => _.filter(state.banner.banners.values, (banner) => banner.enabled));

    useEffect(() => {
        if (_.isEmpty(banners)) {
            dispatch(getAllBannerAsync({ enabled: true, deleted: false }));
        }
    }, []);
    return (
        <Carousel autoplay>
            {_.map(banners, (banner) => (
                <div key={banner._id}>
                    <Link to={banner.redirectTo}>
                        <img style={contentStyle} src={banner.url} alt="" />
                    </Link>
                </div>
            ))}
        </Carousel>
    );
};

export default Banner;
