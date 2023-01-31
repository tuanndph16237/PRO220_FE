
import React, { useState } from 'react';
import { Avatar, Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';

import dayjs from 'dayjs';
import './booking.css';


const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

import { HOUR_DATE_TIME } from '../../constants/format';
import { search } from '../../api/showroom';
import './booking.css';
import SpinCustomize from '../../components/Customs/Spin';
import { createBannerByCustomer } from '../../api/order';
import { Notification } from '../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../constants/status';
import { getAllShowroomAsync } from '../../slices/showroom';
import { SEVICE_TYPE, VEHICLE_TYPE } from '../../constants/order';
import { R_EMAIL, R_NUMBER, R_NUMBER_PHONE } from '../../constants/regex';
import { disabledDate, disabledDateTime } from '../../utils/date';


const BookingPage = () => {
    const [isShowroom, setIsShowroom] = useState(true);
    const [date, setDate] = useState(new Date());

    const disabledDate = (current) => {
        return current && current < dayjs().endOf('day').subtract(1, 'days');

    const [showroomsFilter, setShowroomsFilter] = useState([]);
    const [filter, setFilter] = useState('');
    const [initialValues, setInitialValues] = useState({});
    const searchTemp = useRef(null);

    useEffect(() => {
        if (!_.isEmpty(user) && isLogged) {
            setInitialValues({
                name: user.name,
                email: user.email,
                number_phone: user.number_phone,
            });
        }
        setLoadingInital(false);
    }, [user, isLogged]);

    useEffect(() => {
        //call api get showroom
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
        if (!_.isEmpty(showrooms)) {
            setShowroomsFilter(showrooms);
        }
    }, [showrooms]);

    const onFinish = (values) => {
        setCreatingBooking(true);
        createBannerByCustomer({ ...values, accountId: user._id || null })
            .then(({ data: { message } }) => {
                if (message) {
                    Notification(NOTIFICATION_TYPE.WARNING, message);
                    return;
                }
                if (isLogged) {
                    Notification(
                        NOTIFICATION_TYPE.SUCCESS,
                        'Bạn đã đặt lịch thành công!',
                        'Theo dõi lịch trong phần đơn hàng!',
                    );
                    return null;
                }
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Bạn đã đặt lịch thành công!');
            })
            .catch((error) => {
                console.log('error', error);
                Notification(NOTIFICATION_TYPE.ERROR, error.message);
            })
            .finally(() => {
                setCreatingBooking(false);
            });

    };
    const disabledDateTime = () => ({
        disabledHours: () => [...range(0, 7), ...range(12, 13), ...range(18, 24)],
        disabledMinutes: () => range(0),
        disabledSeconds: () => range(0, 60),
    });
    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="w-full content-booking py-16">

            <Form
                className="bg-white px-6 max-w-screen-lg mx-auto"
                name="booking-form"
                layout={'vertical'}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <h1 className="text-center text-xl font-semibold text-[#1f2125] pt-8 ">ĐẶT LỊCH DỊCH VỤ</h1>
                <Row className="pt-8 font-mono" gutter={[8, 16]} wrap>
                    <Col span={12}>
                        <Col span={24}>
                            <Col span={24} className="pb-6">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">1</p>}
                                    style={{ backgroundColor: '#707070' }}
                                />
                                <span className="text-base pl-4 font-medium">Thông tin khách hàng</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={<p className="text-base font-semibold">Họ tên</p>}
                                    name="fullname"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                        },
                                    ]}
                                >
                                    <Input className="h-10 text-base border-[#02b875]" placeholder="Nhập họ và tên" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={<p className="text-base font-semibold">Số điện thoại</p>}
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                        },
                                        {
                                            min: 10,
                                            message: 'Số điện thoại không đúng định dạng.',
                                        },
                                        {
                                            max: 11,
                                            message: 'Số điện thoại không đúng định dạng.',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="h-10 text-base border-[#02b875]"
                                        min="0"
                                        type="number"
                                        placeholder="Tối thiểu 10 chữ số"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label={<p className="text-base font-semibold">Email</p>}
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                        },
                                    ]}
                                >
                                    <Input
                                        type="email"
                                        className="h-10 text-base border-[#02b875]"
                                        placeholder="vidu@gmail.com"
                                    />
                                </Form.Item>
                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col span={24} className="pb-6">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">3</p>}
                                    style={{ backgroundColor: '#707070' }}
                                />
                                <span className="text-base pl-4 font-medium">Địa điểm và Thời gian</span>
                            </Col>
                            <Col span={24}>
                                {isShowroom ? (


            {loadingInital ? (
                <SpinCustomize>
                    <Form
                        className="bg-white px-6 max-w-screen-lg mx-auto rounded"
                        name="booking-form"
                        layout={'vertical'}
                        initialValues={initialValues}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <h1 className="text-center text-xl font-semibold text-[#1f2125] pt-8 ">ĐẶT LỊCH DỊCH VỤ</h1>
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
                                            <Input
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="Nguyen Van A"
                                            />
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
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                                {
                                                    pattern: R_EMAIL,
                                                    message: 'Email không đúng định dạng.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                type="email"
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="vidu@gmail.com"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={24} className="pb-6">
                                        <Avatar
                                            size={34}
                                            icon={<p className="text-base font-semibold leading-8">3</p>}
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
                                                    if (value === SEVICE_TYPE.SHOWROOM) {
                                                        setIsShowroom(true);
                                                        return;
                                                    }
                                                    setIsShowroom(false);
                                                }}
                                            >
                                                <Select.Option value={SEVICE_TYPE.SHOWROOM}>
                                                    Sửa chữa/ Bảo dưỡng tại cửa hàng.
                                                </Select.Option>
                                                <Select.Option value={SEVICE_TYPE.HOUSE}>
                                                    Sửa chữa/ Bảo dưỡng tại nhà.
                                                </Select.Option>
                                            </Select>
                                        </Form.Item>
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
                            <Col span={12}>
                                <Col span={24}>
                                    <Col span={24} className="pb-6">
                                        <Avatar
                                            size={34}
                                            icon={<p className="text-base font-semibold leading-8">2</p>}
                                            style={{ backgroundColor: '#02b875' }}
                                        />
                                        <span className="text-base pl-4 font-medium">Thông tin xe</span>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Số km xe đã chạy</p>}
                                            name="km"
                                            rules={[
                                                {
                                                    pattern: R_NUMBER,
                                                    message: 'Số km không đúng định dạng.',
                                                },
                                            ]}
                                        >
                                            <Input className="h-10 text-base border-[#02b875]" placeholder="" />
                                        </Form.Item>
                                        <Form.Item
                                            name="vehicleType"
                                            label={<p className="text-base font-semibold">Loại xe</p>}
                                            initialValue={SEVICE_TYPE.SHOWROOM}
                                        >
                                            <Select size="large" className="h-10 text-base border-[#02b875]">
                                                {VEHICLE_TYPE.map((item) => (
                                                    <Select.Option
                                                        key={item.value}
                                                        value={item.value}
                                                        label={item.label}
                                                    >
                                                        {item.label}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Biển số xe</p>}
                                            name="licensePlates"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="XX-XX/12345"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
                                <Col span={24}>
                                    <Col span={24} className="pb-6">
                                        <Avatar
                                            size={34}
                                            icon={<p className="text-base font-semibold leading-8">4</p>}
                                            style={{ backgroundColor: '#02b875' }}
                                        />
                                        <span className="text-base pl-4 font-medium">Địa điểm và Thời gian</span>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            name="showroomId"
                                            label={<p className="text-base font-semibold">Cửa hàng</p>}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                value={filter}
                                                placeholder="Tìm kiếm cửa hàng theo tên, địa chỉ."
                                                className="h-10 text-base border-[#02b875]"
                                                optionLabelProp="label"
                                                showSearch
                                                onSearch={handleSearch}
                                                onChange={handleChange}
                                                filterOption={false}
                                            >
                                                {_.map(showroomsFilter, (showroom) => (
                                                    <Select.Option
                                                        value={showroom._id}
                                                        key={showroom._id}
                                                        label={showroom.name + ' - ' + showroom.address}
                                                    >
                                                        <div span={24}>
                                                            <div span={24}>
                                                                <span className="text-base font-medium text-[#02b875]">
                                                                    {showroom.name}
                                                                </span>
                                                            </div>
                                                            <div span={24}>
                                                                <span className="font-medium">{showroom.address}</span>
                                                            </div>
                                                        </div>
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        {isShowroom ? null : (
                                            <Form.Item
                                                label={<p className="text-base font-semibold">Địa chỉ cụ thể</p>}
                                                name="address"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Quý khách vui lòng không để trống trường thông tin này.',
                                                    },
                                                ]}
                                            >
                                                <Input.TextArea
                                                    className="text-base border-[#02b875]"
                                                    rows={2}
                                                    placeholder=""
                                                />
                                            </Form.Item>
                                        )}
                                    </Col>
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
                                                showToday
                                                value={date}
                                                onChange={(date, dateString) => {
                                                    const dateStringConvert = new Date(dateString);
                                                    setDate(dateStringConvert);
                                                }}
                                                showTime
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                            <Button
                                htmlType="submit"
                                disabled={creatingBooking}
                                loading={creatingBooking}
                                className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-12 hover:text-white focus:ring-4 focus:outline-none
                                font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                            >
                                Đặt lịch
                            </Button>
                        </Form.Item>
                    </Form>
                </SpinCustomize>
            ) : (
                <Form
                    className="bg-white px-6 max-w-screen-lg mx-auto rounded"
                    name="booking-form"
                    layout={'vertical'}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <h1 className="text-center text-xl font-semibold text-[#1f2125] pt-8 ">ĐẶT LỊCH DỊCH VỤ</h1>
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
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            },
                                            {
                                                pattern: R_EMAIL,
                                                message: 'Email không đúng định dạng.',
                                            },
                                        ]}
                                    >
                                        <Input
                                            type="email"
                                            className="h-10 text-base border-[#02b875]"
                                            placeholder="vidu@gmail.com"
                                        />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={24} className="pb-6">
                                    <Avatar
                                        size={34}
                                        icon={<p className="text-base font-semibold leading-8">3</p>}
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
                                                if (value === SEVICE_TYPE.SHOWROOM) {
                                                    setIsShowroom(true);
                                                    return;
                                                }
                                                setIsShowroom(false);
                                            }}
                                        >
                                            <Select.Option value={SEVICE_TYPE.SHOWROOM}>
                                                Sửa chữa/ Bảo dưỡng tại cửa hàng.
                                            </Select.Option>
                                            <Select.Option value={SEVICE_TYPE.HOUSE}>
                                                Sửa chữa/ Bảo dưỡng tại nhà.
                                            </Select.Option>
                                        </Select>
                                    </Form.Item>
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
                        <Col span={12}>
                            <Col span={24}>
                                <Col span={24} className="pb-6">
                                    <Avatar
                                        size={34}
                                        icon={<p className="text-base font-semibold leading-8">2</p>}
                                        style={{ backgroundColor: '#02b875' }}
                                    />
                                    <span className="text-base pl-4 font-medium">Thông tin xe</span>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label={<p className="text-base font-semibold">Số km xe đã chạy</p>}
                                        name="km"
                                        rules={[
                                            {
                                                pattern: R_NUMBER,
                                                message: 'Số km không đúng định dạng.',
                                            },
                                        ]}
                                    >
                                        <Input className="h-10 text-base border-[#02b875]" placeholder="" />
                                    </Form.Item>
                                    <Form.Item
                                        name="vehicleType"
                                        label={<p className="text-base font-semibold">Loại xe</p>}
                                        initialValue={SEVICE_TYPE.SHOWROOM}
                                    >
                                        <Select size="large" className="h-10 text-base border-[#02b875]">
                                            {VEHICLE_TYPE.map((item) => (
                                                <Select.Option key={item.value} value={item.value} label={item.label}>
                                                    {item.label}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        label={<p className="text-base font-semibold">Biển số xe</p>}
                                        name="licensePlates"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            },
                                        ]}
                                    >
                                        <Input className="h-10 text-base border-[#02b875]" placeholder="XX-XX/12345" />
                                    </Form.Item>
                                </Col>
                            </Col>
                            <Col span={24}>
                                <Col span={24} className="pb-6">
                                    <Avatar
                                        size={34}
                                        icon={<p className="text-base font-semibold leading-8">4</p>}
                                        style={{ backgroundColor: '#02b875' }}
                                    />
                                    <span className="text-base pl-4 font-medium">Địa điểm và Thời gian</span>
                                </Col>
                                <Col span={24}>

                                    <Form.Item
                                        name="showroomId"
                                        label={<p className="text-base font-semibold">Cửa hàng</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            },
                                        ]}
                                    >
                                        <Select
                                            size="large"


                                            placeholder="Sửa chữa tại..."

                                            value={filter}
                                            placeholder="Tìm kiếm cửa hàng theo tên, địa chỉ."

                                            className="h-10 text-base border-[#02b875]"
                                        >
                                            <Option value="1">111111</Option>
                                            <Option value="0">2222</Option>
                                        </Select>
                                    </Form.Item>

                                ) : (

                                    {isShowroom ? null : (
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
                                    )}
                                </Col>
                                <Col span={24}>

                                    <Form.Item
                                        label={<p className="text-base font-semibold">Địa chỉ cụ thể</p>}
                                        name="address"
                                        rules={[
                                            {
                                                required: true,

                                                message: 'Vui lòng nhập địa chỉ cụ thể.',

                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',

                                            },
                                        ]}
                                    >
                                        <Input.TextArea
                                            className="text-base border-[#02b875]"
                                            rows={4}
                                            placeholder="Địa chỉ cụ thể"
                                        />
                                    </Form.Item>
                                )}
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="time"
                                    label={<p className="text-base font-semibold">Thời gian</p>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn thời gian!',
                                        },
                                    ]}
                                >
                                    {/* <DatePicker showTime /> */}
                                    <DatePicker
                                        size="large"
                                        className="w-full border-[#02b875]"
                                        placeholder="Vui lòng chọn thời gian"
                                        // format={HOUR_DATE_TIME}
                                        disabledDate={disabledDate}
                                        disabledTime={disabledDateTime}
                                        showToday
                                        value={date}
                                        onChange={(date, dateString) => {
                                            const dateStringConvert = new Date(dateString);
                                            setDate(dateStringConvert);
                                        }}
                                        showTime
                                        // defaultValue={dayjs().endOf('day').format(HOUR_DATE_TIME)}
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
                                    style={{ backgroundColor: '#707070' }}
                                />
                                <span className="text-base pl-4 font-medium">Dịch vụ</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="somehitng"
                                    label={<p className="text-base font-semibold">Dịch vụ</p>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng chọn dịch vụ.',
                                        },
                                    ]}
                                    initialValue="1"
                                >
                                    <Select
                                        size="large"
                                        placeholder="Sửa chữa tại..."
                                        className="h-10 text-base border-[#02b875]"
                                        onSelect={(value) => {
                                            if (value === '1') {
                                                setIsShowroom(true);
                                                return;
                                            }
                                            setIsShowroom(false);
                                        }}
                                    >
                                        <Option value="1">Sửa chữa/Bảo dưỡng tại showroom</Option>
                                        <Option value="0">Sửa chữa/Bảo dưỡng tại nhà</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Col>
                        <Col span={24}>
                            <Col span={24} className="pb-6">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">4</p>}
                                    style={{ backgroundColor: '#707070' }}
                                />
                                <span className="text-base pl-4 font-medium">Ghi chú</span>
                            </Col>
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
                        type="primary"
                        htmlType="submit"
                        className="text-white bg-[#02b875] w-full mb-8 mt-8 h-10 hover:text-white focus:ring-4 focus:outline-none
                         focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                    >
                        Đặt lịch
                    </Button>
                </Form.Item>
            </Form>


                    </Row>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button
                            htmlType="submit"
                            disabled={creatingBooking}
                            loading={creatingBooking}
                            className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-12 hover:!text-white hover:out
                        font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                        >
                            Đặt lịch
                        </Button>
                    </Form.Item>
                </Form>
            )}

        </div>
    );
};

export default BookingPage;
