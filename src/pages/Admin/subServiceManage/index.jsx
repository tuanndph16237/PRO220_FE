import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import { getApiSubService, removeApiSubServiceById } from '../../../api/service';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { useNavigate } from 'react-router-dom';
import { Button, Space, Table } from 'antd';
import { PERMISSION_LABLEL, PERMISSION_TYPE } from '../../../constants/permission';
import PermissionCheck from '../../../components/permission/PermissionCheck';

const SubServiceManager = () => {
    useDocumentTitle('Quản lý dịch vụ');
    const navigate = useNavigate()
    const [service, setService] = useState([])
   
    useEffect(() => {
        (async() => {
           const serviceData = await getApiSubService()
           setService(serviceData.data)
        })()
    }, [])

    const Remove = (i)=>{
        removeApiSubServiceById(i.key)
        window.location.href = '/admin/quan-ly-sub-dich-vu'
        Notification(NOTIFICATION_TYPE.SUCCESS, 'Xóa dịch vụ phát sinh thành công!')
    }
    const columns = [
        { title: 'Dịch vụ phát sinh', dataIndex: 'name', key: 'name' },
        { title: 'Giá', dataIndex: 'fee', key: 'fee' },
        {
            title: 'Action',
            key: 'operation',
            render: (record, index) => {
                return (
                    <Space size="middle">
                        <PermissionCheck permissionHas={{ label: PERMISSION_LABLEL.SERVICE_SUB_MANAGE, code: PERMISSION_TYPE.UPDATE }}>
                            <Link to={`/admin/sua-sub-dich-vu/${record.key}`}>Update</Link>
                        </PermissionCheck>

                        <PermissionCheck permissionHas={{ label: PERMISSION_LABLEL.SERVICE_SUB_MANAGE, code: PERMISSION_TYPE.DELETE }}>
                            <Button
                                type="primary"
                                onClick={()=>{
                                    Remove(record)
                                }}
                                danger
                            >
                                Delete
                            </Button>
                        </PermissionCheck>
                    </Space>
                );
            },
        },
    ];

    const data = [];
    for (let i = 0; i < service.length; ++i) {
        data.push({
            key: service[i]._id,
            name: service[i].name,
            fee: service[i].fee,
        });
    }

    return (
        <>
            <Table columns={columns} dataSource={data} />
        </>
    );
};

export default SubServiceManager;
