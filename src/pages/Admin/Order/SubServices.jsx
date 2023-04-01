import React, { useState } from 'react';
import { Checkbox, Col, Row } from 'antd';

const SubServices = ({ value, setValue }) => {
    const onChange = (checkedValues) => {
        setValue(checkedValues);
    };
    return (
        <Checkbox.Group className="w-full" onChange={(value) => onChange(value)} defaultValue={value}>
            <Row>
                <Col span={8}>
                    <Checkbox value="A">Bão dưỡng toàn bộ</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="B">Vệ sinh kim phun</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="C">Vệ sinh lọc gió</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="D">Vệ sinh buồng đốt</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="E">Vệ sinh nồi xe</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="F">Vệ sinh sện xe</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="G">Vệ sinh Pô xe</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="H">Vệ sinh bình xăng</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="L">Rửa xe</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="M">Thay dầu</Checkbox>
                </Col>
                <Col span={8}>
                    <Checkbox value="K">Cứu hộ xe</Checkbox>
                </Col>
            </Row>
        </Checkbox.Group>
    );
};

export default SubServices;
