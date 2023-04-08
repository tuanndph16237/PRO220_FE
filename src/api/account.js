import _ from 'lodash';
import instance from './instance';

const URL = '/accounts';

export const getAccounts = async (filter) => {
    return instance.post(URL, filter);
};
export const createAccount = async (data) => {
    return instance.post('/account', data);
};

export const removeAccount = async (id) => {
    return instance.delete(`${URL}/${id}`);
};

export const updateAccount = async (data) => {
    console.log('data', _.omit(data, ['_id', 'password', '__v']));
    return instance.put(`/accounts/${data._id}`, _.omit(data, ['_id', 'password', '__v']));
};

export const getUser = async (id) => {
    return instance.get(`/account/${id}`);
};

export const Password = async (data) => {
    return instance.post(`/chagePassword/${data._id}`, data);
};

export const getAllUser = async () => {
    return instance.get('getUsers');
};
