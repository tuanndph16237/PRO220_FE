import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '../constants/format';
const HourPicker = (props) => {
    const [toggle, setToggle] = useState(false);
    const [tab, setTab] = useState(1);
    const [hour, setHour] = useState('8:00');

    const checkDisabledHourByDatePicker = (h) => {
        const datePresent = dayjs().format(DATE_FORMAT);
        const datePicker = dayjs(props.datePicker).format(DATE_FORMAT);
        if (datePresent !== datePicker) return false;
        const hourPresent = dayjs().format('HH');
        if (h <= hourPresent) return true;
        return false;
    };

    const handleSetHour = (value) => {
        setHour(value);
        setToggle(false);
        props.onChange(value);
    };
    return (
        <div>
            <Input
                size="larger"
                className="relative text-base border-[#02b875] w-full py-2"
                placeholder="Giờ"
                value={hour}
                onClick={() => setToggle(!toggle)}
            />
            {toggle && (
                <div className="absolute min-w-96 z-10 p-6 w-96 bg-[#fff]">
                    <Row gutter={16} wrap>
                        <Col span={12}>
                            <button
                                type="button"
                                className={`${tab === 1 ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                onClick={() => setTab(1)}
                            >
                                Sáng
                            </button>
                        </Col>
                        <Col span={12}>
                            <button
                                type="button"
                                className={`${tab === 2 ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                onClick={() => setTab(2)}
                            >
                                Chiều
                            </button>
                        </Col>
                    </Row>
                    {tab === 1 && (
                        <div className="mt-6">
                            <Row gutter={8} wrap>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(8)}
                                        type="button"
                                        className={`${hour === '8:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('8:00')}
                                    >
                                        8:00
                                    </button>
                                </Col>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(9)}
                                        type="button"
                                        className={`${hour === '9:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('9:00')}
                                    >
                                        9:00
                                    </button>
                                </Col>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(10)}
                                        type="button"
                                        className={`${hour === '10:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('10:00')}
                                    >
                                        10:00
                                    </button>
                                </Col>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(11)}
                                        type="button"
                                        className={`${hour === '11:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('11:00')}
                                    >
                                        11:00
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    )}
                    {tab === 2 && (
                        <div className="mt-6">
                            <Row gutter={8} wrap>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(13)}
                                        type="button"
                                        className={`${hour === '13:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('13:00')}
                                    >
                                        13:00
                                    </button>
                                </Col>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(14)}
                                        type="button"
                                        className={`${hour === '14:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('14:00')}
                                    >
                                        14:00
                                    </button>
                                </Col>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(15)}
                                        type="button"
                                        className={`${hour === '15:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('15:00')}
                                    >
                                        15:00
                                    </button>
                                </Col>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(16)}
                                        type="button"
                                        className={`${hour === '16:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('16:00')}
                                    >
                                        16:00
                                    </button>
                                </Col>
                                <Col span={6}>
                                    <button
                                        disabled={checkDisabledHourByDatePicker(17)}
                                        type="button"
                                        className={`${hour === '17:00' ? 'btn-primary' : 'bg-slate-50'} w-full h-10
                                font-medium rounded-lg text-sm text-center`}
                                        onClick={() => handleSetHour('17:00')}
                                    >
                                        17:00
                                    </button>
                                </Col>
                            </Row>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default HourPicker;
