import React from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

const PermissionCheck = ({ children, permissionHas }) => {
    const rolePermission = useSelector((state) => state.role.valueRolePermission.data);
    let checkIsPermission = false;

    const handleCheckIsAllow = (permissionHas) => {
        const findMatch = rolePermission.find((catePermission) => catePermission?.name == permissionHas?.label);
        if (findMatch) {
            if (_.some(findMatch.listPermissions, (rolePermission) => rolePermission?.code == permissionHas?.code))
                checkIsPermission = true;
        }
    };
    handleCheckIsAllow(permissionHas);

    return <>{checkIsPermission && children}</>;
};

export default PermissionCheck;
