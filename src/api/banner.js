import instance from './instance';

const URL = '/banner';

export const getBanners = (filter) => {
    return instance.get(URL, { params: { filter } });
};

export const createBanner = (data) => {
    return instance.post(URL, data);
};

export const getBannerById = (id) => {
    return instance.get(`${URL}/${id}`);
};

export const removeBannerById = (id) => {
    return instance.delete(`${URL}/${id}`);
};

export const removeBannerByIds = (ids = []) => {
    return instance.delete(URL, { data: { ids } });
};

export const updateBanner = (id, data) => {
    return instance.patch(`${URL}/${id}`, data);
};
