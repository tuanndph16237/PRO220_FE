import _ from 'lodash';
import instance from './instance';

const URL = '/permission';
const URLRole = '/role'
const URLRolePermission = '/roles/'

export const getPermission = async (id) => {
    return instance.get(URL);
};

export const createRole = async(data)=>{
    return instance.post(URLRole,data);
}

export const getRole = async()=>{
    return instance.get(URLRole);
}

export const getRolePermission = async(data)=>{
    return instance.get(URLRolePermission,{params:{q:data}});
}