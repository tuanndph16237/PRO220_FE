import { DatePicker, Select, Space, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DATE_FORMAT } from '../../constants/format';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
const { RangePicker } = DatePicker;
const { Option } = Select;
const PickerWithType = ({ type, onChange }) => {
    if (type === 'date') return <DatePicker locale={locale} onChange={onChange} />;
    if (type === 'options') return <RangePicker locale={locale} onChange={onChange} />;
    return <DatePicker locale={locale} picker={type} onChange={onChange} />;
};
const DatePickerByOptions = (props) => {
    const [type, setType] = useState('date');
    return (
        <Space>
            <Select
                style={{ minWidth: 130 }}
                value={type}
                onChange={(value) => {
                    setType(value, props.setType(value));
                }}
            >
                <Option value="date">Ngày</Option>
                <Option value="week">Tuần</Option>
                <Option value="month">Tháng</Option>
                <Option value="year">Năm</Option>
                <Option value="options">Tùy chọn</Option>
            </Select>
            <PickerWithType type={type} onChange={props.onChange} />
        </Space>
    );
};
export default DatePickerByOptions;
