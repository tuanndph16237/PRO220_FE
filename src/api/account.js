import _ from 'lodash';
import instance from './instance';

const URL = '/accounts';

export const updateAccount = async (data) => {
    return instance.put(`/accounts/${data._id}`, _.omit(data, ['_id']));
};

export const getUser = async (id) => {
    return instance.get(`/account/${id}`);
};

export const Password = async (data) => {
    return instance.post(`/chagePassword/${data._id}`, data);
};
