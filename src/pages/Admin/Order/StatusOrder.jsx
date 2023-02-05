import { Button, Steps, message, Select } from 'antd';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import ModalCustomize from '../../../components/Customs/ModalCustomize';
import SelectMaterials from './SelectMaterials';
const contentStyle = {
    lineHeight: '80px',
    textAlign: 'center',
    color: '#02b875',
    backgroundColor: '#f5f5f5',
    borderRadius: '2px',
    fontSize: '18px',
    marginTop: 16,
};
const StatusOrder = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [status, setStatus] = useState([
        {
            title: 'Hủy',
            status: 'error',
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
    ]);
    const [stepValue, setStepValue] = useState(0);
    const [current, setCurrent] = useState(props.status);
    const [showModal, setShowModal] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [reasons, setReasons] = useState(['Khác']);

    const onSubmitStatus = () => {
        props.onSubmit(current, {
            materials: props.order.materials,
            materialIds: props.order.materialIds,
            reasons: [],
        });
    };

    const msgCancel = () => {
        messageApi.open({
            type: 'error',
            content: 'Không thể hủy đơn hàng!',
        });
    };

    useEffect(() => {
        setCurrent(props.status);
        checkDisableChangeStatus(props.status);

        //handle step
        handleChangeStep();
    }, [props.status]);

    const handleChangeStep = () => {
        props.status > 2 ? setStepValue(1) : setStepValue(0);
        const statusConvert = status.filter((items, idx) => {
            //hidden cancel
            if (props.status > 2 && items.title !== 'Hủy') {
                return true;
            }
            if (props.status <= 2) {
                return true;
            }
        });
        const step = statusConvert.map((item, idx) => {
            if (idx > props.status) {
                return {
                    ...item,
                    status: 'wait',
                };
            }
            if (idx === props.status) {
                return {
                    ...item,
                    status: 'process',
                };
            }
            return {
                ...item,
                disabled: item.title === 'Hủy' ? false : true,
                status: item.title === 'Hủy' ? 'error' : 'finish',
            };
        });
        setStatus(step);
    };

    const checkDisableChangeStatus = (current) => {
        //disabeld cancel
        if (!current && props.status > 2) {
            msgCancel();
            setDisabled(true);
            return;
        }
        //disabeld if same status
        if (current === props.status || (current && current !== props.status + 1)) {
            setDisabled(true);
            return;
        }
        setDisabled(false);

        //
    };

    const onChange = (value) => {
        checkDisableChangeStatus(value);
        setCurrent(value);
    };

    const handleChangeStatus = () => {
        switch (current) {
            case 0:
                setShowModal('cancel');
                break;
            case 3:
                setShowModal('selectMaterials');
                break;
            default:
                onSubmitStatus();
        }
    };
    return (
        <div className="status-content py-4">
            {contextHolder}
            <Steps
                initial={stepValue}
                type="navigation"
                current={current}
                onChange={onChange}
                className="site-navigation-steps"
                items={status}
            />
            {!_.isEmpty(props.order.reasons) ? (
                <div style={contentStyle}>
                    Lý do huỷ đơn:{' '}
                    {_.map(props.order.reasons, (reason, idx) => {
                        if (idx + 1 === props.order.reasons.length) {
                            return reason;
                        }
                        return reason + ', ';
                    })}
                </div>
            ) : null}
            <div className="pt-4 flex justify-end">
                {props.status === 3 && (
                    <Button
                        onClick={() => {
                            setShowModal('selectMaterials');
                        }}
                        disabled={false}
                        loading={props.loading}
                        type="primary"
                        className="mr-2 btn-primary h-10 px-4 text-white bg-![#02b875] hover:bg-[#09915f] hover:!text-white font-medium rounded-lg text-base "
                    >
                        Chỉnh sửa vật tư
                    </Button>
                )}
                <Button
                    onClick={handleChangeStatus}
                    disabled={disabled}
                    loading={props.loading}
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
                    value={reasons}
                    onSubmit={() => {
                        props.onSubmit(current, { reasons });
                        setShowModal(null);
                    }}
                    disabled={true}
                >
                    <p className="text-base font-semibold py-2">
                        Chọn lý do
                        <span className="text-[#ff4d4f]"> *</span>
                    </p>
                    <Select
                        size="large"
                        className="w-full text-base border-[#02b875]"
                        mode="multiple"
                        value={reasons}
                        onChange={(newValue) => {
                            setReasons(newValue);
                        }}
                    >
                        <Select.Option value="Hết vật tư">Hết vật tư</Select.Option>
                        <Select.Option value="Khách hàng không còn nhu cầu">Khách hàng không còn nhu cầu</Select.Option>
                        <Select.Option value="Không xác thực được thông tin khách hàng">
                            Không xác thực được thông tin khách hàng
                        </Select.Option>
                        <Select.Option value="Khác">Khác</Select.Option>
                    </Select>
                    {_.isEmpty(reasons) && <span className="text-[#ff4d4f]">Vui lòng lý do hủy đơn hàng</span>}
                </ModalCustomize>
            )}
            {showModal === 'selectMaterials' && (
                <SelectMaterials
                    order={props.order}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleOkCancel={(data) => {
                        setShowModal(null);
                        props.onSubmit(current, data);
                    }}
                />
            )}
        </div>
    );
};

export default StatusOrder;
