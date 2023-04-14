import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _, { isEmpty } from 'lodash';
import { EditOutlined, SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Input, Space, Table, Button, Spin, Tooltip, Switch } from 'antd';
import './showroom.css';
import { getAllShowroomAsync } from '../../../slices/showroom';
import Highlighter from 'react-highlight-words';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { getDistrict } from '../../../api/district';
// import Filter from '../../../../components/Filter/Filter';
import { getShowroomById, updateShowroom } from '../../../api/showroom';
import { JwtDecode } from '../../../utils/auth';
import Filter from '../../../components/Filter/Filter';
import PermissionCheck from '../../../components/permission/PermissionCheck';
import { PERMISSION_LABLEL, PERMISSION_TYPE } from '../../../constants/permission';

const ShowRoom = () => {
    useDocumentTitle('Quản lý cửa hàng');
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const loadding = useSelector((state) => state.showroom.showrooms.loading);
    const account = useSelector((state) => state.user.currentUser.values);
    const roleAccount = account.role;
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [zone, setZone] = useState([]);
    const [showroomAccount, setShowroomAccount] = useState();
    const [showroomsFilter, setShowroomsFilter] = useState([]);
    const local = JwtDecode();

    const fetchApiShowroomAccount = async () => {
        try {
            const { data } = await getShowroomById(local.showroomId);
            const datas = {
                ...data,
                key: data._id,
            };
            setShowroomAccount([datas]);
        } catch (error) {}
    };

    const fetchApiDistrict = async () => {
        try {
            const dataDistrict = await getDistrict();
            setZone(dataDistrict.data);
        } catch (error) {}
    };

    const handleStopShowroom = async (id, checked) => {
        await updateShowroom({ id: id, enabled: checked });
        if (local.role == 'Admin') {
            setTimeout(() => dispatch(getAllShowroomAsync()), 100);
        } else {
            setTimeout(() => dispatch(fetchApiShowroomAccount()), 100);
        }
    };

    useEffect(() => {
        fetchApiDistrict();
    }, []);
    useEffect(() => {
        if (showrooms.length > 0) {
            const data = showrooms.map((showroom) => ({ ...showroom, key: showroom._id }));
            setShowroomAccount(data);
            setShowroomsFilter(data.map((item) => ({ label: item.name, value: item.key })));
        }
    }, [showrooms]);
    useEffect(() => {
        if (local.role == 'Admin') {
            dispatch(getAllShowroomAsync());
        } else {
            fetchApiShowroomAccount();
        }
    }, []);

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
            title: 'Trạng thái hoạt động',
            dataIndex: '',
            // align: 'center',
            render: (value) => {
                return (
                    <>
                        <PermissionCheck
                            permissionHas={{ label: PERMISSION_LABLEL.SHOWROOM_MANAGE, code: PERMISSION_TYPE.UPDATE }}
                        >
                            <Switch
                                checked={value?.enabled}
                                onChange={(checked) => {
                                    handleStopShowroom(value._id, checked);
                                }}
                            />
                        </PermissionCheck>

                        {value?.enabled ? (
                            <p className="py-1 text-[#02b875]">Đang hoạt động </p>
                        ) : (
                            <p className="py-1 text-[#3b3d3c]">Đã dừng hoạt động </p>
                        )}
                    </>
                );
            },
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
            title: 'Cửa hàng tại',
            dataIndex: 'districtId',
            render: (districtId) => _.get(_.find(zone, ['_id', districtId]), 'name', ''),
        },
        {
            title: '',
            render: (data) => {
                return (
                    <PermissionCheck
                        permissionHas={{ label: PERMISSION_LABLEL.SHOWROOM_MANAGE, code: PERMISSION_TYPE.UPDATE }}
                    >
                        <Link to={data._id}>
                            <EditOutlined className="text-xl pr-4" />
                        </Link>
                    </PermissionCheck>
                );
            },
        },
    ];
    const handleFilter = (values) => {
        if (values.nameId.length == 0) {
            setShowroomAccount(showrooms);
        } else {
            const arrFilter = [];
            showrooms.forEach((item) => {
                if (values.nameId.includes(item._id)) {
                    arrFilter.push({
                        key: item._id,
                        ...item,
                    });
                }
            });
            setShowroomAccount(arrFilter);
        }
    };
    const handleFilters = () => {
        setShowroomAccount(showrooms);
    };
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
                    <div className="flex justify-between">
                        <div>
                            <button className="pr-6" onClick={() => handleFilters()}>
                                <Tooltip title="Làm mới cửa hàng">
                                    <SyncOutlined style={{ fontSize: '18px', color: '#000' }} />
                                </Tooltip>
                            </button>
                            <Filter
                                items={[
                                    {
                                        label: <Space align="center">Tên Cửa Hàng</Space>,
                                        key: 'nameId',
                                        type: 'select',
                                        mode: 'multiple',
                                        values: showroomsFilter,
                                        name: 'Tên Cửa Hàng....',
                                    },
                                ]}
                                onFilter={handleFilter}
                            />
                        </div>
                        <p className="p-5">
                            Số lượng: <span className="font-bold">{showroomAccount?.length}</span>
                        </p>
                    </div>
                    <Table columns={columns} dataSource={showroomAccount} rowKey="key" />
                </>
            )}
        </div>
    );
};

export default ShowRoom;
