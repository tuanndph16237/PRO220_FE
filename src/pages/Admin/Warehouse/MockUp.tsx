import { InputNumber, Table } from 'antd';
import React from 'react';

const MockUp = ({ handle, dataSelect }) => {
    const onChange = (value) => {
        handle({ idMaterial: dataSelect.idMaterial, quantity: value });
    };
    const columns = [
        { title: 'Tên vật tư', dataIndex: 'name', key: '_id' },
        { title: 'Đơn vị tính', dataIndex: 'unit', key: '_id' },
        { title: 'Số lương', dataIndex: 'quantity', key: '_id' },
    ];

    return (
        <div>
            <Table pagination={false} columns={columns} dataSource={[dataSelect]} />
            <div className="flex justify-between my-3">
                <p>Thực hiện tăng hoặc giảm số lượng hiện tại</p>
                <InputNumber min={0} value={dataSelect?.quantity} onChange={onChange} />
            </div>
        </div>
    );
};

export default MockUp;
