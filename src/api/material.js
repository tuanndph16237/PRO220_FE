import instance from './instance';

const URL = '/material';

export const getMaterials = (filter) => {
    return instance.get(URL, { params: { filter } });
};

export const createMaterial = (data) => {
    return instance.post(URL, data);
};

export const getMaterialById = (id) => {
    return instance.get(`${URL}/${id}`);
};

export const updateMaterial = (id, data) => {
    return instance.patch(`${URL}/${id}`, data);
};

export const searchMaterial = (value) => {
    return instance.get(`/materials/search`, {
        params: value,
    });
};