import instance from './instance';
const URL = '/notification-part';

export const getApiNotifications = () => {
    return instance.get(`${URL}`);
};

export const createNotificationPart = (data) => {
    return instance.post(`${URL}`, data);
};
