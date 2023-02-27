import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Space, Table, Button, Spin, Tooltip } from 'antd';
import './showroom.css';
import { getAllShowroomAsync } from '../../../slices/showroom';
import Highlighter from 'react-highlight-words';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { getDistrict } from '../../../api/district';
import { ROLE } from '../../../constants/auth';
import { getShowroomById } from '../../../api/showroom';
import { JwtDecode } from '../../../utils/auth';

const ShowRoom = () => {
    useDocumentTitle('Quản lý cửa hàng');
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const loadding = useSelector((state) => state.showroom.showrooms.loading);
    const account = useSelector((state) => state.user.currentUser.values);
    const roleAccount = account.role;
    const data = showrooms.map((showroom) => ({ ...showroom, key: showroom._id }));
    const [reload, setReload] = useState({
        reload: false,
    });
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [zone, setZone] = useState([]);
    const [showroomAccount, setShowroomAccount] = useState({});
    const local = JwtDecode();

    const fetchApiShowroomAccount = async () => {
        try {
            const dataShowroomAccount = await getShowroomById(local.showroomId);
            setShowroomAccount(dataShowroomAccount.data);
            console.log(dataShowroomAccount.data.name);
        } catch (error) {}
    };

    useEffect(() => {
        fetchApiShowroomAccount();
    }, []);

    const fetchApiDistrict = async () => {
        try {
            const dataDistrict = await getDistrict();
            setZone(dataDistrict.data);
        } catch (error) {}
    };

    useEffect(() => {
        fetchApiDistrict();
    }, []);

    useEffect(() => {
        dispatch(getAllShowroomAsync());
    }, [reload]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
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
                            close();
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
            title: 'Tên cửa hàng',
            dataIndex: 'name',
            key: 'name',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('name'),
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: 'Kho ảnh',
            render: (url) => (
                // <a target="_blank" href={url} className="text-[#02b875]">
                //     <img src={url} alt="" />
                // </a>
                <p>comming soon</p>
            ),
        },
        {
            title: 'Địa điểm',
            dataIndex: 'address',
            key: 'address',
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('address'),
            render: (address) => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            ),
        },
        {
            title: 'Liên hệ',
            dataIndex: 'phone',
        },
        {
            title: 'Cửa hàng',
            dataIndex: 'districtId',
            render: (districtId) => _.get(_.find(zone, ['_id', districtId]), 'name', ''),
        },
        {
            title: '',
            render: (data) => {
                return (
                    <Link to={data._id}>
                        <EditOutlined className="text-xl pr-4" />
                    </Link>
                );
            },
        },
    ];

    return (
        <div className="banner-content">
            {loadding ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <>
                    {roleAccount == ROLE.ADMIN ? (
                        <Table columns={columns} dataSource={data} />
                    ) : (
                        <div>
                            <h1 className="text-2xl">
                                <b>Tên Showroom:</b> {showroomAccount.name}
                            </h1>
                            <br></br>
                            <h1 className="text-2xl">
                                <b>Số điện thoại:</b> {showroomAccount.phone}
                            </h1>
                            <br></br>
                            <h1 className="text-2xl">
                                <b>Địa chỉ:</b> {showroomAccount.address}
                            </h1>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ShowRoom;
