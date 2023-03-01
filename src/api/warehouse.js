import instance from './instance';
const URL = '/warehouses';
// /warehouses/update-one
export const getWarehouseByShowroomId = (idShowroom) => {
    return instance.get(`${URL}/${idShowroom}`);
};

export const updateQuantityOnePart = (dataUpdate) => {
    return instance.patch(`${URL}/update-one`, dataUpdate);
};

export const warehouseSearch = (name) => {
    return instance.post(`/warehouse/search?`, { name });
};

export const updateWarehouseByMaterials = (data) => {
    return instance.patch('/warehouses', data);
};

export const giveBackMaterial = (data) => {
    return instance.patch('/warehouses/take-part-out', data);
};
