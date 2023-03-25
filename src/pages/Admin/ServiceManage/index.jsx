import { DownOutlined } from '@ant-design/icons';
import { Badge, Dropdown, Space, Table, Button } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';

const ServiceManager = () => {
    useDocumentTitle('Quản lý dịch vụ');

    const expandedRowRender = () => {
        const columns = [
            { title: 'Loại dịch vụ', dataIndex: 'typename', key: 'typename' },
            { title: 'Phụ phí', dataIndex: 'fee', key: 'fee' },
        ];

        const data = [];
        for (let i = 0; i < 3; ++i) {
            data.push({
                key: i.toString(),
                typename: 'Thay Xăm',
                fee: 50000,
            });
        }
        return <Table columns={columns} dataSource={data} pagination={false} />;
    };

    const columns = [
        { title: 'Dịch vụ', dataIndex: 'name', key: 'name' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
        {
            title: 'Action',
            key: 'operation',
            render: (record, index) => {
                return (
                    <Space size="middle">
                        <Link to={`/admin/sua-dich-vu/${record.key}`}>Update</Link>

                        <Button
                            type="primary"
                            onClick={() => {
                                console.log(record.key);
                            }}
                            danger
                        >
                            Delete
                        </Button>
                    </Space>
                );
            },
        },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            name: 'Sửa chửa tai cửa hàng',
            createdAt: '2014-12-24 23:12:00',
        });
    }

    return (
        <>
            <Table columns={columns} expandable={{ expandedRowRender }} dataSource={data} />
        </>
    );
};

export default ServiceManager;
