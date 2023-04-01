import React, { useEffect, useState, useRef } from 'react';
import {
    Table,
    Avatar,
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Tooltip,
    Radio,
    Space,
    Modal,
    Alert,
} from 'antd';
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
import { useGetParam } from '../../../utils/param';
import { paymentVNPay, sendMail, updateStatusBill } from '../../../api/payment';
import { WalletOutlined } from '@ant-design/icons';
import { SolutionOutlined } from '@ant-design/icons/lib/icons';
import { useReactToPrint } from 'react-to-print';
import SubServices from './SubServices';

const UpdateOrder = (props) => {
    useDocumentTitle('Cập nhật đơn hàng');
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders.values);
    const materials = useSelector((state) => state.warehouse.materials.value);
    const showroomId = useSelector((state) => state.user.currentUser.values.showroomId);
    const updating = useSelector((state) => state.order.updateOrder.loading);
    const errors = useSelector((state) => state.order.updateOrder.errors);
    const [values, setValues] = useState(0);
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [isShowroom, setIsShowroom] = useState(true);
    const [date, setDate] = useState(new Date());
    const [loadingUpdateStatus, setLoadingUpdateStatus] = useState(false);
    const [form] = Form.useForm();
    const [responseCode] = useGetParam('vnp_ResponseCode');
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [statusPayment, setStatusPayment] = useState(false);
    const componentRef = useRef(null);
    const [subService, setSubService] = useState([]);

    const payment = async () => {
        if (values == 1) {
            setOpenModal(true);
        }
    };

    const handleOk = async () => {
        setLoading(true);
        const data = await updateStatusOrder();
        if (data) {
            setLoading(false);
            setOpenModal(false);
        }
    };
    const handleCancel = () => {
        setOpenModal(false);
    };
    const onChange = (e) => {
        setValues(e.target.value);
    };
    useEffect(() => {
        if (statusPayment) {
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Thanh toán thành công');
        }
    }, [statusPayment]);
    useEffect(() => {
        (async () => {
            if (responseCode) {
                const data = await updateStatusOrder();
            }
        })();
    }, [responseCode]);

    const updateStatusOrder = async () => {
        const value = {
            id: id,
            status: 5,
        };
        const { data } = await updateStatusBill(value);
        if (data) {
            setStatusPayment(true);
            setOrder(data);
            if (data.email) {
                const valueEmail = _.omit(data, [
                    'accountId',
                    'appointmentSchedule',
                    'createdAt',
                    'deleted',
                    'description',
                    'materialIds',
                    'reasons',
                    'showroomId',
                ]);
                const reponsive = sendMail(valueEmail);
            }
        }
        return data;
    };
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
                Notification(NOTIFICATION_TYPE.ERROR, 'Đã có lỗi xảy ra vui lòng thử lại!', error.message || '');
            })
            .finally(() => {
                setLoadingUpdateStatus(false);
            });
    };

    const handlePrint = useReactToPrint({
        documentTitle: 'Hóa đơn',
        content: () => componentRef.current,
        onAfterPrint: payment,
        removeAfterPrint: true,
    });

    const columns = [
        {
            title: 'Tên vật tư & Công việc',
            dataIndex: 'name',
            width: '50%',
        },
        {
            title: 'Số lượng',
            className: 'column-money',
            dataIndex: 'qty',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
        },
        {
            title: 'Tiền P.Tùng',
            dataIndex: 'partPrice',
        },
        {
            title: 'Tiền Công',
            dataIndex: 'priceWorking',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'Bugi',
            qty: '1',
            price: '10.000',
        },
        {
            key: '2',
            name: 'Lốp trước',
            qty: '1',
            price: '300.000',
        },
        {
            key: '3',
            name: 'Má phanh',
            qty: '1',
            price: '70.000',
        },
    ];

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
                                    <Input className="h-10 text-base border-[#02b875]" disabled />
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
                                    <Input className="h-10 text-base border-[#02b875]" disabled />
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
                                        disabled
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
                                <span className="text-base pl-4 font-medium">Địa điểm và Thời gian</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="serviceType"
                                    label={<p className="text-base font-semibold">Loại dịch vụ</p>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                        },
                                    ]}
                                >
                                    <Select disabled size="large" className="h-10 text-base ">
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
                                            // rules={[
                                            //     {
                                            //         required: true,
                                            //         message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                            //     },
                                            // ]}
                                        >
                                            <Input.TextArea
                                                disabled
                                                className="text-base border-[#02b875]"
                                                rows={1}
                                                placeholder={'ưeqesfstsdtgweg'}
                                            />
                                        </Form.Item>
                                        <p className="text-base font-semibold my-2">Vấn đề cụ thể</p>
                                        <Select
                                            disabled
                                            mode="multiple"
                                            className="mb-3"
                                            defaultValue={['thay_xam']}
                                            size="large"
                                            style={{ width: '100%' }}
                                            placeholder="chọn vấn đề bạn gặp phải"
                                            options={[
                                                { value: 'thay_xam', label: 'Thay xăm' },
                                                { value: 'thay_binh', label: 'Thay bình điện' },
                                                { value: 'thay_lốp', label: 'Thay lốp' },
                                            ]}
                                            optionLabelProp="label"
                                        />
                                    </>
                                )}
                                {!isShowroom ? null : (
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
                                            disabled
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
                                )}
                            </Col>

                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label={<p className="text-base font-semibold">Ghi chú</p>}
                                >
                                    <Input.TextArea
                                        disabled
                                        className="text-base border-[#02b875]"
                                        rows={2}
                                        placeholder="Cụ thể yêu cầu với Dodoris"
                                    />
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
                            <Col span={24} className="pb-1">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">3</p>}
                                    style={{ backgroundColor: '#02b875' }}
                                />
                                <span className="text-base pl-4 font-medium">Vật tư sửa chữa</span>
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
                                    {_.map(order.materials, ({ materialId, qty, price }) => {
                                        const material = _.find(
                                            materials,
                                            (material) => material.materialId._id === materialId,
                                        );
                                        return (
                                            <Select.Option
                                                key={materialId}
                                                value={materialId}
                                                label={
                                                    <div>
                                                        <Tooltip title={_.get(material, 'materialId.name', '') || ''}>
                                                            {_.get(material, 'materialId.name', '').length > 40
                                                                ? _.get(material, 'materialId.name', '').slice(0, 40) +
                                                                  '...'
                                                                : _.get(material, 'materialId.name', '')}
                                                        </Tooltip>
                                                        - <span>SL: {qty}</span>
                                                    </div>
                                                }
                                            >
                                                {_.get(material, 'materialId.name', '') || ''} -{price}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>

                            {isShowroom ? null : (
                                <Form.Item label={<p className="text-base font-semibold">Phụ phí</p>} name="subPrice">
                                    <InputNumber
                                        className="h-10 w-full text-base border-[#02b875]"
                                        formatter={(value) => `VNĐ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        parser={(value) => {
                                            return value.replace(/\VNĐ\s?|(,*)/g, '');
                                        }}
                                        onChange={handleChangeSubPrice}
                                    />
                                </Form.Item>
                            )}

                            <Col span={24}>
                                <Col span={24} className="pb-6">
                                    <Avatar
                                        size={34}
                                        icon={<p className="text-base font-semibold leading-8">4</p>}
                                        style={{ backgroundColor: '#02b875' }}
                                    />
                                    <span className="text-base pl-4 font-medium">Dịch vụ khác</span>
                                </Col>
                                <SubServices value={subService} setValue={setSubService} />
                            </Col>
                        </Col>
                        <Col span={12}>
                            <Col span={24} className="pb-6">
                                <Avatar
                                    size={34}
                                    icon={<p className="text-base font-semibold leading-8">5</p>}
                                    style={{ backgroundColor: '#02b875' }}
                                />
                                <span className="text-base pl-4 font-medium">Hóa đơn</span>
                            </Col>
                            <div ref={componentRef} className="p-5">
                                <p className="text-center font-bold text-[16px]">Hệ thống sữa chữa xe máy Dodoris</p>
                                <p className="text-center py-2">
                                    Địa chỉ: 191 Phạm Văn Đông, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội
                                </p>
                                <p>
                                    khách hàng: <span className="font-bold">Huy Cắt Moi</span>
                                </p>
                                <p>Số DT: 08754654646</p>
                                <p>Dịch vụ: sữa chữa tại cửa hàng</p>
                                <p className="mb-3">
                                    Thời gian: <span>9h80 / 30-04-2023</span>
                                </p>
                                <Table
                                    columns={columns}
                                    dataSource={data}
                                    bordered
                                    title={() => <p className="font-bold">Vật tư</p>}
                                    pagination={false}
                                />
                                <div className="my-3 w-full">
                                    <div className="flex gap-10">
                                        <p>Tạm tính</p>
                                        <p>
                                            <span className="font-bold"> 380.000</span> vnd
                                        </p>
                                    </div>
                                    <div className="flex gap-10">
                                        <p>Giảm giá</p>
                                        <p>
                                            <span className="font-bold"> 0</span> vnd
                                        </p>
                                    </div>
                                    <div className="flex gap-10">
                                        <p>Phí dịch vụ</p>
                                        <p>
                                            <span className="font-bold"> 0</span> vnd
                                        </p>
                                    </div>
                                    <div className="flex gap-10">
                                        <p>Tổng Thanh Toán</p>
                                        <p>
                                            <span className="font-bold text-red-600"> 380.000</span> vnd
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {order.status == 4 && (
                                <Form.Item label={<p className="text-base font-semibold">Phương Thức Thanh Toán :</p>}>
                                    <Radio.Group onChange={onChange} value={values}>
                                        <Space direction="vertical">
                                            <Radio value={1}>
                                                Thanh toán tiền mặt <SolutionOutlined />
                                            </Radio>
                                        </Space>
                                    </Radio.Group>
                                </Form.Item>
                            )}
                        </Col>
                    </Row>

                    <Modal
                        open={openModal}
                        title="Thanh Toán"
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Cancel
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                                Xác Nhận
                            </Button>,
                        ]}
                    >
                        <Alert message="Notes :" description="Xác nhận thanh toán tiền mặt." type="info" showIcon />
                    </Modal>
                    <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
                        {order.status == 4 ? (
                            <Button
                                type="primary"
                                className={`${
                                    values == 0 ? '' : 'btn-primary'
                                } text-white bg-[#02b875] w-full mb-8 mt-8 h-12 hover:out font-medium rounded-lg text-sm text-center mr-3 md:mr-0`}
                                disabled={values == 0 ? true : false}
                                onClick={() => handlePrint()}
                            >
                                Thanh Toán
                            </Button>
                        ) : (
                            <Button
                                loading={updating || loadingUpdateStatus}
                                type="primary"
                                htmlType="submit"
                                className="btn-primary text-white bg-[#02b875] w-full mb-8 mt-8 h-12 hover:out
                        font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                            >
                                Cập nhật
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default UpdateOrder;
