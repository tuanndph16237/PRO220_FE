import React, { useState } from 'react';
import { Input } from 'antd';
const TextStringFilter = (props) => {
    const [text, setText] = useState('');
    return (
        <div className="input-string-filter">
            <Input
                value={text}
                placeholder={`Tìm kiếm ${props.placeholder || ''}`}
                enterButton="Tìm kiếm"
                onChange={(e) => {
                    setText(e.target.value);
                    props.onChange(e.target.value);
                }}
            />
        </div>
    );
};

export default TextStringFilter;
