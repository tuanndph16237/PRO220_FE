import { notification } from 'antd';
import { NOTIFICATION_TYPE } from '../constants/status';

export const Notification = (
    type = NOTIFICATION_TYPE.WARNING,
    message = '',
    description = '',
    placement = 'topRight',
) => {
    return notification[type]({
        message,
        description,
        placement,
    });

};
r
