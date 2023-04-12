import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShowroomAsync } from '../slices/showroom';

const ShowroomPicker = (props) => {
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

    useEffect(() => {
        if (showroomIdSeleted) {
            props.onChangeShowroom(showroomIdSeleted);
        }
    }, [showroomIdSeleted]);

    const handleChange = (value) => {
        setShowroomIdSeleted(value);
    };

    return (
        <Select
            size="large"
            value={showroomIdSeleted}
            style={{
                width: 400,
            }}
            onChange={handleChange}
            options={showrooms.map((showroom) => ({ value: showroom._id, label: showroom.name }))}
        />
    );
};
export default ShowroomPicker;
