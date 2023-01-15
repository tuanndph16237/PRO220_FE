import instance from './instance';
const URL = '/warehouses';

export const getWarehouseByShowroomId = (idShowroom) => {
    return instance.get(`${URL}/${idShowroom}`);
};