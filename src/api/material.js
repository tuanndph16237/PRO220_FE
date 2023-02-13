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

export const removeMaterialById = (id) => {
    return instance.delete(`${URL}/${id}`);
};

export const removeMaterialByIds = (ids = []) => {
    return instance.delete(URL, { data: { ids } });
};

export const updateMaterial = (id, data) => {
    return instance.patch(`${URL}/${id}`, data);
};
