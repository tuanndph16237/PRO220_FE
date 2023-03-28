import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table, message, Row, Menu, theme } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { getAllShowroomAsync } from '../../../slices/showroom'
import { ORDER_STATUS } from '../../../constants/order';
import { HOUR_DATE_TIME } from '../../../constants/format';
import moment from 'moment';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getUserOrder , updateOrderUser} from '../../../api/order';
import { JwtDecode } from '../../../utils/auth';
import {  ORDER_STATUS_TYPE } from '../../../constants/order';

const ListOrder = (props) => {
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const user = JwtDecode();
    const [orderUser, setOrderUser] = useState([]);
    useEffect(() => {
        fetchOrderUser(user._id);
    }, [props.status]);

    const fetchOrderUser = async (id) => {
        try {
            const dataOrderUser = await getUserOrder(id);
            console.log(dataOrderUser);
            const handleOrderUser = dataOrderUser.data.map((order, index) => ({ key: index,name:order.showroom.name,...order}));
            if(props.status === ""){
                setOrderUser(handleOrderUser);
            }else{
                const filterData = handleOrderUser.filter((order)=>order.status == props.status)
                setOrderUser(filterData)
            }
         
        } catch (error) {}
    };

    useEffect(() => {
        if (_.isEmpty(showrooms)) {
            dispatch(getAllShowroomAsync());
        }
    }, [showrooms]);

    
    const confirm = async (data) => {
        await updateOrderUser(data)
        message.info('Đơn hàng đã bị hủy');
        setTimeout(()=> fetchOrderUser(user._id),1000)

    };
    const text = 'Bạn có muốn hủy đơn hàng không';
    const description = 'Delete the task';

    const columns = [
        {
            title: 'Cơ sở',
            dataIndex: 'name',
            width: 300,
        },
        {
            title: 'Thời gian',
            dataIndex: 'appointmentSchedule',
            width: 200,
            render: (date) => moment(date).format(HOUR_DATE_TIME),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 150,
            render: (status) => ORDER_STATUS[status],
        },
        {
            title: '',
            width: 250,
            render: (data) => {
                return (
                    <Row>
                        <Link to={`${data.idOrder}`}>
                            <Button className='bg-[#02b875] text-white w-20	'>Chi tiết</Button>
                        </Link>
                        <Popconfirm
                            placement="top"
                            title={text}
                            description={description}
                            onConfirm={()=>confirm(data)}
                            okText="Có"
                            cancelText="Không"
                        >
                            {data.status == 1 && (
                                <Button  className='w-20' type="primary" danger>
                                    Hủy
                                </Button>
                            )}
                        </Popconfirm>
                    </Row>
                );
            },
        },
    ];

    const navigate = useNavigate();
    const [path, setPath] = useState('');
    const { pathname } = useLocation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleClick = ({
        item: {
            props: { path },
        },
    }) => {
        navigate(`/cai-dat/quan-ly-don-hang/${path}`);
    };
    useEffect(() => {
        const subString = pathname.substring(9);
        if (subString) {
            setPath(subString);
        }
    }, [pathname]);
    const items = ORDER_STATUS_TYPE
    
    return (
        <div>
            <Menu
                onClick={handleClick}
                mode="horizontal"
                items={items}
                defaultSelectedKeys={['']}
                selectedKeys={[path]}
            />
            <Table
                columns={columns}
                dataSource={orderUser}
            />
        </div>
    );
}

export default ListOrder