import instance from './instance';
const URL = '/service';
const URLSUB = '/subService';

export const getApiService = () => {
    return instance.get(`${URL}`);
};

export const getApiSubService = () => {
    return instance.get(`${URLSUB}`);
};
