import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { Avatar, Button, Col, DatePicker, Form, Input, Row, Select, TimePicker } from 'antd';
import { HOUR_DATE_TIME, DATE_FORMAT } from '../../constants/format';
import { compareUserShowroom, search } from '../../api/showroom';
import './booking.css';
import SpinCustomize from '../../components/Customs/Spin';
import { createBannerByCustomer } from '../../api/order';
import { Notification } from '../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../constants/status';
import { getAllShowroomAsync } from '../../slices/showroom';
import { SEVICE_TYPE, VEHICLE_TYPE } from '../../constants/order';
import { R_NUMBER, R_NUMBER_PHONE } from '../../constants/regex';
import { disabledDate, disabledDateTime, setHourISODate } from '../../utils/date';
import ModalCustomize from '../../components/Customs/ModalCustomize';
import ShowroomModal from './showroomModal';
import { useNavigate } from 'react-router-dom';
import HourPicker from '../../components/HourPicker';
import dayjs from 'dayjs';

const BookingPage = () => {
    useDocumentTitle('Đặt lịch');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currentUser.values);
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const isLogged = useSelector((state) => state.user.isLogged);
    const [loadingInital, setLoadingInital] = useState(true);
    const [creatingBooking, setCreatingBooking] = useState(false);
    const [isShowroom, setIsShowroom] = useState(true);
    const [date, setDate] = useState(new Date());
    const [hour, setHour] = useState('8:00');
    const [showroomsFilter, setShowroomsFilter] = useState([]);
    const [filter, setFilter] = useState('');
    const [initialValues, setInitialValues] = useState({});
    const searchTemp = useRef(null);
    const [open, setOpenModal] = useState(false);
    const [address, setAddress] = useState('');
    const coordinate = useRef({
        latitude: '',
        longitude: '',
    });

    useEffect(() => {
        var geocoder = new maptiler.Geocoder({
            input: 'searchBooking',
            key: 'CKlzQ1LLayVnG9v67Xs3',
        });
        geocoder.on('select', async (item) => {
            if (_.isEmpty(filter)) {
                Notification(NOTIFICATION_TYPE.ERROR, 'Bạn chưa chọn showroom!', 'Hãy chọn showroom gần bạn nhất!');
            } else {
                let coordinates = item.center;
                coordinate.current.latitude = coordinates[1];
                coordinate.current.longitude = coordinates[0];
                if (_.has(item, 'place_name_vi')) {
                    setAddress(item.place_name_vi);
                } else {
                    setAddress(item.place_name_en);
                }
                const checkUserDistance = await compareUserShowroom({
                    showroomId: filter._id,
                    latitude: coordinates[1],
                    longitude: coordinates[0],
                });
                if (!checkUserDistance.data) {
                    setAddress('');
                    Notification(
                        NOTIFICATION_TYPE.ERROR,
                        'Địa chỉ không nằm trong phạm vi hỗ trợ!',
                        'Hãy chọn showroom gần bạn nhất!',
                    );
                }
            }
        });
    }, [isShowroom == false]);

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
        const myDate = setHourISODate(date, hour);
        setCreatingBooking(true);
        createBannerByCustomer({
            ...values,
            appointmentSchedule: myDate,
            address,
            accountId: user._id,
            showroomId: filter._id || null,
        })
            .then(({ data }) => {
                if (data.message) {
                    Notification(NOTIFICATION_TYPE.WARNING, data.message);
                    return;
                }
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Bạn đã đặt lịch thành công!');
                if (isLogged) {
                    navigate(`/cai-dat/quan-ly-don-hang/${data._id}`);
                    return null;
                }
                navigate('/');
            })
            .catch((error) => {
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
        setOpenModal(false);
        setIsShowroom(true);
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
                            <Col
                                xs={{
                                    span: 24,
                                }}
                                lg={{
                                    span: 12,
                                }}
                            >
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
                                            <Input
                                                className="h-10 text-base border-[#02b875]"
                                                disabled={_.get(user, 'number_phone', false)}
                                            />
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
                            <Col
                                xs={{
                                    span: 24,
                                }}
                                lg={{
                                    span: 12,
                                }}
                            >
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
                                            // rules={[
                                            //     {
                                            //         required: true,
                                            //         message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            //     },
                                            // ]}
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
                                                    required: filter == '' ? true : false,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <>
                                                <div
                                                    className="!cursor-pointer flex items-center border rounded-md border-[#02b875]"
                                                    onClick={() => setOpenModal(true)}
                                                >
                                                    <Input
                                                        type="text"
                                                        value={filter == '' ? '' : filter.name + ' - ' + filter.address}
                                                        disabled={true}
                                                        placeholder="Chọn cửa hàng sửa chữa"
                                                        className="!cursor-pointer !bg-white py-2 relative !text-black text-base"
                                                    />
                                                    {filter == '' && (
                                                        <div className="right-3 absolute">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                width="16"
                                                                height="16"
                                                                fill="currentColor"
                                                                className="bi bi-caret-right-fill"
                                                                viewBox="0 0 16 16"
                                                            >
                                                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <ModalCustomize
                                                    showModal={open}
                                                    footer={null}
                                                    setShowModal={() => setOpenModal(false)}
                                                >
                                                    <ShowroomModal setSelectShowroom={handleChange} />
                                                </ModalCustomize>
                                            </>
                                        </Form.Item>
                                        {isShowroom ? null : (
                                            <Form.Item
                                                label={<p className="text-base font-semibold">Địa chỉ cụ thể</p>}
                                                name="address"
                                                rules={[
                                                    {
                                                        required: address == '' ? true : false,
                                                        message:
                                                            'Quý khách vui lòng không để trống trường thông tin này.',
                                                    },
                                                ]}
                                            >
                                                <>
                                                    <p className="text-black mx-2">
                                                        Lưu ý: hỗ trợ trong bán kính 5km với cửa hàng bạn chọn!
                                                    </p>
                                                    <Input
                                                        className="text-base border-[#02b875] w-full py-2"
                                                        placeholder="Nhập địa chỉ"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        id="searchBooking"
                                                    />
                                                </>
                                            </Form.Item>
                                        )}
                                    </Col>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label={
                                                    <p className="text-base font-semibold">
                                                        <span className="text-[#ff4d4f] text-base">* </span>Ngày
                                                    </p>
                                                }
                                            >
                                                <DatePicker
                                                    size="large"
                                                    defaultValue={dayjs()}
                                                    format={DATE_FORMAT}
                                                    mode="date"
                                                    className="w-full border-[#02b875]"
                                                    placeholder="Ngày"
                                                    showToday
                                                    onChange={(date, dateString) => setDate(dateString)}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label={
                                                    <p className="text-base font-semibold">
                                                        <span className="text-[#ff4d4f] text-base">* </span>Giờ
                                                    </p>
                                                }
                                            >
                                                <HourPicker onChange={(value) => setHour(value)} format={'HH'} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Col>
                            </Col>
                        </Row>
                        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                            <Button
                                htmlType="submit"
                                type="primary"
                                disabled={creatingBooking}
                                loading={creatingBooking}
                                className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] mb-8 mt-8 h-12 hover:!text-white hover:out
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
                        <Col
                            xs={{
                                span: 24,
                            }}
                            lg={{
                                span: 12,
                            }}
                        >
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
                                        <Input
                                            className="h-10 text-base border-[#02b875]"
                                            disabled={_.get(user, 'number_phone', false)}
                                        />
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
                        <Col
                            xs={{
                                span: 24,
                            }}
                            lg={{
                                span: 12,
                            }}
                        >
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
                                        // rules={[
                                        //     {
                                        //         required: true,
                                        //         message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                        //     },
                                        // ]}
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
                                                required: filter == '' ? true : false,
                                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            },
                                        ]}
                                    >
                                        <>
                                            <div
                                                className="!cursor-pointer flex items-center border rounded-md border-[#02b875]"
                                                onClick={() => setOpenModal(true)}
                                            >
                                                <Input
                                                    type="text"
                                                    value={filter == '' ? '' : filter.name + ' - ' + filter.address}
                                                    disabled={true}
                                                    placeholder="Chọn cửa hàng sửa chữa"
                                                    className="!cursor-pointer !bg-white py-2 relative !text-black text-base"
                                                />
                                                {filter == '' && (
                                                    <div className="right-3 absolute">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="16"
                                                            height="16"
                                                            fill="currentColor"
                                                            className="bi bi-caret-right-fill"
                                                            viewBox="0 0 16 16"
                                                        >
                                                            <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <ModalCustomize
                                                showModal={open}
                                                footer={null}
                                                setShowModal={() => setOpenModal(false)}
                                            >
                                                <ShowroomModal setSelectShowroom={handleChange} />
                                            </ModalCustomize>
                                        </>
                                    </Form.Item>
                                    {isShowroom ? null : (
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Địa chỉ cụ thể</p>}
                                            name="address"
                                            rules={[
                                                {
                                                    required: address == '' ? true : false,
                                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <>
                                                <p className="text-black mx-2">
                                                    Lưu ý: hỗ trợ trong bán kính 5km với cửa hàng bạn chọn!
                                                </p>
                                                <Input
                                                    className="text-base border-[#02b875] w-full py-2"
                                                    placeholder="Nhập địa chỉ"
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                    id="searchBooking"
                                                />
                                            </>
                                        </Form.Item>
                                    )}
                                </Col>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                <p className="text-base font-semibold">
                                                    <span className="text-[#ff4d4f] text-base">* </span>Ngày
                                                </p>
                                            }
                                        >
                                            <DatePicker
                                                size="large"
                                                defaultValue={dayjs()}
                                                format={DATE_FORMAT}
                                                mode="date"
                                                className="w-full border-[#02b875]"
                                                placeholder="Ngày"
                                                showToday
                                                onChange={(date, dateString) => setDate(dateString)}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label={
                                                <p className="text-base font-semibold">
                                                    <span className="text-[#ff4d4f] text-base">* </span>Giờ
                                                </p>
                                            }
                                        >
                                            <HourPicker onChange={(value) => setHour(value)} format={'HH'} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button
                            htmlType="submit"
                            type="primary"
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
