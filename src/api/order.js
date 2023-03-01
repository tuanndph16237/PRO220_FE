import instance from './instance';

const URL = '/orders';

export const getOrders = (filter) => {
    return instance.get(URL, {
        params: {
            filter,
        },
    });
};

export const getOrdersFilter = (filter) => {
    return instance.post('/orders-filter', filter);
};

export const getOrderById = (id) => {
    return instance.get(`${URL}/${id}`);
};

export const createOrder = (data) => {
    return instance.post(URL, data);
};

export const removeOrder = (id) => {
    return instance.delete(`${URL}/${id}`);
};

export const removeOrderByIds = (ids = []) => {
    return instance.delete(URL, {
        data: {
            ids,
        },
    });
};

export const updateOrder = (id, data) => {
    return instance.patch(`${URL}/${id}`, data);
};

export const updateOrderStatus = (id, data) => {
    return instance.patch(`order-status/${id}`, data);
};

export const createBannerByCustomer = (data) => {
    return instance.post('/order-by-customer', data);
};

export const getUserOrder = (accountId) => {
    return instance.get(`/orders-customer/${accountId}`);
};

export const updateOrderUser = (data) => {
    return instance.patch(`orders-customer/${data._id}`, { status: 0 });
};

export const getTotalOrderByOptions = (data) => {
    return instance.post('/order/statistical-total', data);
};

export const getOrderRevenue = (data) => {
    return instance.post('/order/statistical-revenue', data);
};
