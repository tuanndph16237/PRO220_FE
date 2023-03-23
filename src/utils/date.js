import dayjs from 'dayjs';

export const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

export const disabledDate = (current) => {
    return current && current < dayjs().endOf('day').subtract(1, 'days');
};

export const disabledDateTime = () => ({
    disabledHours: () => [...range(0, 7), ...range(12, 13), ...range(18, 24)],
    disabledMinutes: () => range(0),
    disabledSeconds: () => range(0, 60),
});

export const setHourISODate = (date = dayjs(), hour = '8:00') => {
    switch (hour) {
        case '9:00':
            return dayjs(date).set('hour', 9).set('minute', 0);
        case '10:00':
            return dayjs(date).set('hour', 10).set('minute', 0);
        case '11:00':
            return dayjs(date).set('hour', 11).set('minute', 0);
        case '13:00':
            return dayjs(date).set('hour', 13).set('minute', 0);
        case '14:00':
            return dayjs(date).set('hour', 14).set('minute', 0);
        case '15:00':
            return dayjs(date).set('hour', 15).set('minute', 0);
        case '16:00':
            return dayjs(date).set('hour', 16).set('minute', 0);
        case '17:00':
            return dayjs(date).set('hour', 17).set('minute', 0);
        default:
            return dayjs(date).set('hour', 8).set('minute', 0);
    }
};
