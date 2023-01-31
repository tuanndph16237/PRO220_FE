import { Spin } from 'antd';
import React from 'react';

const SpinCustomize = ({ children }) => {
    return (
        <Spin className="spin-customize" tip="Đang tải..." size="large">
            {children}
        </Spin>
    );
};


export default SpinCustomize;


