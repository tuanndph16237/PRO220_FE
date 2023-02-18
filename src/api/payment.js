import _ from 'lodash';
import instance from './instance';

const URL = '/create_payment_url';
const URLMail = '/sendMail';

export const paymentVNPay = (data) => {
    return instance.post(URL, data);
};

export const sendMail = (data) => {
    return instance.post(URLMail, data);
};

export const updateStatusBill = (data) => {
    return instance.put(`orders/${data.id}`, _.omit(data, ['id']));
};
