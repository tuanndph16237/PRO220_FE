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

export const getExchangePart = (value) => {
    return instance.get(`/warehouse-exchange`, { params: value });
};

export const exchangePart = (value) => {
    return instance.patch(`/warehouse-exchange`, value);
};

export const generalPart = () => {
    return instance.get(`/general-warehouse`);
};

export const updateGeneralPart = (data) => {
    return instance.patch(`/general-warehouse`, data);
};

export const updatePartRequired = (data) => {
    return instance.patch(`/required-part?`, data);
};

export const getOnePartRequired = (data) => {
    return instance.get(`/required-part?`, { params: data });
};
