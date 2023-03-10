import React from 'react'
import { Steps } from 'antd';

const OrderProcessing = ({status}) => {
  return (
    <div>
        <Steps
                current={status==5?5:--status}
                percent={60}
                labelPlacement="vertical"
                className="site-navigation-steps"
                items={[
                    {
                        title: 'Chờ xác nhận',
                    },
                    {
                        title: 'Đã xác nhận lịch',
                    },
                    {
                        title: 'Đang xử lý',
                    },
                    {
                        title: 'Thanh toán',
                    },
                    {
                        title: 'Hoàn thành',
                    },
                ]}
            />
    </div>
  )
}

export default OrderProcessing