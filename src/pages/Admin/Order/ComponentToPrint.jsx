import React from 'react';
import { Table } from 'antd';

const ComponentToPrint = () => {
    const columns = [
        {
            title: 'Tên vật tư',
            dataIndex: 'name',
        },
        {
            title: 'Số lượng',
            className: 'column-money',
            dataIndex: 'qty',
            align: 'right',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
        },
    ];

    const data = [
        {
            key: '1',
            name: 'Bugi',
            qty: '1',
            price: '10.000',
        },
        {
            key: '2',
            name: 'Lốp trước',
            qty: '1',
            price: '300.000',
        },
        {
            key: '3',
            name: 'Má phanh',
            qty: '1',
            price: '70.000',
        },
    ];

    return (
        <div>
            <p className="text-center font-bold text-[16px]">Hệ thống sữa chữa xe máy Dodoris</p>
            <p className="text-center">Địa chỉ: 191 Phạm Văn Đông, Xuân Đỉnh, Bắc Từ Liêm, Hà Nội</p>
            <p>
                khách hàng: <span className="font-bold">Huy Cắt Moi</span>
            </p>
            <p>Số DT: 08754654646</p>
            <p>Dịch vụ: sữa chữa tại cửa hàng</p>
            <p className="mb-3">
                Thời gian: <span>9h80 / 30-04-2023</span>
            </p>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                title={() => <p className="font-bold">Vật tư</p>}
                pagination={false}
            />
            <div className="my-3 w-full">
                <div className="flex gap-10">
                    <p>Tổng</p>
                    <p>
                        <span className="font-bold"> 380.000</span> vnd
                    </p>
                </div>
                <div className="flex gap-10">
                    <p>Giảm giá</p>
                    <p>
                        <span className="font-bold"> 0</span> vnd
                    </p>
                </div>
                <div className="flex gap-10">
                    <p>phí dịch vụ</p>
                    <p>
                        <span className="font-bold"> 0</span> vnd
                    </p>
                </div>
                <div className="flex gap-10">
                    <p>Tổng Thanh Toán</p>
                    <p>
                        <span className="font-bold text-red-600"> 380.000</span> vnd
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComponentToPrint;
