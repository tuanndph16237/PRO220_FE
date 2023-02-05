import React, { useEffect, useState } from 'react';
import { Avatar, Button, Col, DatePicker, Form, Input, InputNumber, Row, Select, Tooltip } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../../../api/order';
import _ from 'lodash';
import dayjs from 'dayjs';
import SpinCustomize from '../../../components/Customs/Spin';
import { ORDER_STATUS, SEVICE_TYPE, VEHICLE_TYPE } from '../../../constants/order';
import { HOUR_DATE_TIME } from '../../../constants/format';
import StatusOrder from './StatusOrder';
import './order.css';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { disabledDate, disabledDateTime } from '../../../utils/date';
import { R_EMAIL, R_NUMBER, R_NUMBER_PHONE } from '../../../constants/regex';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { getMaterialsWarehouseAsync } from '../../../slices/warehouse';
import { updateOrderAsync } from '../../../slices/order';

const UpdateOrder = (props) => {
    useDocumentTitle('Cập nhật đơn hàng');
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders.values);
    const materials = useSelector((state) => state.warehouse.materials.value);
    const showroomId = useSelector((state) => state.user.currentUser.values.showroomId);
    const updating = useSelector((state) => state.order.updateOrder.loading);
    const errors = useSelector((state) => state.order.updateOrder.errors);

    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [isShowroom, setIsShowroom] = useState(true);
    const [date, setDate] = useState(new Date());
    const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
    const [form] = Form.useForm();
    useEffect(() => {
        if (showroomId && _.isEmpty(materials)) {
            dispatch(getMaterialsWarehouseAsync(showroomId));
        }
    }, [materials, showroomId]);
    useEffect(() => {
        (async () => {
            const order = orders.find((order) => order._id === id);
            if (order) {
                setOrder(order);
                return;
            }
            const { data } = await getOrderById(id);
            setOrder(data);
        })();
    }, [id]);

    useEffect(() => {
        if (!_.isEmpty(errors)) {
            Notification(NOTIFICATION_TYPE.ERROR, 'Đã có lỗi xảy ra vui lòng thử lại!', errors.message || '');
        }
    }, [errors]);

    const totalPriceMaterials = () => {
        return _.reduce(
            order.materials,
            (rs, material) => {
                const price = material.qty * material.price;
                return rs + price;
            },
            0,
        );
    };

    useEffect(() => {
        const { appointmentSchedule, ...orderOther } = order;
        const price = totalPriceMaterials();
        form.setFieldsValue({
            ...orderOther,
            appointmentSchedule: dayjs(appointmentSchedule),
            price,
        });
    }, [form, order]);

    useEffect(() => {
        if (!_.isEmpty(order)) {
            const { appointmentSchedule, ...orderOther } = order;
            setInitialValues({
                ...orderOther,
                appointmentSchedule: dayjs(appointmentSchedule),
                price: totalPriceMaterials(),
            });
            setIsShowroom(order.serviceType);
        }
    }, [order]);

    const handleChangeSubPrice = (value) => {
        const { appointmentSchedule, ...orderOther } = order;
        const price = totalPriceMaterials();
        const total = price + value;
        form.setFieldsValue({
            ...orderOther,
            appointmentSchedule: dayjs(appointmentSchedule),
            price,
            total,
        });
    };

    const onFinish = (data) => {
        const _id = order._id;
        dispatch(updateOrderAsync({ _id, data }));
    };

    const handleChangeStatus = async (status, { reasons = [], materials = [], materialIds = [] }) => {
        setLoadingUpdateStatus(true);
        const price = _.reduce(
            materials,
            (rs, material) => {
                const price = material.qty * material.price;
                return rs + price;
            },
            0,
        );
        const total = price + _.get(order, 'subPrice', 0);
        updateOrderStatus(order._id, { status, reasons, materials, materialIds, total })
            .then(({ data }) => {
                if (order.status === data.status) {
                    Notification(NOTIFICATION_TYPE.SUCCESS, 'Chỉnh sửa vật tư thành công');
                } else {
                    Notification(
                        NOTIFICATION_TYPE.SUCCESS,
                        'Chuyển trạng thái thành công',
                        `Trạng thái của đơn hàng là: ${ORDER_STATUS[data.status]}`,
                    );
                }
                setOrder(data);
            })
            .catch((error) => {
                console.log('update-status-error', error);
                Notification(NOTIFICATION_TYPE.ERROR, 'Đã có lỗi xảy ra vui lòng thử lại!', error.message || '');
            })
            .finally(() => {
                setLoadingUpdateStatus(false);
            });
    };

    return (
        <div>
            {_.isEmpty(initialValues) ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <Form
                    layout={'vertical'}
                    initialValues={initialValues}
                    name="nest-messages"
                    onFinish={onFinish}
                    form={form}
                    disabled={order.status === 5}
                >
                    <Row gutter={16}>
                        <Col span={12}>
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
                        <Col span={12}>
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
                    </Row>
                    <Form.Item
                        name="status"
                        label={
                            <p className="text-base font-semibold">
                                Trạng thái :{' '}
                                <span className="text-lg text-[#02b875] font-semibold">
                                    {ORDER_STATUS[order.status]}
                                </span>
                            </p>
                        }
                    >
                        <StatusOrder
                            order={order}
                            status={order.status}
                            onSubmit={handleChangeStatus}
                            loading={loadingUpdateStatus}
                        />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Col span={24} className="pb-6">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">3</p>}
                                    style={{ backgroundColor: '#02b875' }}
                                />
                                <span className="text-base pl-4 font-medium">Địa điểm và Thời gian</span>
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
                                >
                                    <Select
                                        size="large"
                                        placeholder="Sửa chữa tại..."
                                        className="h-10 text-base border-[#02b875]"
                                        onSelect={(value) => {
                                            setIsShowroom(!!value);
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

                        <Col span={12}>
                            <Col span={24} className="pb-6">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">4</p>}
                                    style={{ backgroundColor: '#02b875' }}
                                />
                                <span className="text-base pl-4 font-medium">Dịch vụ</span>
                            </Col>
                            <Form.Item
                                name="materialIds"
                                label={<p className="text-base font-semibold">Vật tư sử dụng</p>}
                            >
                                <Select
                                    disabled
                                    size="large"
                                    placeholder="Chọn vật tư sử dụng..."
                                    className="w-full text-base border-[#02b875]"
                                    mode="multiple"
                                    value={order.materialIds}
                                    optionLabelProp="label"
                                    // filterOption={false}
                                >
                                    {_.map(materials, ({ materialId: material }) => {
                                        return (
                                            <Select.Option
                                                key={material._id}
                                                value={material._id}
                                                label={
                                                    <div>
                                                        <Tooltip title={material.name}>
                                                            {material.name.length > 40
                                                                ? material.name.slice(0, 40) + '...'
                                                                : material.name}{' '}
                                                        </Tooltip>
                                                        <InputNumber
                                                            size="small"
                                                            value={_.get(
                                                                _.find(
                                                                    order.materials,
                                                                    (item) => item.marterialId === material._id,
                                                                ),
                                                                'qty',
                                                                1,
                                                            )}
                                                            min={1}
                                                            disabled
                                                            defaultValue={1}
                                                        />
                                                    </div>
                                                }
                                            >
                                                {material.name} - {material.price}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                            <Form.Item label={<p className="text-base font-semibold">Giá vật tư</p>} name="price">
                                <Input className="h-10 text-base border-[#02b875]" type="number" disabled />
                            </Form.Item>
                            <Form.Item
                                label={<p className="text-base font-semibold">Phụ phí</p>}
                                name="subPrice"
                                rules={[
                                    {
                                        pattern: R_NUMBER,
                                        message: 'Phụ phí không đúng định dạng.',
                                    },
                                ]}
                            >
                                <InputNumber
                                    className="h-10 w-full text-base border-[#02b875]"
                                    onChange={handleChangeSubPrice}
                                />
                            </Form.Item>
                            <Form.Item label={<p className="text-base font-semibold">Tổng đơn hàng</p>} name="total">
                                <Input className="h-10 text-base border-[#02b875]" type="number" disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        <Button
                            loading={updating || loadingUpdateStatus}
                            type="primary"
                            htmlType="submit"
                            className="btn-primary text-white bg-[#02b875] w-full mb-8 mt-8 h-12 hover:out
                        font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                        >
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default UpdateOrder;
