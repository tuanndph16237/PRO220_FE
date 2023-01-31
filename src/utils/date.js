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
