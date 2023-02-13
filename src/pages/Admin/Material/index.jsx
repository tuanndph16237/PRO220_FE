import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Switch, Table, Row, Button, Spin } from 'antd';
import { getAllMaterialAsync, removeMaterialByIdsAsync, updateMaterialAsync } from '../../../slices/material';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import DrawerCreateMaterial from './DrawerCreateMaterial';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const MaterialManage = () => {
    useDocumentTitle('Quản lý material');
    const dispatch = useDispatch();
    const materials = useSelector((state) => state.material.materials.values);
    const loadding = useSelector((state) => state.material.materials.loading);
    const messageCreated = useSelector((state) => state.material.create.message);
    const statusNotiCreated = useSelector((state) => state.material.create.status);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [open, setOpen] = useState(false);
    const data = materials.map((material) => ({ ...material, key: material._id }));
    useEffect(() => {
        dispatch(getAllMaterialAsync());
    }, []);

    useEffect(() => {
        if (messageCreated && statusNotiCreated) return noti(statusNotiCreated, messageCreated);
    }, [messageCreated, statusNotiCreated]);

    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleUpdateMaterial = (data) => {
        dispatch(
            updateMaterialAsync({
                _id: data._id,
                data: _.pick(data, ['name', 'image', 'price']),
            }),
        );
    };

    const handleRemoveMaterialByIdsAsync = (ids) => {
        dispatch(removeMaterialByIdsAsync(ids)).then((res) => {
            const materialsRemove = _.get(res, 'payload.data.dataDeleted', null);
            if (materialsRemove) {
                noti(NOTIFICATION_TYPE.SUCCESS, 'Xóa thành công!', `Bạn đã xóa ${materialsRemove.name}  thành công!`);
            } else {
                const ids = _.get(res, 'payload.data.ids', null);
                noti(
                    NOTIFICATION_TYPE.SUCCESS,
                    'Xóa thành vật tư công!',
                    `Bạn đã xóa ${ids.length} vật tư  thành công!`,
                );
            }
        });
    };

    const columns = [
        {
            title: 'Tên',
            dataIndex: 'name',
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
                        <Popconfirm
                            title={`Bạn chắc chắn muốn xóa ${data.name} không?`}
                            onConfirm={() => {
                                handleRemoveMaterialByIdsAsync([data._id]);
                            }}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined className="text-xl" />
                        </Popconfirm>
                    </Row>
                );
            },
        },
    ];

    return (
        <div>
            {loadding ? (
                <div className="absolute top-1/2 left-1/2">
                    <Spin tip="" size="large">
                        <div className="content" />
                    </Spin>
                </div>
            ) : (
                <>
                    <div className="flex justify-between align-center pb-4">
                        <Button
                            size="large"
                            onClick={() => handleRemoveMaterialByIdsAsync(selectedRowKeys)}
                            className="focus:outline-none text-base text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                            disabled={_.isEmpty(selectedRowKeys) ? true : false}
                        >
                            Xóa {_.isEmpty(selectedRowKeys) ? '' : _.get(selectedRowKeys, 'length', '') + ' material'}
                        </Button>
                        <button
                            type="button"
                            onClick={() => setOpen(true)}
                            className="focus:outline-none h-10 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2.5"
                        >
                            <PlusOutlined className="pr-2 text-white " />
                            Thêm
                        </button>
                    </div>
                    <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
                </>
            )}
            {open && <DrawerCreateMaterial open={open} onClose={setOpen} />}
        </div>
    );
};

export default MaterialManage;
