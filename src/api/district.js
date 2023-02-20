import instance from './instance';

const URL = '/province';

export const getDistrict = () => {
    return instance.get(URL, {});
};

export const getByIdDistrict = (id) => {
    return instance.get(`${URL}/${id}`);
};

export const createDistricts = (data) => {
    return instance.post(URL, data);
};

export const updateDistricts = (id, data) => {
    return instance.patch(`${URL}/${id}`, data);
};