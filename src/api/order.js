import instance from './instance';

const URL = '/order';

export const getOrders = (filter) => {
    return instance.get(URL, { params: { filter } });
};

export const createBannerByCustomer = (data) => {
    return instance.post('/order-by-customer', data);
};
