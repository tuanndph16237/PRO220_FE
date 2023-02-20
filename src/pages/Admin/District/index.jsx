import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Row, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDistrict } from '../../../api/district';

const DistrictManage = () => {
    const [districtUser, setDistrict] = useState([]);
    useEffect(() => {
        fetchDistrict();
    }, []);
    const fetchDistrict = async (id) => {
        try {
            const dataDistrict = await getDistrict(id);
            const handleOrderUser = dataDistrict.data.map((order, index) => ({ key: index, ...order }));
            setDistrict(handleOrderUser);
        } catch (error) {}
    };
    const columns = [
        {
            title: 'Tỉnh',
            dataIndex: 'name',
        },
        {
            title: '',
            width: 250,
            render: (data) => {
                return (
                    <Row>
                        <Link to={`${data._id}`}>
                            <EditOutlined className="text-xl pr-4" />
                        </Link>
                    </Row>
                );
            },
        },
    ];

    return (
        <div>
            <Link to="them">
                <Button className="focus:outline-none mb-2 h-10 text-white bg-[#02b875] hover:bg-[#09915f] focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-2">
                    Thêm
                </Button>
            </Link>
            <div>
                <Table columns={columns} dataSource={districtUser} />
            </div>
        </div>
    );
};

export default DistrictManage;
