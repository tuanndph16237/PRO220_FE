export const PERMISSION_TYPE = {
    CREATE: 111,
    SHOW: 112,
    UPDATE: 113,
    DELETE: 114,
    CONFIRM: 115,
    NULL: null,
};
export const dataPermission = [
    {
        name: 'SHOW',
        code: 112,
    },
    {
        name: 'CREATE',
        code: 111,
    },
    {
        name: 'UPDATE',
        code: 113,
    },
    {
        name: 'DELETE',
        code: 114,
    },
    {
        name: 'CONFIRM',
        code: 115,
    },
];

export const arrayPermission = [111, 112, 113, 114, 115];

export const PERMISSION_LABLEL = {
    STATISTICS: 'Thống Kê',
    ORDER_MANAGE: 'Quản Lý Đơn Hàng',
    WAREHOUSE_MANAGE: 'Quản Lý Kho',
    PART_MANAGE: 'Quản Lý Vật Tư',
    BANNER_MANAGE: 'Quản Lý Banner',
    ROLE_MANAGE: 'Quản Lý Vai Trò',
    SHOWROOM_MANAGE: 'Quản Lý Cửa Hàng',
    LOCATION_MANAGE: 'Quản Lý Địa Chỉ',
    ACCOUNT_MANAGE: 'Quản Lý Thành Viên',
    NEWS_MANAGE: 'Quản Lý Tin Tức',
};
