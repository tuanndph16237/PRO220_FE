import React, { useState, useEffect } from 'react';
import { Select, Col, InputNumber, Row, Slider } from 'antd';
import { getExchangePart } from '../../../api/warehouse';

const Exchange = ({ idShowroom, materialId, getValueShowroom, getInputValue }) => {
    const [inputValue, setInputValue] = useState(0);
    const [title, setTitle] = useState('chọn showroom - warehouse');
    const [data, setData] = useState([]);
    const [max, setMax] = useState(0);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        fetchDataWarehouse({ idShowroom, materialId: materialId.id });
        return () => {
            setTitle('chọn showroom - warehouse');
            setInputValue(0);
            setMax(0);
        };
    }, [materialId]);

    const fetchDataWarehouse = async (clientReq) => {
        const { data } = await getExchangePart(clientReq);
        const handleOption = data?.dataFilter?.map((item) => {
            return {
                label: `${item.name} - ${item.province}`,
                value: item.idShowroom,
            };
        });
        setData(data?.dataFilter);
        setOptions(handleOption);
    };

    const handleSelect = (idShowroom) => {
        const selectWarehouse = data.find((item) => item.idShowroom == idShowroom);
        setInputValue(selectWarehouse.quantity);
        setMax(selectWarehouse.quantity);
        getValueShowroom({
            type: 'UPDATE_SHOWROOM_EXCHANGE',
            payload: { idShowroomExchange: idShowroom, max: selectWarehouse.quantity },
        });
    };

    const onChange = (newValue) => {
        setInputValue(newValue);
        getInputValue({ type: 'UPDATE_QUANTITY_CHANGE', payload: { quantityCurrentChange: newValue } });
    };
    return (
        <div>
            <Select
                className="mt-5"
                style={{
                    width: '90%',
                }}
                onChange={(value) => {
                    handleSelect(value);
                    setTitle(value);
                }}
                placeholder="chọn showroom - warehouse"
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                value={title}
                options={options}
            />
            <Row className="my-4">
                <Col span={16}>
                    <Slider max={max} disabled={max == 0 ? true : false} value={inputValue} onChange={onChange} />
                </Col>
                <Col span={4}>
                    <InputNumber
                        min={0}
                        max={max}
                        style={{ margin: '0 16px' }}
                        value={inputValue}
                        onChange={onChange}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Exchange;
