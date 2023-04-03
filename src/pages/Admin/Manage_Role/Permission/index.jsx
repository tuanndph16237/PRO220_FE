import React, { useEffect } from 'react';
import ShowDrawer from './ShowDrawer';
import { useState } from 'react';
import { Button, Space, Spin, Table, Tooltip } from 'antd';
import { EditOutlined, SyncOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions } from '../../../../slices/role';
import { isEmpty } from 'lodash';
import Filter from '../../../../components/Filter/Filter';
import { hanldInput } from '../../../../utils/capotaliieFirstLetter';
import { useRef } from 'react';
const index = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');
    const [dataTree, setDataTree] = useState();
    const listPermission = useSelector((state) => state.role.valuePermission);
    const dispatch = useDispatch();
    const Loading = useSelector((state) => state.role.loading);
    const [id, setId] = useState('');
    const data = useRef([]);
    const [showroomsFilter, setShowroomsFilter] = useState([]);
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
    const OpenShowDrawer = () => {
        setOpen(true);
        setAction('Create');
    };
    useEffect(() => {
        (() => {
            dispatch(getPermissions());
        })();
    }, []);
    useEffect(() => {
        const value = listPermission.map((item) => {
            return {
                key: item._id,
                name: item.nameCate,
                tags: ['loser'],
            };
        });
        setDataTree(value);
        data.current = value;
        setShowroomsFilter(value.map((item) => ({ label: item.name, value: item.key })));
    }, [listPermission]);
    const handleFilter = (values) => {
        if (values.nameId.length == 0) {
            setDataTree(data.current);
        } else {
            setDataTree(data.current.filter((item) => values.nameId.includes(item.key)));
        }
    };
    const handleFilters = () => {
        setDataTree(data.current);
    };
    return (
        <div>
            <div>
                <div className="flex justify-between">
                    <div>
                        <Button onClick={() => OpenShowDrawer()} className="btn-primary text-white mr-5" type="primary">
                            Thêm đơn hàng
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
                                    values:showroomsFilter,
                                    name: 'Tên Quyền....',
                                },
                            ]}
                            onFilter={handleFilter}
                        />
                    </div>
                    <p className="p-5">
                        Số lượng: <span className="font-bold">{dataTree?.length}</span>
                    </p>
                </div>
                <>
                    <Spin spinning={Loading}>
                        <Table columns={columns} dataSource={dataTree} />
                        <ShowDrawer
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
        </div>
    );
};

export default index;
