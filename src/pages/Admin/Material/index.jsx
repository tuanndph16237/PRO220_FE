import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { notification, Table, Row, Select, Input, Space, Button, Tooltip } from 'antd';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { searchMaterial } from '../../../api/material';
import { NOTIFICATION_TYPE } from '../../../constants/status';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const MaterialManage = () => {
    useDocumentTitle('Quản lý material');
    const [optionFilter, setOptionFilter] = useState(1);
    const [data, setData] = useState([]);
    let searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        filterMaterial(optionFilter);
    }, [optionFilter]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        console.log(dataIndex, selectedKeys);
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const filterMaterial = async (value) => {
        try {
            const { data } = await searchMaterial({ value: value });
            setData(data.map((item, index) => ({ ...item, key: index })));
        } catch (error) {
            noti(NOTIFICATION_TYPE.ERROR, `tìm kiếm dữ liệu lỗi`);
        }
    };

    const dataFilter = [
        {
            value: 2,
            label: 'dưới 100,000 VNĐ',
        },
        {
            value: 3,
            label: 'giá giảm dần',
        },
        {
            value: 7,
            label: 'giá tăng dần',
        },
        {
            value: 6,
            label: 'từ 100,000 VNĐ - 500,000 VNĐ',
        },
        {
            value: 4,
            label: 'dưới 1,000,000 VNĐ',
        },
        {
            value: 5,
            label: 'trên 1,000,000 VNĐ',
        },
        {
            value: 1,
            label: 'tất cả vật tư',
        },
    ];

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`tìm kiếm tên vật tư`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            clearFilters();
                            handleSearch(selectedKeys, confirm, dataIndex);
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),

        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: 'Giá thành',
            dataIndex: 'price',
            render: (value) => {
                return value.toLocaleString('en') + ' VNĐ';
            },
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (url) => (
                <a target="_blank" href={url} className="text-[#02b875]">
                    <img src={url} alt="" className="w-36 h-32" />
                </a>
            ),
        },
        {
            title: '',
            render: (data) => {
                return (
                    <Row>
                        <Link to={data._id}>
                            <EditOutlined className="text-xl pr-4" />
                        </Link>
                    </Row>
                );
            },
        },
    ];

    return (
        <>
            <div className="flex items-center justify-between mb-4 ">
                <div className="flex">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/them-vat-tu')}
                        className="focus:outline-none p-2 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-2"
                    >
                        <PlusOutlined className="pr-2 text-white " />
                        Thêm
                    </button>
                    <div className="px-3">
                        <Select
                            showSearch
                            style={{
                                width: 300,
                            }}
                            size={'large'}
                            placeholder="bộ lọc theo giá"
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            onSelect={(value) => setOptionFilter(value)}
                            options={dataFilter}
                        />
                    </div>
                </div>
                <p>
                    Số lượng: <span className="font-bold">{data.length}</span>
                </p>
            </div>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default MaterialManage;
