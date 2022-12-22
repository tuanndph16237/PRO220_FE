import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Avatar, Button, Col, DatePicker, Form, Input, Row, Select } from 'antd';
import dayjs from 'dayjs';
import { HOUR_DATE_TIME } from '../../constants/format';
import { search } from '../../api/showroom';
import './booking.css';
import SpinCustomize from '../../components/Customs/Spin';
import { createBannerByCustomer } from '../../api/order';
import { Notification } from '../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../constants/status';
import { getAllShowroomAsync } from '../../slices/showroom';
import { SEVICE_TYPE } from '../../constants/orther';

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

const disabledDate = (current) => {
    return current && current < dayjs().endOf('day').subtract(1, 'days');
};

const disabledDateTime = () => ({
    disabledHours: () => [...range(0, 7), ...range(12, 13), ...range(18, 24)],
    disabledMinutes: () => range(0),
    disabledSeconds: () => range(0, 60),
});

const BookingPage = () => {
    useDocumentTitle('Đặt lịch');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser.values);
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const isLogged = useSelector((state) => state.user.isLogged);

    const [loadingInital, setLoadingInital] = useState(true);
    const [creatingBooking, setCreatingBooking] = useState(false);

    const [isShowroom, setIsShowroom] = useState(true);
    const [date, setDate] = useState(new Date());
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
            .then(({ data }) => {
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
    const handleSearch = (value) => {
        if (!value) {
            setShowroomsFilter(showrooms);
            return;
        }
        if (searchTemp.current) {
            clearTimeout(searchTemp.current);
            searchTemp.current = null;
        }
        searchTemp.current = setTimeout(async () => {
            const { data } = await search(value);
            setShowroomsFilter(data);
        }, 300);
    };
    const handleChange = (newValue) => {
        setFilter(newValue);
    };

    return (
        <div className="w-full content-booking py-16">
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
                                            style={{ backgroundColor: '#707070' }}
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
                                                    min: 10,
                                                    message: 'Số điện thoại không đúng định dạng.',
                                                },
                                                {
                                                    max: 10,
                                                    message: 'Số điện thoại không đúng định dạng.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="Tối thiểu 10 chữ số."
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Email</p>}
                                            name="email"
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
                                            name="serviceType"
                                            label={<p className="text-base font-semibold">Dịch vụ</p>}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng chọn dịch vụ.',
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
                                        <Form.Item
                                            name="showroomId"
                                            label={<p className="text-base font-semibold">Showroom</p>}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng showroom sửa chữa/bảo dưỡng.',
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                value={filter}
                                                placeholder="Tìm kiếm showroom theo tên, địa chỉ."
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
                                                        message: 'Vui lòng nhập địa chỉ cụ thể.',
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
                                                    message: 'Vui lòng chọn thời gian!',
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
                                type="primary"
                                htmlType="submit"
                                disabled={creatingBooking}
                                loading={creatingBooking}
                                className="text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-10 hover:text-white focus:ring-4 focus:outline-none
                         focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
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
                                        style={{ backgroundColor: '#707070' }}
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
                                                min: 10,
                                                message: 'Số điện thoại không đúng định dạng.',
                                            },
                                            {
                                                max: 10,
                                                message: 'Số điện thoại không đúng định dạng.',
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="h-10 text-base border-[#02b875]"
                                            placeholder="Tối thiểu 10 chữ số."
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label={<p className="text-base font-semibold">Email</p>} name="email">
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
                                        name="serviceType"
                                        label={<p className="text-base font-semibold">Dịch vụ</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng chọn dịch vụ.',
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
                                    <Form.Item
                                        name="showroomId"
                                        label={<p className="text-base font-semibold">Showroom</p>}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng showroom sửa chữa/bảo dưỡng.',
                                            },
                                        ]}
                                    >
                                        <Select
                                            size="large"
                                            value={filter}
                                            placeholder="Tìm kiếm showroom theo tên, địa chỉ."
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
                                                    message: 'Vui lòng nhập địa chỉ cụ thể.',
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
                                                message: 'Vui lòng chọn thời gian!',
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
                            type="primary"
                            htmlType="submit"
                            disabled={creatingBooking}
                            loading={creatingBooking}
                            className="text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-10 hover:text-white focus:ring-4 focus:outline-none
                         focus:ring-blue-300 font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
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