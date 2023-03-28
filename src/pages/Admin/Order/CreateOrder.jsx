import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import _ from 'lodash';
import { SEVICE_TYPE, VEHICLE_TYPE } from '../../../constants/order';
import { HOUR_DATE_TIME } from '../../../constants/format';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { R_EMAIL, R_NUMBER, R_NUMBER_PHONE } from '../../../constants/regex';
import { createOrder } from '../../../api/order';
import { disabledDate, disabledDateTime } from '../../../utils/date';
import { Notification } from '../../../utils/notifications';

const CreateOrder = () => {
    const navigate = useNavigate();
    const { showroomId } = useSelector((state) => state.user.currentUser.values);
    const [date, setDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [isShowroom, setIsShowroom] = useState(true);
    const [service_type, setService_type] = useState([]);

    const onFinish = (data) => {
        setLoading(true);
        createOrder({ ...data, showroomId, status: 2 })
            .then(() => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Thêm đơn hàng thành công!');
                navigate('/admin/don-hang');
            })
            .catch((error) => {
                Notification(NOTIFICATION_TYPE.ERROR, 'Thêm đơn hàng thất bại!', error.message || '');
            });
        setLoading(false);
    };

    const handleChangeSelect = (value) => {
        setService_type(value);
    };

    return (
        <div>
            <Form layout={'vertical'} name="nest-messages" onFinish={onFinish} disabled={!showroomId}>
                <Row className="pt-8 font-mono" gutter={[8, 16]} wrap>
                    <Col span={12}>
                        <Col span={24}>
                            <Col span={24} className="pb-6">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">1</p>}
                                    style={{ backgroundColor: '#02b875' }}
                                />
                                <span className="text-base pl-4 font-medium">Thông tin khách hàng</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={<p className="text-base font-semibold">Họ tên</p>}
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                        },
                                    ]}
                                >
                                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nguyen Van A" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={<p className="text-base font-semibold">Số điện thoại</p>}
                                    name="number_phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                        },
                                        {
                                            pattern: R_NUMBER_PHONE,
                                            message: 'Số điện thoại không đúng định dạng.',
                                        },
                                    ]}
                                >
                                    <Input className="h-10 text-base border-[#02b875]" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={<p className="text-base font-semibold">Email</p>}
                                    name="email"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                    //     },
                                    //     {
                                    //         pattern: R_EMAIL,
                                    //         message: 'Email không đúng định dạng.',
                                    //     },
                                    // ]}
                                >
                                    <Input
                                        type="email"
                                        className="h-10 text-base border-[#02b875]"
                                        placeholder="vidu@gmail.com"
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                    </Col>
                    <Col span={12}>
                        <Col span={24}>
                            <Col span={24} className="pb-6">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">2</p>}
                                    style={{ backgroundColor: '#02b875' }}
                                />
                                <span className="text-base pl-4 font-medium">Dịch vụ</span>
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="serviceType"
                                    label={<p className="text-base font-semibold">Nơi sửa chữa</p>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                        },
                                    ]}
                                    initialValue={SEVICE_TYPE.SHOWROOM}
                                >
                                    <Select
                                        size="large"
                                        placeholder="Sửa chữa tại..."
                                        className="h-10 text-base border-[#02b875]"
                                        onSelect={(value) => {
                                            if (
                                                value === SEVICE_TYPE.SHOWROOM ||
                                                value === SEVICE_TYPE.CONTACT_RESCUE
                                            ) {
                                                setIsShowroom(true);
                                                setService_type([]);
                                                return;
                                            }
                                            setIsShowroom(false);
                                        }}
                                    >
                                        <Select.Option value={SEVICE_TYPE.SHOWROOM}>
                                            Sửa chữa/ Bảo dưỡng tại cửa hàng.
                                        </Select.Option>
                                        <Select.Option value={SEVICE_TYPE.RESCUE}>Cứu hộ 24/7</Select.Option>
                                        <Select.Option value={SEVICE_TYPE.CONTACT_RESCUE}>
                                            Nhận về sửa chữa
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                                {isShowroom ? null : (
                                    <>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Địa chỉ cụ thể</p>}
                                            name="address"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <Input.TextArea
                                                className="text-base border-[#02b875]"
                                                rows={2}
                                                placeholder=""
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Vấn đề cụ thể</p>}
                                            name="service_type"
                                            rules={[
                                                {
                                                    required: service_type.length == 0 ? true : false,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <Select
                                                mode="multiple"
                                                value={service_type}
                                                size="large"
                                                style={{ width: '100%' }}
                                                placeholder="chọn vấn đề bạn gặp phải"
                                                onChange={handleChangeSelect}
                                                options={[
                                                    { value: 'thay_xam', label: 'Thay xăm' },
                                                    { value: 'thay_binh', label: 'Thay bình điện' },
                                                    { value: 'thay_lốp', label: 'Thay lốp' },
                                                ]}
                                                optionLabelProp="label"
                                            />
                                        </Form.Item>
                                    </>
                                )}
                            </Col>
                            {!isShowroom ? null : (
                                <Col span={24}>
                                    <Form.Item
                                        name="appointmentSchedule"
                                        label={<p className="text-base font-semibold">Thời gian</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            },
                                        ]}
                                    >
                                        <DatePicker
                                            size="large"
                                            className="w-full border-[#02b875]"
                                            placeholder="Vui lòng chọn thời gian"
                                            format={HOUR_DATE_TIME}
                                            disabledDate={disabledDate}
                                            disabledTime={disabledDateTime}
                                            value={date}
                                            showNow={false}
                                            onChange={(date, dateString) => {
                                                const dateStringConvert = new Date(dateString);
                                                setDate(dateStringConvert);
                                            }}
                                            showTime
                                        />
                                    </Form.Item>
                                </Col>
                            )}

                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label={<p className="text-base font-semibold">Ghi chú</p>}
                                >
                                    <Input.TextArea
                                        className="text-base border-[#02b875]"
                                        rows={4}
                                        placeholder="Cụ thể yêu cầu với Dodoris"
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                    </Col>
                </Row>
                <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                    <Button
                        htmlType="submit"
                        disabled={loading}
                        loading={loading}
                        className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-12 hover:!text-white hover:out
                        font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                    >
                        Thêm đơn hàng
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateOrder;