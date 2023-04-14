import { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShowroomAsync } from '../slices/showroom';
import PermissionCheck from './permission/PermissionCheck';
import { PERMISSION_LABLEL, PERMISSION_TYPE } from '../constants/permission';

const ShowroomPicker = (props) => {
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const user = useSelector((state) => state.user.currentUser.values);
    const [showroomIdSeleted, setShowroomIdSeleted] = useState();
    useEffect(() => {
        if (showrooms.length === 0) {
            dispatch(getAllShowroomAsync());
        }
        if (user.showroomId) {
            setShowroomIdSeleted(user.showroomId);
        } else {
            if (!showroomIdSeleted && showrooms.length > 0) {
                setShowroomIdSeleted(showrooms[0]._id);
            }
        }
    }, [showrooms, user]);

    useEffect(() => {
        if (showroomIdSeleted) {
            props.onChangeShowroom(showroomIdSeleted);
        }
    }, [showroomIdSeleted]);

    const handleChange = (value) => {
        setShowroomIdSeleted(value);
    };

    return (
        <PermissionCheck permissionHas={{ label: PERMISSION_LABLEL.STATISTICS, code: PERMISSION_TYPE.UPDATE }}>
            <Select
                size="large"
                value={showroomIdSeleted}
                style={{
                    width: 400,
                }}
                onChange={handleChange}
                options={showrooms.map((showroom) => ({ value: showroom._id, label: showroom.name }))}
            />
        </PermissionCheck>
    );
};
export default ShowroomPicker;
