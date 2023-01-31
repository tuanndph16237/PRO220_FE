import instance from './instance';
const URL = '/showrooms';

export const getShowrooms = () => {
    return instance.get(URL);
};

export const createShowroom = (data) => {
    return instance.post(URL, data);
};

export const getShowroomById = (id) => {
    return instance.get(`${URL}/${id}`);
};

export const removeShowroomById = (id) => {
    return instance.delete(`${URL}/${id}`);
};

export const removeShowroomByIds = (ids) => {
    return instance.delete(URL, { data: { ids } });
};

export const updateShowroom = (data) => {
    return instance.patch(`${URL}/${data.id}`, data);
};

export const search = (value) => {
    return instance.get(`/showroom/search?`, { params: { value } });

};

};

