import React, { Fragment, useState, useEffect } from 'react';
import _ from 'lodash';
import dayjs from 'dayjs';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import DatePickerByOptions from '../../../../components/Customs/DatePickerByOptions';
import { getOrderRevenue } from '../../../../api/order';
import { setCategoriesByType } from '../../../../utils/statistical';

const defaultSeries = [
    {
        type: 'column',
        name: 'Chi phí',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        type: 'column',
        name: 'Doanh thu',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        type: 'column',
        name: 'Lợi nhuận',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
        type: 'spline',
        name: 'Line doanh thu',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        marker: {
            lineWidth: 2,
            lineColor: Highcharts.getOptions().colors[3],
            fillColor: 'white',
        },
    },
];
const RevenueOrderStatistical = () => {
    useDocumentTitle('Thống kê doanh thu');
    const [time, setTime] = useState(dayjs());
    const [type, setType] = useState('date');
    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState(defaultSeries);
    const [data, setData] = useState([]);
    const [showroomId, setShowroomId] = useState('');

    useEffect(() => {
        setCategoriesByType(type, time, setCategories);
        handleSetSeries();
    }, [data]);

    useEffect(() => {
        if (time && showroomId) {
            getOrderRevenue({ type, time, showroomId })
                .then(({ data: res }) => {
                    setData(res);
                })
                .catch((err) => {
                    console.log('getOrderRevenue', err);
                });
        }
    }, [time, showroomId, type]);

    const priceMaterials = (materials) => {
        return _.reduce(
            materials,
            (total, material) => {
                const totalMaterial = material.qty * material.price;
                return total + totalMaterial;
            },
            0,
        );
    };
    const handleSetSeries = () => {
        switch (type) {
            case 'date':
                const defaultSeriesClone = [
                    {
                        type: 'column',
                        name: 'Chi phí',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'column',
                        name: 'Doanh thu',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'column',
                        name: 'Lợi nhuận',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'spline',
                        name: 'Line doanh thu',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white',
                        },
                    },
                ];
                _.forEach(data, (item) => {
                    const hour = dayjs(item.tg_nhan_xe).hour();
                    //tinh chi phi
                    const expense = priceMaterials(item.materials);
                    const total = _.get(item, 'total', 0);
                    const idxExpense = `[0].data[${hour}]`;
                    const expensePrev = _.get(defaultSeriesClone, idxExpense, 0);
                    _.set(defaultSeriesClone, idxExpense, expensePrev + expense);
                    //tinh loi nhuan
                    const profit = total - expense;
                    const idxProfit = `[2].data[${hour}]`;
                    const profitPrev = _.get(defaultSeriesClone, idxProfit, 0);
                    _.set(defaultSeriesClone, idxProfit, profitPrev + profit);
                    //tinh doanh thu

                    const idxTotalColumn = `[1].data[${hour}]`;
                    const idxTotalLine = `[3].data[${hour}]`;
                    const totalPrev = _.get(defaultSeriesClone, idxTotalColumn, 0);
                    _.set(defaultSeriesClone, idxTotalColumn, totalPrev + total);
                    _.set(defaultSeriesClone, idxTotalLine, totalPrev + total);
                });
                setSeries(defaultSeriesClone);
                break;
            case 'week':
                const defaultSeriesWeek = [
                    {
                        type: 'column',
                        name: 'Chi phí',
                        data: [0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'column',
                        name: 'Doanh thu',
                        data: [0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'column',
                        name: 'Lợi nhuận',
                        data: [0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'spline',
                        name: 'Line doanh thu',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white',
                        },
                    },
                ];
                _.forEach(data, (item) => {
                    const dayOfWeek = dayjs(item.tg_nhan_xe).day();
                    const formatDayOfWeek = dayOfWeek ? dayOfWeek - 1 : 6;
                    //tinh chi phi
                    const expense = priceMaterials(item.materials);
                    const total = _.get(item, 'total', 0);
                    const idxExpense = `[0].data[${formatDayOfWeek}]`;
                    const expensePrev = _.get(defaultSeriesWeek, idxExpense, 0);
                    _.set(defaultSeriesWeek, idxExpense, expensePrev + expense);
                    //tinh loi nhuan
                    const profit = total - expense;
                    const idxProfit = `[2].data[${formatDayOfWeek}]`;
                    const profitPrev = _.get(defaultSeriesWeek, idxProfit, 0);
                    _.set(defaultSeriesWeek, idxProfit, profitPrev + profit);
                    //tinh doanh thu

                    const idxTotalColumn = `[1].data[${formatDayOfWeek}]`;
                    const idxTotalLine = `[3].data[${formatDayOfWeek}]`;
                    const totalPrev = _.get(defaultSeriesWeek, idxTotalColumn, 0);
                    _.set(defaultSeriesWeek, idxTotalColumn, totalPrev + total);
                    _.set(defaultSeriesWeek, idxTotalLine, totalPrev + total);
                });
                setSeries(defaultSeriesWeek);
                break;
            case 'month':
                const dayInMonth = dayjs(time).daysInMonth();
                const weekOfMonth = Math.ceil(dayInMonth / 7);

                const defaultSeriesMonths = [
                    {
                        type: 'column',
                        name: 'Chi phí',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                    },
                    {
                        type: 'column',
                        name: 'Doanh thu',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                    },
                    {
                        type: 'column',
                        name: 'Lợi nhuận',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                    },
                    {
                        type: 'spline',
                        name: 'Line doanh thu',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white',
                        },
                    },
                ];
                _.forEach(data, (item) => {
                    const dayOfMonth = +dayjs(item.tg_nhan_xe).format('DD');
                    let weekOfMonth = 0;
                    if (dayOfMonth > 7 && dayOfMonth <= 14) weekOfMonth = 1;
                    if (dayOfMonth > 14 && dayOfMonth <= 21) weekOfMonth = 2;
                    if (dayOfMonth > 21 && dayOfMonth <= 28) weekOfMonth = 3;
                    if (dayOfMonth > 28) weekOfMonth = 4;
                    //tinh chi phi
                    const expense = priceMaterials(item.materials);
                    const total = _.get(item, 'total', 0);
                    const idxExpense = `[0].data[${weekOfMonth}]`;
                    const expensePrev = _.get(defaultSeriesMonths, idxExpense, 0);
                    _.set(defaultSeriesMonths, idxExpense, expensePrev + expense);
                    //tinh loi nhuan
                    const profit = total - expense;
                    const idxProfit = `[2].data[${weekOfMonth}]`;
                    const profitPrev = _.get(defaultSeriesMonths, idxProfit, 0);
                    _.set(defaultSeriesMonths, idxProfit, profitPrev + profit);
                    //tinh doanh thu
                    const idxTotalColumn = `[1].data[${weekOfMonth}]`;
                    const idxTotalLine = `[3].data[${weekOfMonth}]`;
                    const totalPrev = _.get(defaultSeriesMonths, idxTotalColumn, 0);
                    _.set(defaultSeriesMonths, idxTotalColumn, totalPrev + total);
                    _.set(defaultSeriesMonths, idxTotalLine, totalPrev + total);
                });
                setSeries(defaultSeriesMonths);
                break;
            case 'year':
                const defaultSeriesYear = [
                    {
                        type: 'column',
                        name: 'Chi phí',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'column',
                        name: 'Doanh thu',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'column',
                        name: 'Lợi nhuận',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                    {
                        type: 'spline',
                        name: 'Line doanh thu',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white',
                        },
                    },
                ];
                _.forEach(data, (item) => {
                    const months = dayjs(item.tg_nhan_xe).format('MM') - 1;
                    //tinh chi phi
                    const expense = priceMaterials(item.materials);
                    const total = _.get(item, 'total', 0);
                    const idxExpense = `[0].data[${months}]`;
                    const expensePrev = _.get(defaultSeriesYear, idxExpense, 0);
                    _.set(defaultSeriesYear, idxExpense, expensePrev + expense);
                    //tinh loi nhuan
                    const profit = total - expense;
                    const idxProfit = `[2].data[${months}]`;
                    const profitPrev = _.get(defaultSeriesYear, idxProfit, 0);
                    _.set(defaultSeriesYear, idxProfit, profitPrev + profit);
                    //tinh doanh thu
                    const idxTotalColumn = `[1].data[${months}]`;
                    const idxTotalLine = `[3].data[${months}]`;
                    const totalPrev = _.get(defaultSeriesYear, idxTotalColumn, 0);
                    _.set(defaultSeriesYear, idxTotalColumn, totalPrev + total);
                    _.set(defaultSeriesYear, idxTotalLine, totalPrev + total);
                });
                setSeries(defaultSeriesYear);
                break;
            default:
                const defaultSeriesOptions = [
                    {
                        type: 'column',
                        name: 'Chi phí',
                        data: [0],
                    },
                    {
                        type: 'column',
                        name: 'Doanh thu',
                        data: [0],
                    },
                    {
                        type: 'column',
                        name: 'Lợi nhuận',
                        data: [0],
                    },
                    {
                        type: 'spline',
                        name: 'Line doanh thu',
                        data: [0],
                        marker: {
                            lineWidth: 2,
                            lineColor: Highcharts.getOptions().colors[3],
                            fillColor: 'white',
                        },
                    },
                ];
                _.forEach(data, (item) => {
                    //tinh chi phi
                    const expense = priceMaterials(item.materials);
                    const total = _.get(item, 'total', 0);
                    const idxExpense = `[0].data[0]`;
                    const expensePrev = _.get(defaultSeriesOptions, idxExpense, 0);
                    _.set(defaultSeriesOptions, idxExpense, expensePrev + expense);
                    //tinh loi nhuan
                    const profit = total - expense;
                    const idxProfit = `[2].data[0]`;
                    const profitPrev = _.get(defaultSeriesOptions, idxProfit, 0);
                    _.set(defaultSeriesOptions, idxProfit, profitPrev + profit);
                    //tinh doanh thu
                    const idxTotalColumn = `[1].data[0]`;
                    const idxTotalLine = `[3].data[0]`;
                    const totalPrev = _.get(defaultSeriesOptions, idxTotalColumn, 0);
                    _.set(defaultSeriesOptions, idxTotalColumn, totalPrev + total);
                    _.set(defaultSeriesOptions, idxTotalLine, totalPrev + total);
                });
                setSeries(defaultSeriesOptions);
        }
    };
    return (
        <Fragment>
            <ShowroomPicker onChangeShowroom={setShowroomId} />
            <div className="rounded border border-solid border-inherit p-6 my-4">
                <div className="flex justify-between items-center pb-4">
                    <div span={12}>
                        <h3 className="font-bold text-lg">Thống kê doanh thu</h3>
                    </div>
                    <div span={12}>
                        <DatePickerByOptions onChange={setTime} setType={setType} />
                    </div>
                </div>
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            title: {
                                text: null,
                            },
                            xAxis: {
                                categories,
                            },
                            yAxis: {
                                title: {
                                    text: null,
                                },
                                labels: {
                                    formatter: function () {
                                        const value = this.value;
                                        if (!value) return value;
                                        const valueFormat = value.toLocaleString('en') + ' VNĐ';
                                        return valueFormat;
                                    },
                                },
                            },
                            tooltip: {
                                valueSuffix: ' VNĐ',
                            },
                            series,
                        }}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default RevenueOrderStatistical;
