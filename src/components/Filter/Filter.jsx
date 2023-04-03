import { useState } from 'react';
import { Button, Dropdown, Space } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import TextStringFilter from './TextStringFilter';
import SelectFilter from './SelectFilter';
import DatePickerByOptions from '../Customs/DatePickerByOptions';

const Filter = ({ items, onFilter }) => {
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [valuesSearch, setValuesSearch] = useState({});
    const handleClick = ({ key }) => {
        const selected = selectedKeys.includes(key);
        if (selected) {
            const newSelectedKeys = selectedKeys.filter((items) => items !== key);
            setSelectedKeys(newSelectedKeys);
            const valuesSearchClone = { ...valuesSearch };
            delete valuesSearchClone[key];
            setValuesSearch(valuesSearchClone);
            return;
        }
        setSelectedKeys([...selectedKeys, key]);
    };
    const handleMergeValuesSearch = (field, value) => {
        const newValue = {};
        newValue[field] = value;
        setValuesSearch({
            ...valuesSearch,
            ...newValue,
        });
    };
    return (
        <Space align="start">
            <Dropdown
                menu={{
                    items,
                    onClick: handleClick,
                }}
                trigger={['click']}
            >
                <Button className="btn-primary text-white" type="primary">
                    Bộ lọc
                </Button>
            </Dropdown>
            <Space size={[8, 16]} wrap>
                {selectedKeys.map((key) => {
                    const values = items.find((item) => item.key === key);
                    switch (values.type) {
                        case 'select':
                            return (
                                <Space key={key}>
                                    <SelectFilter
                                        placeholder={values.name}
                                        mode={values.mode}
                                        values={values.values}
                                        onChange={(text) => handleMergeValuesSearch(values.key, text)}
                                    />
                                    <button onClick={() => handleClick({ key: values.key })}>
                                        <CloseCircleOutlined />
                                    </button>
                                </Space>
                            );
                        case 'date': {
                            return (
                                <Space key={key}>
                                    <span>{values.name} :</span>
                                    <DatePickerByOptions
                                        getTypeWhenOnChangeTime={true}
                                        onChange={(time, type) => handleMergeValuesSearch(values.key, { type, time })}
                                    />
                                    <button onClick={() => handleClick({ key: values.key })}>
                                        <CloseCircleOutlined />
                                    </button>
                                </Space>
                            );
                        }
                        default:
                            return (
                                <Space key={key}>
                                    <TextStringFilter
                                        placeholder={values.name}
                                        onChange={(text) => handleMergeValuesSearch(values.key, text)}
                                    />
                                    <button onClick={() => handleClick({ key: values.key })}>
                                        <CloseCircleOutlined />
                                    </button>
                                </Space>
                            );
                    }
                })}
                {selectedKeys.length > 0 && (
                    <Button className="btn-primary text-white" type="primary" onClick={() => onFilter(valuesSearch)}>
                        Lọc
                    </Button>
                )}
            </Space>
        </Space>
    );
};

export default Filter;
