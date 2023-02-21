import React, { useState } from 'react';
import { Select } from 'antd';

const SelectFilter = (props) => {
    const [values, setValues] = useState([]);
    const handleChange = (value) => {
        props.onChange(value);
        setValues(value);
    };
    return (
        <Select
            value={values}
            mode={props.mode || 'tags'}
            placeholder={`Chọn ${props.placeholder}`}
            defaultValue={values}
            onChange={handleChange}
            style={{ minWidth: 197 }}
            options={props.values}
        />
    );
};

export default SelectFilter;
