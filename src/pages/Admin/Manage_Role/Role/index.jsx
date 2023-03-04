import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Tag, Spin } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import DrawerCreateRole from './DrawerCreateRole';
import { getAllRoleAsync } from '../../../../slices/role';
import { isEmpty } from 'lodash';
const index = () => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState('');
    const [data, setData] = useState([]);
    const [id, setId] = useState('');
    const Role = useSelector((state) => state.role.valueRole);
    const Loading = useSelector((state) => state.role.loading);
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
            setData(showdata);
        })();
    }, [Role]);
    return (
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
                    <Table columns={columns} dataSource={data} />;
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
