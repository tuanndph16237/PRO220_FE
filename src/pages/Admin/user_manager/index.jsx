import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Spin, Table, Tooltip } from 'antd';
import { getAllUser } from '../../../api/account';
import Filter from '../../../components/Filter/Filter';
import { SyncOutlined } from '@ant-design/icons';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'number_phone',
        dataIndex: 'number_phone',
        key: 'number_phone',
    },
];
const index = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterData, setFilterData] = useState([]);
    const datas = useRef([]);
    useEffect(() => {
        (async () => {
            const { data } = await getAllUser();
            // setData
            const newData = data.map((item) => {
                return {
                    key: item._id,
                    name: item.name,
                    number_phone: item.number_phone,
                };
            });
            setData(newData);
            setLoading(false);
            datas.current = newData;
            setFilterData(() => newData.map((item) => ({ label: item.name, value: item.key })));
        })();
    }, []);
    const handleFilter = (values) => {
        if (values.nameId.length !== 0) {
            setData(data.filter((item) => values.nameId.includes(item.key)));
        }
    };
    const handleFilters = () => {
        setData(datas.current);
    };
    return (
        <div>
            <div className='className="flex justify-between"'>
                <div>
                    <button className="pr-6" onClick={() => handleFilters()}>
                        <Tooltip title="Làm mới tài khoản">
                            <SyncOutlined style={{ fontSize: '18px', color: '#000' }} />
                        </Tooltip>
                    </button>
                    <Filter
                        items={[
                            {
                                label: <Space align="center">Tên Tài Khoản</Space>,
                                key: 'nameId',
                                type: 'select',
                                mode: 'multiple',
                                values: filterData,
                                name: 'Tên Tài Khoản....',
                            },
                        ]}
                        onFilter={handleFilter}
                    />
                </div>
                <p className="p-5">
                    Số lượng: <span className="font-bold">{data?.length}</span>
                </p>
            </div>
            <Spin tip="Loading..." spinning={loading}>
                <Table columns={columns} dataSource={data} />
            </Spin>
        </div>
    );
};

export default index;
