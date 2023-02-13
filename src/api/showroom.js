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

export const searchInListShowroom = (value) => {
    const removeEmptyParams = (params) => {
        return Object.keys(params)
            .filter((key) => params[key] !== '')
            .reduce((obj, key) => {
                obj[key] = params[key];
                return obj;
            }, {});
    };
    return instance.get(`/showroom/search?`, { params: { ...removeEmptyParams(value) } });
};

export const findNearShowroom = (value) => {
    return instance.post(`${URL}/user-near-by`, value);
};

export const compareUserShowroom = (value) => {
    return instance.post(`${URL}/user-check`, value);
};
