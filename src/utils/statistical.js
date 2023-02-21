import dayjs from 'dayjs';

export const setCategoriesByType = (type, time, cb) => {
    switch (type) {
        case 'date':
            cb([
                '0h',
                '1h',
                '2h',
                '3h',
                '4h',
                '5h',
                '6h',
                '7h',
                '8h',
                '9h',
                '10h',
                '11h',
                '12h',
                '13h',
                '14h',
                '15h',
                '16h',
                '17h',
                '18h',
                '19h',
                '20h',
                '21h',
                '22h',
                '23h',
            ]);
            break;
        case 'week':
            const start = dayjs(time).startOf('w')['$d'];
            let dayTemp = dayjs(start).add(1, 'd');
            let categories = [];
            for (let idx = 0; idx < 7; idx++) {
                const addDay = dayjs(dayTemp).add(1, 'd');
                const formatDate = dayjs(dayTemp).format('DD/MM');
                dayTemp = addDay;
                categories.push(formatDate);
            }
            cb(categories);
            break;
        case 'month':
            const dayInMonth = dayjs(time).daysInMonth();
            const weekOfMonth = Math.ceil(dayInMonth / 7);
            const startOfMonth = dayjs(time).startOf('M')['$d'];
            const endOfMonth = dayjs(time).endOf('M')['$d'];
            let dayTempOfWeek = startOfMonth;
            let categoriesOfWeek = [];
            for (let idx = 0; idx < weekOfMonth; idx++) {
                const isAfterEndOfMonths = dayjs(dayjs(dayTempOfWeek).add(6, 'd')).isAfter(endOfMonth);
                const add7Day = isAfterEndOfMonths ? endOfMonth : dayjs(dayTempOfWeek).add(6, 'd')['$d'];
                const formatDate = `${dayjs(dayTempOfWeek).format('DD/MM')} - ${dayjs(add7Day).format('DD/MM')}`;
                dayTempOfWeek = dayjs(add7Day).add(1, 'd')['$d'];
                categoriesOfWeek.push(formatDate);
            }
            cb(categoriesOfWeek);
            break;
        case 'year':
            cb(['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', '1T0', 'T11', 'T12']);
            break;
        default:
    }
};
