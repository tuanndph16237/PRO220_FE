import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Tag, Spin, Button, Tooltip } from 'antd';
import { EditOutlined, PlusOutlined, SyncOutlined } from '@ant-design/icons';
import DrawerCreateRole from './DrawerCreateRole';
import { getAllRoleAsync } from '../../../../slices/role';
import { isEmpty } from 'lodash';
import Filter from '../../../../components/Filter/Filter';
const index = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');
    const [data, setData] = useState([]);
    const [showroomsFilter, setShowroomsFilter] = useState([]);
    const [id, setId] = useState('');
    const Role = useSelector((state) => state.role.valueRole);
    const Loading = useSelector((state) => state.role.loading);
    const datas = useRef([]);
    const dispatch = useDispatch();
    const OpenShowDrawer = () => {
        setOpen(true);
        setAction('Create');
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
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
                            setId(record);
                        }}
                    />
                </Space>
            ),
        },
    ];
    useEffect(() => {
        (() => {
            dispatch(getAllRoleAsync());
        })();
    }, []);
    useEffect(() => {
        (() => {
            let showdata = Role.map((item, index) => {
                return {
                    key: item.id,
                    name: item.name,
                    tags: ['cool', 'teacher'],
                };
            });
            const newData = showdata.filter((item) => item.name !== 'Admin');
            datas.current = newData;
            setData(newData);
            setShowroomsFilter(newData.map((item) => ({ label: item.name, value: item.key })));
        })();
    }, [Role]);
    const handleFilter = (values) => {
        if (values.nameId.length == 0) {
            setData(datas.current);
        } else {
            setData(datas.current.filter((item) => values.nameId.includes(item.key)));
        }
    };
    const handleFilters = () => {
        setData(datas.current);
    };
    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <Button onClick={() => OpenShowDrawer()} className="btn-primary text-white mr-5" type="primary">
                        Thêm vai trò
                    </Button>
                    <button className="pr-6" onClick={() => handleFilters()}>
                        <Tooltip title="Làm mới đơn hàng">
                            <SyncOutlined style={{ fontSize: '18px', color: '#000' }} />
                        </Tooltip>
                    </button>
                    <Filter
                        items={[
                            {
                                label: <Space align="center">Tên Quyền</Space>,
                                key: 'nameId',
                                type: 'select',
                                mode: 'multiple',
                                values: showroomsFilter,
                                name: 'Tên Quyền....',
                            },
                        ]}
                        onFilter={handleFilter}
                    />
                </div>
                <p className="p-5">
                    Số lượng: <span className="font-bold">{data?.length}</span>
                </p>
            </div>
            <>
                <Spin spinning={Loading}>
                    <Table columns={columns} dataSource={data} />
                    <DrawerCreateRole
                        open={open}
                        onClose={(data) => {
                            setOpen(data.open);
                            setAction(data.action);
                        }}
                        action={action}
                        id={!isEmpty(id) ? id : ''}
                    />
                </Spin>
            </>
        </div>
    );
};

export default index;
