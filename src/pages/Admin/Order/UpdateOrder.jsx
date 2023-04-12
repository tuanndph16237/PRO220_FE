import React, { useEffect, useState, useRef } from 'react';
import { Table, Avatar, Button, Col, DatePicker, Form, Input, Row, Radio, Space, Modal, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById, updateOrderStatus } from '../../../api/order';
import _ from 'lodash';
import dayjs from 'dayjs';
import SpinCustomize from '../../../components/Customs/Spin';
import { ORDER_STATUS, SEVICE_TYPE, VEHICLE_TYPE } from '../../../constants/order';
import { HOUR_DATE_TIME } from '../../../constants/format';
import './order.css';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { disabledDate, disabledDateTime } from '../../../utils/date';
import { R_EMAIL, R_NUMBER, R_NUMBER_PHONE } from '../../../constants/regex';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { getMaterialsWarehouseAsync } from '../../../slices/warehouse';
import { useGetParam } from '../../../utils/param';
import { sendMail, updateStatusBill } from '../../../api/payment';
import { RightOutlined, SolutionOutlined } from '@ant-design/icons/lib/icons';
import { useReactToPrint } from 'react-to-print';
import SubServices from './SubServices';
import StatusOrderDisplay from './StatusOrderDisplay';
import SelectMaterials from './SelectMaterials';
import { updateOrder } from '../../../api/order';
import { getApiSubService } from '../../../api/service';

const UpdateOrder = (props) => {
    useDocumentTitle('Cập nhật đơn hàng');
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.order.orders.values);
    const materials = useSelector((state) => state.warehouse.materials.value);
    const showroomId = useSelector((state) => state.user.currentUser.values.showroomId);
    const errors = useSelector((state) => state.order.updateOrder.errors);
    const [values, setValues] = useState(0);
    const { id } = useParams();
    const [order, setOrder] = useState({});
    const [initialValues, setInitialValues] = useState({});
    const [isShowroom, setIsShowroom] = useState(true);
    const [date, setDate] = useState(new Date());
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [statusPayment, setStatusPayment] = useState(false);
    const componentRef = useRef(null);
    const [subService, setSubService] = useState([]);
    const [dataSub, setDataSub] = useState([]);
    const [dataMaterial, setDataMaterial] = useState([]);
    const [isCancel, setIsCancel] = useState(false);
    const [statusCurrent, setStatusCurrent] = useState(null);
    const [isChangeMaterials, setIsChangeMaterials] = useState(false);
    const [showModal, setShowModal] = useState(null);
    const [total, setTotal] = useState(0);
    const [dateStart, setDateStart] = useState(new Date());
    const [dateFinish, setDateFinish] = useState(new Date());
    const [dataSubService, setDataSubService] = useState([]);

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

    const fetchSubService = async () => {
        const dataSub = await getApiSubService();
        setDataSubService(dataSub.data);
    };

    useEffect(() => {
        fetchSubService();
    }, []);

    useEffect(() => {
        if (statusPayment) {
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Thanh toán thành công');
        }
    }, [statusPayment]);

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
                const price = material?.qty * material?.price;
                return rs + price;
            },
            0,
        );
    };

    const totalSubServices = () => {
        return _.reduce(
            order.subServices,
            (resault, initialNumber) => {
                return resault + initialNumber?.priceWorking;
            },
            0,
        );
    };

    useEffect(() => {
        if (!_.isEmpty(order)) {
            const { appointmentSchedule, tg_nhan_xe, ...orderOther } = order;
            setInitialValues({
                ...orderOther,
                appointmentSchedule: dayjs(appointmentSchedule),
                tg_nhan_xe: dayjs(tg_nhan_xe),
                price: totalPriceMaterials(),
            });
            setIsShowroom(order.serviceType);
            setStatusCurrent(order.status);
            if (order.status == 0) setIsCancel(true);
        }

        if (_.isEmpty(order) === false) {
            handleDataMaterial(order.materials);
            const dataHandleSub = order?.subServices?.map((item) => parseInt(item._id));
            setSubService(dataHandleSub);
            setDataSub(order?.subServices);
            const price = totalPriceMaterials();
            const subPrice = totalSubServices();
            const madeCaculate = price + subPrice;
            setTotal(madeCaculate);
        }
    }, [order]);

    const handleDataSubService = async (data) => {
        setSubService(data);
        const filterData = data.map((itemId) => {
            const filterSubService = dataSubService.find((itemSubService) => itemSubService._id == itemId);
            return {
                _id: filterSubService._id,
                name: filterSubService.name,
                priceWorking: filterSubService.fee,
            };
        });
        const orderChangeSub = await updateOrderStatus(order._id, { subServices: filterData });
        setDataSub(filterData);
        setOrder(orderChangeSub.data);
    };

    const handleDataMaterial = (data) => {
        const filterData = data.map((material) => {
            return {
                _id: material._id,
                price: material.price,
                qty: material.qty,
                name: material.name,
                priceInitial: material.priceInitial,
                unit: material.unit,
                partPrice: material.qty * material.price,
            };
        });
        setDataMaterial(filterData);
    };

    const updateMaterials = async (idOrder, dataMaterial) => {
        updateOrderStatus(idOrder, { ...dataMaterial })
            .then(({ data }) => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhật vật tư thành công');
                setOrder(data);
            })
            .catch((error) => {
                Notification(NOTIFICATION_TYPE.ERROR, 'Đã có lỗi xảy ra vui lòng thử lại!', error.message || '');
            });
    };

    const handleChangeStatus = async (status, order) => {
        updateOrderStatus(order._id, {
            materials: order.materials,
            materialIds: orders.materialIds,
            reasons: orders.reasons,
            total: total,
            tg_tra_xe: status >= 4 ? dateFinish : null,
            status,
        })
            .then(({ data }) => {
                Notification(
                    NOTIFICATION_TYPE.SUCCESS,
                    'Chuyển trạng thái thành công',
                    `Trạng thái của đơn hàng là: ${ORDER_STATUS[data.status]}`,
                );
                setOrder(data);
            })
            .catch((error) => {
                Notification(NOTIFICATION_TYPE.ERROR, 'Đã có lỗi xảy ra vui lòng thử lại!', error.message || '');
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
            key: 'name',
        },
        {
            title: 'Đơn vị',
            dataIndex: 'unit',
            key: 'unit',
        },
        {
            title: 'Số lượng',
            className: 'column-money',
            dataIndex: 'qty',
            key: 'qty',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (value) => {
                return value == undefined ? undefined : value?.toLocaleString('en') + ' VNĐ';
            },
        },
        {
            title: 'Tiền P.Tùng',
            dataIndex: 'partPrice',
            key: 'partPrice',
            render: (value) => {
                return value == undefined ? undefined : value?.toLocaleString('en') + ' VNĐ';
            },
        },
        {
            title: 'Tiền Công',
            dataIndex: 'priceWorking',
            key: 'priceWorking',
            render: (value) => {
                return value == undefined ? undefined : value?.toLocaleString('en') + ' VNĐ';
            },
        },
    ];

    const onFinish = async (data) => {
        const _id = order._id;
        const dataOrder = await updateOrder(_id, { ...data, status: order.status });
        if (dataOrder) {
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhật thông tin thành công');
            setOrder(dataOrder.data);
        }
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
                                <Form.Item label={<p className="text-base font-semibold">Email</p>} name="email">
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
                                    icon={<p className="text-base font-semibold leading-8"></p>}
                                    style={{ backgroundColor: '#02b875' }}
                                />
                                <span className="text-base pl-4 font-medium">Loại dịch vụ & Thời gian</span>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    name="serviceType"
                                    label={<p className="text-base font-semibold">Loại dịch vụ</p>}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng không để trống trường thông tin này.',
                                        },
                                    ]}
                                >
                                    <Input
                                        type="text"
                                        className="h-10 text-base border-[#02b875]"
                                        value={order.serviceType}
                                        disabled
                                    />
                                </Form.Item>

                                {!isShowroom ? null : (
                                    <Form.Item
                                        name="appointmentSchedule"
                                        label={<p className="text-base font-semibold">Thời gian đặt lịch</p>}
                                    >
                                        <DatePicker
                                            disabled
                                            size="large"
                                            className="w-full"
                                            format={HOUR_DATE_TIME}
                                            disabledDate={disabledDate}
                                            disabledTime={disabledDateTime}
                                            value={date}
                                            showNow={false}
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
                        {order.status == 3 && (
                            <>
                                <Col span={12}>
                                    <Col span={24} className="pb-6">
                                        <Avatar
                                            size={34}
                                            icon={<p className="text-base font-semibold leading-8"></p>}
                                            style={{ backgroundColor: '#02b875' }}
                                        />
                                        <span className="text-base pl-4 font-medium">Thông tin xe</span>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Loại xe</p>}
                                            name="vehicleType"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="Wave, Excitor ..."
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Biển số xe</p>}
                                            name="licensePlates"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="30 F 23132 "
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24}>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">Số khung</p>}
                                            name="soKhung"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                type="text"
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="ví dụ: 4234141243414324244"
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            label={<p className="text-base font-semibold">Số máy</p>}
                                            name="vehicleNumber"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Vui lòng không để trống trường thông tin này.',
                                                },
                                            ]}
                                        >
                                            <Input
                                                type="text"
                                                className="h-10 text-base border-[#02b875]"
                                                placeholder="ví dụ: 4234141243414324244"
                                            />
                                        </Form.Item>
                                        <Form.Item label={<p className="text-base font-semibold">Số Km</p>} name="km">
                                            <Input type="text" className="h-10 text-base border-[#02b875]" />
                                        </Form.Item>
                                        <Form.Item label={<p className="text-base font-semibold">Xăng</p>} name="gas">
                                            <Input
                                                type="text"
                                                placeholder="E,F"
                                                className="h-10 text-base border-[#02b875]"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Col>
                                <Col span={12}>
                                    <Col span={24} className="pb-6">
                                        <Avatar
                                            size={34}
                                            icon={<p className="text-base font-semibold leading-8"></p>}
                                            style={{ backgroundColor: '#02b875' }}
                                        />
                                        <span className="text-base pl-4 font-medium">Thông tin khác</span>
                                    </Col>

                                    <Col span={24}>
                                        <Form.Item
                                            label={<p className="text-base font-semibold">thời gian nhận xe thực tế</p>}
                                            name="tg_nhan_xe"
                                        >
                                            <DatePicker
                                                disabled
                                                size="large"
                                                className="w-full"
                                                format={HOUR_DATE_TIME}
                                                disabledDate={disabledDate}
                                                disabledTime={disabledDateTime}
                                                value={
                                                    order?.tg_nhan_xe == null
                                                        ? dayjs(dateStart).format(HOUR_DATE_TIME)
                                                        : dayjs(order?.tg_nhan_xe).format(HOUR_DATE_TIME)
                                                }
                                                showNow={false}
                                                showTime
                                            />
                                        </Form.Item>
                                    </Col>

                                    <Button
                                        // type="primary"
                                        htmlType="submit"
                                        className="btn-primary text-white bg-[#02b875] w-full mb-8 mt-8 h-12 hover:out
                        font-medium rounded-lg text-sm text-center mr-3 md:mr-0"
                                    >
                                        Cập nhật
                                    </Button>
                                </Col>
                            </>
                        )}
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
                        <>
                            <StatusOrderDisplay cancel={isCancel} currentState={statusCurrent} />
                            {order.status == 3 && (
                                <SelectMaterials
                                    order={order}
                                    isChangeMaterials={isChangeMaterials}
                                    showModal={showModal}
                                    setShowModal={setShowModal}
                                    handleOkCancel={(data) => {
                                        updateMaterials(order._id, data);
                                    }}
                                />
                            )}

                            <div className="flex gap-x-2 justify-end">
                                {order.status == 1 && (
                                    <Button className="bg-red-500 text-white hover:!text-white">Hủy</Button>
                                )}

                                {order.status == 0 || order.status == 4 || order.status == 5 ? (
                                    ''
                                ) : (
                                    <Button
                                        className="!bg-[#02b875] text-white hover:!text-white text-center"
                                        onClick={() => {
                                            handleChangeStatus(statusCurrent + 1, order);
                                        }}
                                    >
                                        <div className="flex justify-center items-center gap-x-2">
                                            <p>Chuyển Tiếp Trạng Thái</p>
                                            <RightOutlined />
                                        </div>
                                    </Button>
                                )}
                            </div>
                        </>
                    </Form.Item>
                    {order.status >= 3 && (
                        <>
                            <Row gutter={16}>
                                {order.status == 3 && (
                                    <Col span={12}>
                                        <Col span={24} className="pb-1">
                                            <Avatar
                                                size={34}
                                                icon={<p className="text-base font-semibold leading-8">3</p>}
                                                style={{ backgroundColor: '#02b875' }}
                                            />
                                            <span className="text-base pl-4 font-medium">Vật tư sửa chữa</span>
                                        </Col>
                                        {order.status == 3 && (
                                            <div className="flex gap-x-2 pb-6">
                                                {_.size(order.materials) > 0 && (
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            setShowModal(true);
                                                            setIsChangeMaterials(true);
                                                        }}
                                                    >
                                                        Thay Đổi Vật Tư
                                                    </Button>
                                                )}
                                                {_.size(order.materials) == 0 && (
                                                    <Button
                                                        type="primary"
                                                        onClick={() => {
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        Chọn vật tư
                                                    </Button>
                                                )}
                                            </div>
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
                                            <SubServices
                                                statusOrder={order.status}
                                                value={subService}
                                                dataSource={dataSubService}
                                                handleValue={handleDataSubService}
                                            />
                                        </Col>
                                    </Col>
                                )}

                                <Col span={12}>
                                    <Col span={24} className="pb-6">
                                        <Avatar
                                            size={34}
                                            icon={<p className="text-base font-semibold leading-8">5</p>}
                                            style={{ backgroundColor: '#02b875' }}
                                        />
                                        <span className="text-base pl-4 font-medium">Phiếu Sửa Chữa</span>
                                    </Col>
                                    <div ref={componentRef} className="p-5">
                                        <p className="w-full font-bold text-red-600 text-[30px] text-center">
                                            Phiếu Sửa Chữa
                                        </p>
                                        <p className="text-center font-bold text-[16px]">{order?.showroomName}</p>
                                        <p className="text-center py-2">Địa chỉ: {order?.showroomAddress}</p>
                                        <p>
                                            khách hàng: <span className="font-bold">{order?.name}</span>
                                        </p>
                                        <p>Số DT: {order?.number_phone}</p>
                                        <p>Dịch vụ: {order?.serviceType}</p>
                                        <p>
                                            Thời gian đặt lịch:{' '}
                                            <span>{dayjs(order?.appointmentSchedule).format(HOUR_DATE_TIME)}</span>
                                        </p>
                                        <p>
                                            Thời gian nhận xe thực tế:{' '}
                                            <span>
                                                {order?.tg_nhan_xe == null
                                                    ? dayjs(dateStart).format(HOUR_DATE_TIME)
                                                    : dayjs(order?.tg_nhan_xe).format(HOUR_DATE_TIME)}
                                            </span>
                                        </p>
                                        <p>
                                            Thời gian trả xe thực tế:{' '}
                                            <span>
                                                {order?.tg_tra_xe == null
                                                    ? ''
                                                    : dayjs(order?.tg_tra_xe).format(HOUR_DATE_TIME)}
                                            </span>
                                        </p>
                                        <p>Loại xe: {order?.vehicleType}</p>
                                        <p>Biển số xe: {order?.licensePlates}</p>
                                        <p>Số máy: {order?.vehicleNumber}</p>
                                        <p>Số khung: {order?.soKhung}</p>
                                        <p>Số Km: {order?.km}</p>
                                        <p className="mb-4">Nhiên liệu: {order?.gas}</p>
                                        <Table
                                            rowKey="_id"
                                            columns={columns}
                                            dataSource={[...dataSub, ...dataMaterial]}
                                            bordered
                                            pagination={false}
                                        />
                                        <div className="my-3">
                                            <div className="w-full flex justify-between gap-10">
                                                <p className="font-bold">Tổng Thanh Toán (đã bao gồm VAT)</p>
                                                <p>
                                                    <span className="font-bold text-red-600">
                                                        {Math.round(total + 0.1 * total).toLocaleString('en') + ' VNĐ'}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {order.status == 4 && (
                                        <Form.Item
                                            name="money"
                                            label={<p className="text-base font-semibold">Phương Thức Thanh Toán :</p>}
                                        >
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
                                <Alert
                                    message="Notes :"
                                    description={`Xác nhận khách đã thanh toán ${
                                        Math.round(order.total * 0.1 + order.total).toLocaleString('en') + ' VNĐ'
                                    }.`}
                                    type="info"
                                    showIcon
                                />
                            </Modal>
                            <Form.Item wrapperCol={{ offset: 8, span: 8 }} name="print">
                                {order.status == 4 && (
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
                                )}
                            </Form.Item>
                        </>
                    )}
                </Form>
            )}
            {/* <ReactToPrint
                trigger={() => {
                    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                    // to the root node of the returned component as it will be overwritten.
                    return <a href="#" ref={tringer}></a>;
                }}
                content={() => componentRef.current}
            /> */}
        </div>
    );
};

export default UpdateOrder;
