import { Button, Input, Steps, message, Select } from 'antd';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { SEVICE_TYPE } from '../../../constants/order';
import ModalCustomize from '../../../components/Customs/ModalCustomize';

const StatusOrder = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [prev, setPrev] = useState(props.status);
    const [current, setCurrent] = useState(props.status);
    const [textCancel, setTextCancel] = useState('');
    const [showModal, setShowModal] = useState(null);
    const [disabledChangeStatus, setDisabledChangeStatus] = useState(true);
    const [materials, setMaterials] = useState([]);

    console.log('materials', materials);

    const msgCancel = () => {
        messageApi.open({
            type: 'error',
            content: 'Không thể hủy đơn hàng!',
        });
    };

    useEffect(() => {
        setCurrent(props.status);
        // setPrev(props.status);
    }, [props.status]);

    const checkDisableChangeStatus = (current) => {
        //disabeld cancel
        if (!current && props.status > 2) {
            msgCancel();
            setDisabledChangeStatus(true);
            return;
        }
        //disabeld if same status
        if (current === props.status || (current && current !== props.status + 1)) {
            setDisabledChangeStatus(true);
            return;
        }
        setDisabledChangeStatus(false);

        //
    };

    const onChange = (value) => {
        checkDisableChangeStatus(value);
        // setPrev(current);
        setCurrent(value);
    };

    const handleOkCancel = () => {
        setShowModal(null);
    };
    const handleCancel = () => {
        setShowModal(null);
    };

    const handleChangeStatus = () => {
        console.log(9999);
        switch (current) {
            case 0:
                setShowModal('cancel');
                break;
            case 3:
                setShowModal('selectMaterials');
                break;
            default:
                return false;
        }
    };
    return (
        <div className="status-content py-4">
            {contextHolder}
            <Steps
                type="navigation"
                current={current}
                onChange={onChange}
                className="site-navigation-steps"
                items={[
                    {
                        title: 'Hủy',
                        // subTitle: 'waiting for longlong time',
                        status: 'error',
                        description: props.description || '',
                    },
                    {
                        title: 'Chờ xác nhận',
                        status: 'process',
                        description: 'Check lại thông tin đơn hàng.',
                    },
                    {
                        title: 'Đã tiếp nhận lịch',
                        status: 'process',
                    },
                    {
                        title: 'Đang xử lý',
                        status: 'process',
                    },
                    {
                        title: 'Thanh toán',
                        status: 'process',
                    },
                    {
                        title: 'Hoàn thành',
                        status: 'finish',
                    },
                ]}
            />
            <div className="pt-4 flex justify-end">
                {props.status === 3 && (
                    <Button
                        onClick={() => setShowModal('selectMaterials')}
                        type="primary"
                        className="mr-2 btn-primary h-10 px-4 text-white bg-![#02b875] hover:bg-[#09915f] hover:!text-white font-medium rounded-lg text-base "
                    >
                        Chỉnh sửa vật tư
                    </Button>
                )}
                <Button
                    onClick={handleChangeStatus}
                    disabled={disabledChangeStatus}
                    type="primary"
                    className="btn-primary h-10 px-4 text-white bg-![#02b875] hover:bg-[#09915f] hover:!text-white font-medium rounded-lg text-base "
                >
                    Chuyển trạng thái
                </Button>
            </div>
            {showModal === 'cancel' && (
                <ModalCustomize
                    title="Chuyển trạng thái: Hủy đơn hàng"
                    showModal={showModal}
                    setShowModal={setShowModal}
                    value={textCancel}
                    onSubmit={handleOkCancel}
                >
                    <p className="text-base font-semibold py-2">
                        Nhập lý do
                        <span className="text-[#ff4d4f]"> *</span>
                    </p>
                    <Input
                        type="text"
                        value={textCancel}
                        className="h-10 text-base border-[#02b875]"
                        onChange={(e) => setTextCancel(e.target.value)}
                    />
                    {!textCancel && <span className="text-[#ff4d4f]">Vui lòng nhập lý do hủy đơn</span>}
                </ModalCustomize>
            )}
            {showModal === 'selectMaterials' && (
                <ModalCustomize
                    title="Chuyển trạng thái: Đang xử lý"
                    showModal={showModal}
                    setShowModal={setShowModal}
                    value={materials}
                    onSubmit={handleOkCancel}
                >
                    <p className="text-base font-semibold py-2">
                        Chọn vật tư
                        <span className="text-[#ff4d4f]"> *</span>
                    </p>
                    <Select
                        size="large"
                        placeholder="Chọn vật tư sử dụng..."
                        className="h-10 w-full text-base border-[#02b875]"
                        mode="multiple"
                        value={materials}
                        onChange={(newValue) => {
                            console.log('newValue', newValue);
                            setMaterials(newValue);
                        }}
                    >
                        <Select.Option value={SEVICE_TYPE.SHOWROOM}>
                            Sửa chữa/ Bảo dưỡng tại cửa hàng.11111111
                        </Select.Option>
                        <Select.Option value={SEVICE_TYPE.HOUSE}>2222</Select.Option>
                    </Select>
                    {_.isEmpty(materials) && <span className="text-[#ff4d4f]">Vui lòng nhập chọn vật tư sử dụng</span>}
                </ModalCustomize>
            )}
        </div>
    );
};

export default StatusOrder;