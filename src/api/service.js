import instance from './instance';
const URL = '/service';
const URLSUB = '/subService';

export const getApiService = () => {
    return instance.get(`${URL}`);
};

export const getApiServiceById = (id) => {
    return instance.get(`${URL}/${id}`);
};

export const createApiService = (data) => {
    return instance.post(URL, data);
};

export const removeApiServiceById = (id) => {
    return instance.delete(`${URL}/${id}`);
};

export const updateApiService = (id, data) => {
    return instance.patch(`${URL}/${id}`, data);
};

export const getApiSubService = () => {
    return instance.get(`${URLSUB}`);
};

export const getApiSubServiceById = (id) => {
    return instance.get(`${URLSUB}/${id}`);
};

export const createApiSubService = (data) => {
    return instance.post(URLSUB, data);
};

export const removeApiSubServiceById = (id) => {
    return instance.delete(`${URLSUB}/${id}`);
};

export const updateApiSubService = (id, data) => {
    return instance.patch(`${URLSUB}/${id}`, data);
};