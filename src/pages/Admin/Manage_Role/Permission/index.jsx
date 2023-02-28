import React from 'react';
import ShowDrawer from './ShowDrawer';
import { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';

const data = [
    {
        key: '1',
        name: 'John Brown',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        tags: ['cool', 'teacher'],
    },
];

const index = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');
    const OpenShowDrawer = () => {
        setOpen(true);
        setAction('Created');
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined
                        onClick={() => {
                            setAction('Edit');
                            setOpen(true);
                        }}
                    />
                </Space>
            ),
        },
    ];
    return (
        <div>
            {' '}
            <div>
                <button
                    type="button"
                    onClick={() => OpenShowDrawer()}
                    className="focus:outline-none h-10 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5"
                >
                    <PlusOutlined className="pr-2 text-white " />
                    Thêm
                </button>
                <>
                    <Table columns={columns} dataSource={data} />;
                    <ShowDrawer
                        open={open}
                        onClose={(data) => {
                            setOpen(data.open);
                            setAction(data.action);
                        }}
                        action={action}
                    />
                </>
            </div>
        </div>
    );
};

export default index;
