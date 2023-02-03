import instance from './instance';
const URL = '/warehouses';
// /warehouses/update-one
export const getWarehouseByShowroomId = (idShowroom) => {
    return instance.get(`${URL}/${idShowroom}`);
};

export const updateQuantityOnePart = (dataUpdate) => {
    return instance.patch(`${URL}/update-one`,dataUpdate);
};
