// export const ORDER_STATUS = {
//     cancel: {
//         value: 0,
//         label: 'Hủy',
//     },
//     initial: {
//         value: 1,
//         label: 'Chờ xác nhận',
//     },
//     receive: {
//         value: 2,
//         label: 'Đã tiếp nhận lịch',
//     },
//     processing: {
//         value: 3,
//         label: 'Đang xử lý',
//     },
//     doneProcessing: {
//         value: 4,
//         label: 'Xử lý xogn',
//     },
//     payment: {
//         value: 5,
//         label: 'Thanh toán',
//     },
//     done: {
//         value: 6,
//         label: 'Hoàn thành',
//     },
// };
export const ORDER_STATUS = {
    0: 'Hủy',
    1: 'Chờ xác nhận',
    2: 'Đã tiếp nhận lịch',
    3: 'Đang xử lý',
    4: 'Thanh toán',
    5: 'Hoàn thành',
};
export const SEVICE_TYPE = {
    HOUSE: 0,
    SHOWROOM: 1,
};
export const SEVICE_TYPE_ODERDETAIL = {
    0: 'Tại nhà',
    1: 'Tại cửa hàng'
}
export const VEHICLE_TYPE = [
    { value: 1, label: 'Xe số' },
    { value: 2, label: 'Xe tay ga' },
    { value: 3, label: 'Xe côn tay' },
    { value: 4, label: 'Xe mô tô' },
];

export const ORDER_STATUS_TYPE = [
    { key: 1, label: 'Tất cả', path: '' },
    { key: 2, label: 'Chờ xác nhận lịch', path: 'cho-xac-nhan-lich' },
    { key: 3, label: 'Đã xác nhận lịch', path: 'da-xac-nhan-lich' },
    { key: 4, label: 'Đang xử lý', path: 'dang-xu-ly' },
    { key: 5, label: 'Thanh toán', path: 'thanh-toan' },
    { key: 6, label: 'Hoàn thành', path: 'hoan-thanh' },
    { key: 7, label: 'Hủy', path: 'huy' },
]