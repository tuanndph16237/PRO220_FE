import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { updateOrderAsync } from '../../../slices/order';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrderById } from '../../../api/order';
import _ from 'lodash';


const UpdateOrder = () => {
  const navigate = useNavigate()
  const {id} = useParams();
  const dispatch = useDispatch();
  const [order, setOrder] = useState({})
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    (async () => {
        const {data} = await getOrderById(id)
        setOrder(data)
        setInitialValues(data)
    })()
  }, [id])
  const onFinish = (data) => {
    dispatch(updateOrderAsync({
        _id: order._id,
        data
    }));   
    navigate('/admin/don-hang')
  }
  
  return (
      <div>
        {_.isEmpty(order) ? (
          <div className="absolute top-1/2 left-1/2">
            <Spin tip="" size="large">
                <div className="content" />
            </Spin>
          </div>
        ): (
          <Form layout={'vertical'}  initialValues={initialValues} name="nest-messages" onFinish={onFinish}>
            <Form.Item
              label={<p className="text-base font-semibold">Tên đơn hàng</p>}
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item>
            <Form.Item
              label={<p className="text-base font-semibold">Địa chỉ</p>}
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item>
            <Form.Item
              label={<p className="text-base font-semibold">Số điện thoại</p>}
              name="number_phone"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item>
            {/* <Form.Item
              label={<p className="text-base font-semibold">Giá</p>}
              name="price"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item> */}
            <Form.Item
              label={<p className="text-base font-semibold">Giá phục vụ thêm</p>}
              name="subPrice"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item>
            {/* <Form.Item
              label={<p className="text-base font-semibold">Tên sự kiện</p>}
              name="eventId"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item> */}
            <Form.Item
              label={<p className="text-base font-semibold">Loại hình dịch vụ</p>}
              name="serviceType"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item>
            <Form.Item
              label={<p className="text-base font-semibold">Thời gian tiếp nhận</p>}
              name="appointmentSchedule"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item>
            <Form.Item
              label={<p className="text-base font-semibold">Mô tả</p>}
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Quý khách vui lòng không để trống trường thông tin này.',
                },
              ]}
            >
              <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập mô tả"/>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                className="text-white bg-[#02b875] w-full mb-8 mt-8 h-10 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
              >
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
  )
}

export default UpdateOrder