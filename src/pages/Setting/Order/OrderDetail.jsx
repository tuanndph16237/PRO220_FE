import { useEffect, useRef, useState } from 'react';
import { Button, Radio, Table } from 'antd';
import OrderProcessing from './StatusOrder/OrderProcessing';
import OrderCancel from './StatusOrder/OrderCancel';
import { useGetParam } from '../../../utils/param';
import { getOrderById } from '../../../api/order';
import { useParams } from 'react-router-dom';
import { ORDER_STATUS, SEVICE_TYPE_ODERDETAIL } from '../../../constants/order';
import { Link } from 'react-router-dom';
import { HOUR_DATE_TIME } from '../../../constants/format';
import moment from 'moment';

import {
    UserOutlined,
    FieldTimeOutlined,
    TagOutlined,
    SettingOutlined,
    WhatsAppOutlined,
    LeftOutlined,
} from '@ant-design/icons';
import { paymentVNPay, sendMail, updateStatusBill } from '../../../api/payment';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { Notification } from '../../../utils/notifications';
import _ from 'lodash';

const OrderDetail = () => {
    const columns = [
        {
            title: 'Tên vật tư & Công việc',
            dataIndex: 'name',
            width: '50%',
            key: 'name',
        },
        {
            title: 'Đơn vị tính',
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

    const handleDataMaterialsAndWork = (data) => {
        const dataSources = data?.materials.map((dataMaterial) => {
            return {
                key: dataMaterial._id,
                ...dataMaterial,
                partPrice: dataMaterial?.qty * dataMaterial?.price,
            };
        });

        const dataSourcesSubservice = data?.subServices.map((subService) => {
            return {
                key: subService._id,
                ...subService,
            };
        });

        return [...dataSources, ...dataSourcesSubservice];
    };

    const { id } = useParams();
    const [responseCode] = useGetParam('vnp_ResponseCode');
    const [statusPayment, setStatusPayment] = useState(false);
    const [dataOrderDetail, setDataOrderDetail] = useState({
        status: '',
        listMaterials: [],
        appointmentSchedule: '',
        number_phone: '',
        serviceType: '',
        description: '',
        total: 0,
    });
    const currentOrder = useRef();
    const [opentpayment, setOpentpayment] = useState(false);
    useEffect(() => {
        (async () => {
            const { data } = await getOrderById(id);
            if (data.status == 4) {
                setOpentpayment(true);
            }
            currentOrder.current = { ...data, listMaterials: handleDataMaterialsAndWork(data) };
            setDataOrderDetail({ ...data, listMaterials: handleDataMaterialsAndWork(data) });
        })();
    }, [id]);

    useEffect(() => {
        (async () => {
            if (responseCode) {
                const data = await updateStatusOrder();
            }
        })();
    }, [responseCode]);

    useEffect(() => {
        if (statusPayment) {
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Thanh toán thành công');
        }
    }, [statusPayment]);
    const Payment = async () => {
        const valuePayment = {
            idOrder: id,
            amount: dataOrderDetail?.total,
            bankCode: 'NCB',
            orderInfo: 'Sửa Xe Tại Cửa Hàng Dodoris',
            orderType: 'billpayment',
        };
        const { data } = await paymentVNPay(valuePayment);
        window.location.href = `${data}`;
    };
    const updateStatusOrder = async () => {
        const value = {
            id: id,
            status: 5,
        };
        const { data } = await updateStatusBill(value);
        setOpentpayment(false);
        setDataOrderDetail({
            ...currentOrder.current,
            status: data.status,
        });
        if (data) {
            setStatusPayment(true);
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
    return (
        <div>
            <div className="mb-4">
                <div>
                    <Link to={'/cai-dat/quan-ly-don-hang'} className="my-link uppercase">
                        <LeftOutlined /> Trở lại
                    </Link>
                </div>
            </div>
            <div className="mt-8 mb-8">
                {dataOrderDetail.status === '' && <h1>Loading</h1>}
                {dataOrderDetail.status !== 0 && <OrderProcessing status={dataOrderDetail.status} />}
                {dataOrderDetail.status === 0 && <OrderCancel status={dataOrderDetail.status} />}
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className=" border rounded-lg  ">
                    <div className=" font-bold  my-1 text-[#02b875]	ml-3 text-center	">
                        <div>Thời gian đặt lịch:</div>
                        <div>{moment(dataOrderDetail?.appointmentSchedule).format(HOUR_DATE_TIME)}</div>
                    </div>
                    <div>
                        <div className="">
                            <div className="my-px text-lg uppercase ml-3 mb-1 flex		">
                                <div>
                                    <UserOutlined className="mr-2" />
                                </div>
                                <div>{dataOrderDetail?.name}</div>
                            </div>
                            <div className="my-px text-lg flex ml-3  mb-1	">
                                <SettingOutlined />
                                <div className="text-orange-500 ml-2  mb-1	">
                                    {ORDER_STATUS[dataOrderDetail.status]}
                                </div>{' '}
                            </div>
                        </div>
                        <div>
                            <div className="my-px text-lg  flex	ml-3  mb-1">
                                <WhatsAppOutlined />
                                <div className="ml-2">{dataOrderDetail?.number_phone} </div>
                            </div>
                            <div className="my-px text-lg  flex	ml-3  mb-1">
                                <SettingOutlined />
                                <div className="ml-2">Sửa chữa</div>
                            </div>
                            <div className="my-px text-lg 	ml-3">
                                <TagOutlined className="mr-2" />
                                {dataOrderDetail?.reasons}
                            </div>
                            <div className="my-px text-lg 	ml-3">
                                <FieldTimeOutlined className="mr-2" />
                                <p>
                                    Thời gian nhận xe thực tế:{' '}
                                    {moment(dataOrderDetail?.tg_nhan_xe).format(HOUR_DATE_TIME)}
                                </p>
                            </div>
                            <div className="my-px text-lg 	ml-3">
                                <FieldTimeOutlined className="mr-2" />
                                <p>
                                    Thời gian trả xe thực tế:{' '}
                                    {moment(dataOrderDetail?.tg_tra_xe).format(HOUR_DATE_TIME)}
                                </p>
                            </div>
                            <div className="my-px text-lg 	ml-3">
                                <p>Loại xe: {dataOrderDetail?.vehicleType}</p>
                            </div>
                            <div className="my-px text-lg 	ml-3">
                                <p>Biển Số: {dataOrderDetail?.licensePlates}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-2 ">
                    <div className="border rounded-lg ">
                        <div className="my-3 ml-3 font-bold  text-[#02b875]	">Vật tư & công việc</div>
                        <div>
                            <Table columns={columns} dataSource={dataOrderDetail.listMaterials} />
                        </div>
                    </div>
                    {opentpayment == false && (
                        <div className="font-bold mt-2 text-red-600	text-[14px] ml-[10px]">
                            Tổng tiền: {dataOrderDetail?.total.toLocaleString('en') + ' VNĐ'}{' '}
                        </div>
                    )}
                </div>
                {opentpayment && (
                    <div className=" border rounded-lg  ">
                        <div className=" font-bold  my-1 text-[#02b875] ml-[10px]	">
                            <div>Thanh Toán:</div>
                        </div>
                        <div>
                            <div>
                                <div className="my-px text-lg 	ml-[0px]">
                                    <div className="font-bold mt-2 text-red-600	text-[14px] ml-[10px]">
                                        Tổng tiền: {dataOrderDetail?.totalWithVat.toLocaleString('en') + ' VNĐ'}{' '}
                                    </div>
                                    <Button type="primary" className="btn-primary m-[10px]" onClick={() => Payment()}>
                                        Thanh Toán
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderDetail;
