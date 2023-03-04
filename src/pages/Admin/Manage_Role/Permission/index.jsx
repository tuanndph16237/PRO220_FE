import React, { useEffect } from 'react';
import ShowDrawer from './ShowDrawer';
import { useState } from 'react';
import { Space, Spin, Table, Tag } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getPermissions } from '../../../../slices/role';
import { isEmpty } from 'lodash';
const index = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');
    const [dataTree, setDataTree] = useState();
    const listPermission = useSelector((state) => state.role.valuePermission);
    const dispatch = useDispatch();
    const Loading = useSelector((state) => state.role.loading);
    const [id, setId] = useState('');
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
    }, [listPermission]);
    return (
        <div>
            {' '}
            <div>
                <button
                    type="button"
                    onClick={() => OpenShowDrawer()}
                    className="focus:outline-none h-10 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5 my-5"
                >
                    <PlusOutlined className="pr-2 text-white " />
                    Thêm
                </button>
                <>
                    <Spin spinning={Loading}>
                        <Table columns={columns} dataSource={dataTree} />;
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
