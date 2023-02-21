import { Select } from 'antd';
import { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { getAllShowroomAsync } from '../../../slices/showroom';
import TotalOrderStatistical from './Order/TotalOrderStatistical';

const OrderStatistical = () => {
    useDocumentTitle('Thống kê đơn hàng');
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const [showroomIdSeleted, setShowroomIdSeleted] = useState();
    useEffect(() => {
        if (showrooms.length === 0) {
            dispatch(getAllShowroomAsync());
        }
        if (!showroomIdSeleted && showrooms.length > 0) {
            setShowroomIdSeleted(showrooms[0]._id);
        }
    }, [showrooms]);

    const handleChange = (value) => {
        setShowroomIdSeleted(value);
    };

    return (
        <Fragment>
            <Select
                size="large"
                value={showroomIdSeleted}
                style={{
                    width: 400,
                }}
                onChange={handleChange}
                options={showrooms.map((showroom) => ({ value: showroom._id, label: showroom.name }))}
            />
            <TotalOrderStatistical showroomId={showroomIdSeleted} />
        </Fragment>
    );
};
export default OrderStatistical;
