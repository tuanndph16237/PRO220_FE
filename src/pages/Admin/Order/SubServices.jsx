import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

const SubServices = ({ statusOrder, value, handleValue, dataSource }) => {
    return (
        <Checkbox.Group
            className="w-full"
            disabled={statusOrder == 3 ? false : true}
            onChange={(value) => handleValue(value)}
            defaultValue={value}
        >
            <Row>
                {dataSource.map((dataItem, index) => (
                    <Col span={8} key={index}>
                        <Checkbox value={dataItem._id}>{dataItem.name}</Checkbox>
                    </Col>
                ))}
            </Row>
        </Checkbox.Group>
    );
};

export default SubServices;
