import { ArrowLeftOutlined, DownloadOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Form, Table, Tooltip } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import ModalCustomize from '../../../components/Customs/ModalCustomize';
import MockUp from './MockUp';
import { generalPart, updateGeneralPart } from '../../../api/warehouse';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { Notification } from '../../../utils/notifications';
import { Link } from 'react-router-dom';

const GeneralWarehouse = () => {
    const [open, setOpenModal] = useState(false);
    const [isChange, setIsChange] = useState(false);
    const data = useRef([])
    const [dataChange, setDataChange] = useState({
        idMaterial: '',
        quantity: 0,
    });
    const [dataWarehouse, setDataWarehouse] = useState([]);
    const [partSelect, setPartSelect] = useState({
        name: '',
        unit: '',
        quantity: 0,
        idMaterial: '',
        key: '',
        _id: '',
    });

    const fetchData = async () => {
        try {
            const dataWarehouse = await generalPart();
            const handleKey = dataWarehouse?.data.map((data) => {
                return { key: data._id, ...data };
            });
            setDataWarehouse(handleKey);
            data.current =handleKey
        } catch (error) {
            Notification(NOTIFICATION_TYPE.ERROR, 'Không thể lấy dữ liệu, thử tải lại!');
        }
    };

    const updatePartGeneral = async (dataUpdate) => {
        try {
            const dataWarehouse = await updateGeneralPart(dataUpdate);
            Notification(NOTIFICATION_TYPE.SUCCESS, 'cập nhật thành công');
            setTimeout(() => fetchData(), 100);
        } catch (error) {
            Notification(NOTIFICATION_TYPE.ERROR, 'Không thể cập nhật dữ liệu');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleExchangePartQuantity = () => {
        if (isChange && dataChange.quantity != null) {
            updatePartGeneral(dataChange);
        }
        setOpenModal(false);
        setIsChange(false);
    };

    const handleDataSendBack = (data) => {
        setDataChange(data);
        if (!isChange) {
            setIsChange(true);
        }
    };

    const columns = [
        { title: 'Tên vật tư', dataIndex: 'name', key: '_id' },
        { title: 'Đơn vị tính', dataIndex: 'unit', key: '_id' },
        { title: 'Số lương', dataIndex: 'quantity', key: '_id' },
        {
            title: 'Cập nhật',
            dataIndex: '',
            key: 'x',
            render: (value) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setPartSelect(value);
                        setOpenModal(true);
                    }}
                    icon={<DownloadOutlined />}
                    size={'middle'}
                >
                    Thay đổi số lượng
                </Button>
            ),
        },
    ];
    const handleChange = () => {
        const a = dataWarehouse.filter((item) => item.quantity === 0);
        setDataWarehouse(a);
    };
    const handleFilter = (values = {}) => {
        setDataWarehouse(data.current);
    };
    return (
        <>
            <div className="my-4 flex justify-between items-center">
                <div>
                    <Link to={'/admin/quan-ly-kho'} className="m-4">
                        <ArrowLeftOutlined className="px-2" />
                        Quay Lại
                    </Link>
                    <button className="pr-6" onClick={() => handleFilter()}>
                            <Tooltip title="Làm Vật tư">
                                <SyncOutlined style={{ fontSize: '18px', color: '#000' }} />
                            </Tooltip>
                        </button>
                    <Button onClick={handleChange} className="btn-primary text-white" type="primary">
                        lọc sản phẩm đã hết
                    </Button>
                </div>
                <p className='mx4'>số lượng : {dataWarehouse.length}</p>
            </div>
            <Table columns={columns} dataSource={dataWarehouse} />
            <ModalCustomize
                showModal={open}
                footer={true}
                title={'Thay đổi số lượng vật tư'}
                setShowModal={() => setOpenModal(false)}
                onSubmit={handleExchangePartQuantity}
            >
                <MockUp dataSelect={partSelect} handle={handleDataSendBack} />
            </ModalCustomize>
        </>
    );
};

export default GeneralWarehouse;
