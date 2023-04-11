import { Steps } from 'antd';
import _ from 'lodash';

const cancelBooking = [
    {
        title: 'Chờ xác nhận',
        // status: 'process',
    },
    {
        title: 'Hủy',
    },
];

const processBooking = [
    {
        title: 'Chờ xác nhận',
        // status: 'process',
    },
    {
        title: 'Đã xác nhận lịch',
        // status: 'process',
    },
    {
        title: 'Đang xử lý',
        // status: 'process',
    },
    {
        title: 'Thanh toán',
        // status: 'process',
    },
    {
        title: 'Hoàn thành',
        // status: 'finish',
    },
];

const StatusOrderDisplay = ({ cancel, currentState }) => {
    const handleStatusState = () => {
        if (cancel) {
            return 2;
        } else {
            if (currentState == 5) {
                return 6;
            } else {
                return currentState - 1;
            }
        }
    };
    return (
        <div className="status-content py-4">
            <Steps current={handleStatusState()} items={cancel ? cancelBooking : processBooking} />
        </div>
    );
};

export default StatusOrderDisplay;
