import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import _ from 'lodash';
import DatePickerByOptions from '../../../../components/Customs/DatePickerByOptions';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { getTotalOrderByOptions } from '../../../../api/order';
import { setCategoriesByType } from '../../../../utils/statistical';
import { Fragment } from 'react';
import ShowroomPicker from '../../../../components/ShowroomPicker';
import PermissionCheck from '../../../../components/permission/PermissionCheck';
import { PERMISSION_LABLEL, PERMISSION_TYPE } from '../../../../constants/permission';

const defaultSeries = [
    {
        name: 'Hủy đơn hàng',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        status: 0,
    },
    {
        name: 'Chờ xác nhận',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        status: 1,
    },
    {
        name: 'Đã xác nhận',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        status: 2,
    },
    {
        name: 'Đang xử lý',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        status: 3,
    },
    {
        name: 'Thanh toán',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        status: 4,
    },
    {
        name: 'Hoàn thành',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        status: 5,
    },
];
const TotalOrderStatisticalByStatus = (props) => {
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
                        name: 'Hủy đơn hàng',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 0,
                    },
                    {
                        name: 'Chờ xác nhận',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 1,
                    },
                    {
                        name: 'Đã xác nhận',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 2,
                    },
                    {
                        name: 'Đang xử lý',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 3,
                    },
                    {
                        name: 'Thanh toán',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 4,
                    },
                    {
                        name: 'Hoàn thành',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 5,
                    },
                ];
                data.forEach((value) => {
                    const hour = dayjs(value.createdAt).hour();
                    defaultSeriesClone.forEach((series) => {
                        if (series.status === value.status) {
                            series.data[hour] = ++series.data[hour];
                        }
                    });
                });
                setSeries(defaultSeriesClone);
                break;
            case 'week':
                const defaultSeriesWeek = [
                    {
                        name: 'Hủy đơn hàng',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        status: 0,
                    },
                    {
                        name: 'Chờ xác nhận',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        status: 1,
                    },
                    {
                        name: 'Đã xác nhận',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        status: 2,
                    },
                    {
                        name: 'Đang xử lý',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        status: 3,
                    },
                    {
                        name: 'Thanh toán',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        status: 4,
                    },
                    {
                        name: 'Hoàn thành',
                        data: [0, 0, 0, 0, 0, 0, 0],
                        status: 5,
                    },
                ];
                data.forEach((value) => {
                    const dayOfWeek = dayjs(value.createdAt).day();
                    const formatDayOfWeek = dayOfWeek ? dayOfWeek - 1 : 6;
                    defaultSeriesWeek.forEach((series) => {
                        if (series.status === value.status) {
                            series.data[formatDayOfWeek] = ++series.data[formatDayOfWeek];
                        }
                    });
                });
                setSeries(defaultSeriesWeek);
                break;
            case 'month':
                const dayInMonth = dayjs(time).daysInMonth();
                const weekOfMonth = Math.ceil(dayInMonth / 7);
                const defaultSeriesMonths = [
                    {
                        name: 'Hủy đơn hàng',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                        status: 0,
                    },
                    {
                        name: 'Chờ xác nhận',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                        status: 1,
                    },
                    {
                        name: 'Đã xác nhận',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                        status: 2,
                    },
                    {
                        name: 'Đang xử lý',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                        status: 3,
                    },
                    {
                        name: 'Thanh toán',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                        status: 4,
                    },
                    {
                        name: 'Hoàn thành',
                        data: weekOfMonth === 4 ? [0, 0, 0, 0] : [0, 0, 0, 0, 0],
                        status: 5,
                    },
                ];
                data.forEach((value) => {
                    const createdAtNumber = +dayjs(value.createdAt).format('DD');
                    let idx = 0;
                    if (createdAtNumber > 7 && createdAtNumber <= 14) idx = 1;
                    if (createdAtNumber > 14 && createdAtNumber <= 21) idx = 2;
                    if (createdAtNumber > 21 && createdAtNumber <= 28) idx = 3;
                    if (createdAtNumber > 28) idx = 4;
                    defaultSeriesMonths.forEach((series) => {
                        if (series.status === value.status) {
                            series.data[idx] = ++series.data[idx];
                        }
                    });
                });
                setSeries(defaultSeriesMonths);
                break;
            case 'year':
                const defaultSeriesYear = [
                    {
                        name: 'Hủy đơn hàng',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 0,
                    },
                    {
                        name: 'Chờ xác nhận',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 1,
                    },
                    {
                        name: 'Đã xác nhận',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 2,
                    },
                    {
                        name: 'Đang xử lý',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 3,
                    },
                    {
                        name: 'Thanh toán',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 4,
                    },
                    {
                        name: 'Hoàn thành',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        status: 5,
                    },
                ];
                data.forEach((value) => {
                    const createdAtFormat = dayjs(value.createdAt).format('MM');
                    defaultSeriesYear.forEach((series) => {
                        if (series.status === value.status) {
                            series.data[createdAtFormat - 1] = ++series.data[createdAtFormat - 1];
                        }
                    });
                });
                setSeries(defaultSeriesYear);
                break;
            default:
                const defaultSeriesOptions = [
                    {
                        name: 'Hủy đơn hàng',
                        data: [0],
                        status: 0,
                    },
                    {
                        name: 'Chờ xác nhận',
                        data: [0],
                        status: 1,
                    },
                    {
                        name: 'Đã xác nhận',
                        data: [0],
                        status: 2,
                    },
                    {
                        name: 'Đang xử lý',
                        data: [0],
                        status: 3,
                    },
                    {
                        name: 'Thanh toán',
                        data: [0],
                        status: 4,
                    },
                    {
                        name: 'Hoàn thành',
                        data: [0],
                        status: 5,
                    },
                ];
                data.forEach((value) => {
                    defaultSeriesOptions.forEach((series) => {
                        if (series.status === value.status) {
                            series.data[0] = ++series.data[0];
                        }
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
            {/* <PermissionCheck
                permissionHas={{ label: PERMISSION_LABLEL.STATISTICS, code: PERMISSION_TYPE.UPDATE }}
            >
             <ShowroomPicker onChangeShowroom={setShowroomId} />
            </PermissionCheck> */}
            <ShowroomPicker onChangeShowroom={setShowroomId} />

            <div className="rounded border border-solid border-inherit p-6 my-4">
                <div className="flex justify-between items-center pb-4">
                    <div span={12}>
                        <h3 className="font-bold text-lg">Số lượng đơn hàng theo trạng thái</h3>
                    </div>
                    <div span={12}>
                        <DatePickerByOptions onChange={setTime} setType={setType} />
                    </div>
                </div>
                <div>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={{
                            colors: ['#ff4d4f', '#10A19D', '#6C4AB6', '#2146C7', '#FED049', '#02b875'],
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

export default TotalOrderStatisticalByStatus;
