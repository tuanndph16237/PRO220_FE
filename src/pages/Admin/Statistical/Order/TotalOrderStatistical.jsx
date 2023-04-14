import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import DatePickerByOptions from '../../../../components/Customs/DatePickerByOptions';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { getTotalOrderByOptions } from '../../../../api/order';
import { setCategoriesByType } from '../../../../utils/statistical';
import { Fragment } from 'react';
import ShowroomPicker from '../../../../components/ShowroomPicker';

const defaultSeries = [
    {
        name: 'Đơn hàng',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    },
];
const TotalOrderStatistical = (props) => {
    useDocumentTitle('Thống kê đơn hàng');
    const [time, setTime] = useState(dayjs());
    const [type, setType] = useState('date');
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [series, setSeries] = useState(defaultSeries);
    const [showroomId, setShowroomId] = useState('');

    useEffect(() => {
        setCategoriesByType(type, time, setCategories);
        handleSetSeries();
    }, [data]);

    const handleSetSeries = () => {
        switch (type) {
            case 'date':
                const defaultSeriesClone = [
                    {
                        name: 'Đơn hàng',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                ];
                data.forEach((value) => {
                    const hour = dayjs(value.appointmentSchedule).hour();
                    defaultSeriesClone.forEach((series) => {
                        series.data[hour] = ++series.data[hour];
                    });
                });
                setSeries(defaultSeriesClone);
                break;
            case 'week':
                const defaultSeriesWeek = [
                    {
                        name: 'Đơn hàng',
                        data: [0, 0, 0, 0, 0, 0, 0],
                    },
                ];
                data.forEach((value) => {
                    const dayOfWeek = dayjs(value.appointmentSchedule).day();
                    const formatDayOfWeek = dayOfWeek ? dayOfWeek - 1 : 6;
                    defaultSeriesWeek.forEach((series) => {
                        series.data[formatDayOfWeek] = ++series.data[formatDayOfWeek];
                    });
                });
                setSeries(defaultSeriesWeek);
                break;
            case 'month':
                const dayInMonth = dayjs(time).daysInMonth();
                const weekOfMonth = Math.ceil(dayInMonth / 7);
                const defaultSeriesMonths = [
                    {
                        name: 'Đơn hàng',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                    },
                ];
                data.forEach((value) => {
                    const createdAtNumber = +dayjs(value.appointmentSchedule).format('DD');
                    let idx = 0;
                    if (createdAtNumber > 7 && createdAtNumber <= 14) idx = 1;
                    if (createdAtNumber > 14 && createdAtNumber <= 21) idx = 2;
                    if (createdAtNumber > 21 && createdAtNumber <= 28) idx = 3;
                    if (createdAtNumber > 28) idx = 4;
                    defaultSeriesMonths.forEach((series) => {
                        series.data[idx] = ++series.data[idx];
                    });
                });
                setSeries(defaultSeriesMonths);
                break;
            case 'year':
                const defaultSeriesYear = [
                    {
                        name: 'Đơn hàng',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    },
                ];
                data.forEach((value) => {
                    const createdAtFormat = dayjs(value.appointmentSchedule).format('MM');
                    defaultSeriesYear.forEach((series) => {
                        series.data[createdAtFormat - 1] = ++series.data[createdAtFormat - 1];
                    });
                });
                setSeries(defaultSeriesYear);
                break;
            default:
                const defaultSeriesOptions = [
                    {
                        name: 'Đơn hàng',
                        data: [0],
                    },
                ];
                data.forEach((value) => {
                    defaultSeriesOptions.forEach((series) => {
                        series.data[0] = ++series.data[0];
                    });
                });
                setSeries(defaultSeriesOptions);
        }
    };
    useEffect(() => {
        if (time && showroomId) {
            getTotalOrderByOptions({ time, showroomId, type })
                .then(({ data }) => {
                    setData(data);
                })
                .catch((err) => {
                    console.log('getTotalOrderByOptions-err-status', err);
                });
        }
    }, [time, showroomId, type]);
    return (
        <Fragment>
            <ShowroomPicker onChangeShowroom={setShowroomId} />
            <div className="rounded border border-solid border-inherit p-6 my-4">
                <div className="flex justify-between items-center pb-4">
                    <div span={12}>
                        <h3 className="font-bold text-lg">Số lượng đơn hàng</h3>
                    </div>
                    <div span={12}>
                        <DatePickerByOptions onChange={setTime} setType={setType} />
                    </div>
                </div>
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            colors: ['#02b875'],
                            chart: {
                                type: 'column',
                                marginBottom: 100,
                            },
                            title: {
                                text: null,
                                align: 'left',
                            },
                            xAxis: {
                                categories,
                            },
                            yAxis: {
                                allowDecimals: false,
                                min: 0,
                                title: {
                                    text: null,
                                },
                                // stackLabels: {
                                //     enabled: true,
                                //     style: {
                                //         fontWeight: 'bold',
                                //         color:
                                //             // theme
                                //             (Highcharts.defaultOptions.title.style &&
                                //                 Highcharts.defaultOptions.title.style.color) ||
                                //             'gray',
                                //         textOutline: 'none',
                                //     },
                                // },
                            },
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                x: 0,
                                y: 0,
                                floating: true,
                                backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
                                borderColor: '#CCC',
                                borderWidth: 1,
                                shadow: false,
                            },
                            tooltip: {
                                headerFormat: '<b>{point.x}</b><br/>',
                                pointFormat: '{series.name}: {point.y}<br/>Tổng đơn hàng: {point.stackTotal}',
                            },
                            plotOptions: {
                                column: {
                                    stacking: 'normal',
                                },
                            },
                            series,
                        }}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default TotalOrderStatistical;
