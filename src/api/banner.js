import instance from './instance';

const URL = '/banner';

export const getBanners = (filter) => {
    return instance.get(URL, filter);
};

export const getBannerById = (id) => {
    return instance.get(`${URL}/${id}`);
};

export const removeBanner = (id) => {
    return instance.delete(`${URL}/${id}`);
};

export const updateBanner = (id, data) => {
    return instance.patch(`${URL}/${id}`, data);
};
