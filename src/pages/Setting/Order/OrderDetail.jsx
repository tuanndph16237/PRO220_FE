import { useEffect, useState } from 'react';
import { Table } from 'antd';
import OrderProcessing from './StatusOrder/OrderProcessing';
import OrderCancel from './StatusOrder/OrderCancel';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../../../api/order';
import { useParams } from 'react-router-dom';
import { ORDER_STATUS, SEVICE_TYPE_ODERDETAIL } from '../../../constants/order';
import { Link } from 'react-router-dom';
import { HOUR_DATE_TIME } from '../../../constants/format';
import moment from 'moment';

import {
    UserOutlined,
    EnvironmentOutlined,
    LikeOutlined,
    TagOutlined,
    SettingOutlined,
    WhatsAppOutlined,
    LeftOutlined,
} from '@ant-design/icons';

const OrderDetail = () => {
    const columns = [
        {
            title: 'STT',
           dataIndex:'key'
        },
        {
            title: 'Tên vật liệu',
            dataIndex: 'name'
        },
        {
            title: 'Số lượng',
            dataIndex: 'qyt'
        },
        {
            title: 'Giá tiền',
            dataIndex:'price'
        },
    ];
    const { id } = useParams();
    const [dataOrderDetail, setDataOrderDetail] = useState({
        status: '',
    });
    useEffect(() => {
        (async () => {
            const { data } = await getOrderById(id);
            setDataOrderDetail(data);
        })();
    }, [id]);
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
                <div className=' border rounded-lg  '>
                    <div className=" font-bold  my-1 text-[#02b875]	ml-3 text-center	">
                        <div>Thời gian đặt lịch:</div>
                        <div>{moment(dataOrderDetail.appointmentSchedule).format(HOUR_DATE_TIME)}</div>
                    </div>
                    <div >
                        <div className="">
                            <div className="my-px text-lg uppercase ml-3 mb-1	">
                                <UserOutlined className='mr-2'/>
                                {dataOrderDetail.name}
                            </div>
                            <div className="my-px text-lg ml-3	 mb-1">
                                <EnvironmentOutlined className='mr-2'/>
                                {dataOrderDetail.address}
                            </div>
                            <div className="my-px text-lg flex ml-3  mb-1	">
                                <LikeOutlined />
                                <div className="text-orange-500 ml-2  mb-1	">{ORDER_STATUS[dataOrderDetail.status]}</div>{' '}
                            </div>
                        </div>
                        <div>
                            <div className="my-px text-lg  flex	ml-3  mb-1">
                                <WhatsAppOutlined />
                                <div className='ml-2'>{dataOrderDetail.number_phone}{' '}</div> 
                            </div>
                            <div className="my-px text-lg  flex	ml-3  mb-1">
                                <SettingOutlined /> 
                                <div className='ml-2'>{SEVICE_TYPE_ODERDETAIL[dataOrderDetail.serviceType]}</div>
                            </div>
                            <div className="my-px text-lg 	ml-3">
                                <TagOutlined className='mr-2' />
                                 Mô tả: {dataOrderDetail.description}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-span-2 '>
                    <div  className="border rounded-lg ">
                        <div className='my-3 ml-3 font-bold  text-[#02b875]	'>
                            Dịch vụ sửa chữa
                        </div>
                        <div>
                            <Table
                                columns={columns}
                                // dataSource={data}
                            />
                        </div>
                    </div>
                    <div className='font-bold mt-2'>Tổng tiền: </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
