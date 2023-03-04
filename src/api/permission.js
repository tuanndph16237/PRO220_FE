import _ from 'lodash';
import instance from './instance';

const URLPermissions = '/permissions';
const URL = '/permission';
const URLRole = '/role';
const URLRolePermission = '/roles/';

export const getPermission = async (id) => {
    return instance.get(URLPermissions);
};

export const createRole = async (data) => {
    return instance.post(URLRole, data);
};

export const getRole = async () => {
    return instance.get(URLRole);
};

export const getRolePermission = async (data) => {
    return instance.get(URLRolePermission, { params: { q: data } });
};

export const updateRolePermission = async (data) => {
    return instance.patch(URLRole, data);
};

export const createPermission = async (data) => {
    return instance.post(URL, data);
};

export const getOnegetPermission = async(id)=>{
    return instance.get(`${URL}/${id}`);
}

export const updatePermission = async(data)=>{
    return instance.patch(URL, data);
}