import instance from './instance';

const URL = '/banner';

export const getBanners = (filter) => {
    console.log(2222, filter);
    return instance.get(URL, { params: { filter } });
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
