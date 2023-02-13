import { Steps } from 'antd';
import React from 'react';
import { ORDER_STATUS } from '../../../../constants/order';

const OrderCancel = ({ status }) => {
    console.log(status);

    return (
        <div>
            <Steps
            //  className="site-navigation-steps"
                current={2}
                percent={60}
                labelPlacement="vertical"
                items={[
                    {
                        title: ORDER_STATUS[1],
                    },
                    {
                        title: ORDER_STATUS[0],
                    },
                ]}
            />
        </div>
    );
};

export default OrderCancel;
