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
    4: 'Xử lý xong',
    5: 'Thanh toán',
    6: 'Hoàn thành',
};
export const SEVICE_TYPE = {
    HOUSE: 0,
    SHOWROOM: 1,
};
