import instance from './instance';
const URL = '/service';

export const getApiService = () => {
    return instance.get(`${URL}`);
};
