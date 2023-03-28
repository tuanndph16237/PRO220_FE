import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, Form, Input, Select } from 'antd';
import { getAllRoleAsync } from '../../../slices/role';
import { createAccount } from '../../../api/account';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { R_EMAIL, R_NUMBER_PHONE } from '../../../constants/regex';
import { isEmpty } from 'lodash';
const CreateAccount = ({ open, onClose, onRefetch, checkShowroom }) => {
    const dispatch = useDispatch();
    const roles = useSelector((state) => state.role.valueRole);
    const [role, setRole] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openSelect, setOpenSelect] = useState(false);
    useEffect(() => {
        if (roles.length == 0) {
            (() => {
                dispatch(getAllRoleAsync());
            })();
        }
        if (isEmpty(checkShowroom)) {
            setRole(() => roles.filter((item) => item.name !== 'Quản Lý'));
        } else {
            setRole(roles);
        }
    }, [roles]);
    const handleClose = () => {
        onClose(false);
    };
    const onFinish = (values) => {
        const data = { ...values, password: '12345678' };
        setLoading(true);
        createAccount(data)
            .then(({ data: res }) => {
                Notification(NOTIFICATION_TYPE.SUCCESS, res.message);
                if (res.data) {
                    onRefetch();
                }
            })
            .catch((err) => {
                console.log('create-acount', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const handleChange = (value) => {
        const name = roles.find((item) => item.id == value);
        if (name.name == 'Quản Lý') {
            setOpenSelect(true);
        } else {
            setOpenSelect(false);
        }
    };
    return (
        <>
            <Drawer title="Thêm thành viên" placement="right" width="40%" onClose={handleClose} open={open}>
                <Form
                    id="form-add-account"
                    className="form-add-banner bg-white px-6 max-w-screen-lg mx-auto"
                    name="booking-form"
                    layout={'vertical'}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label={<p className="text-base font-semibold">Tên</p>}
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                            },
                        ]}
                    >
                        <Input className="text-base border-[#02b875]" placeholder="Nhập tên" />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Số điện thoại</p>}
                        name="number_phone"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                            },
                            {
                                pattern: R_NUMBER_PHONE,
                                message: 'Số điện thoại không đúng định dạng.',
                            },
                        ]}
                    >
                        <Input className="text-base border-[#02b875]" placeholder="Nhập Số điện thoại" />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Email</p>}
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này.',
                            },
                            {
                                pattern: R_EMAIL,
                                message: 'Email không đúng định dạng.',
                            },
                        ]}
                    >
                        <Input className="text-base border-[#02b875]" placeholder="Nhập Email" type="email" />
                    </Form.Item>
                    <Form.Item
                        label={<p className="text-base font-semibold">Vai trò</p>}
                        name="roleId"
                        rules={[
                            {
                                required: true,
                                message: 'Quý khách vui lòng không để trống trường thông tin này. Mặc định là #',
                            },
                        ]}
                    >
                        <Select
                            className="h-10 text-base border-[#02b875]"
                            placeholder="Chọn cửa hàng"
                            onChange={handleChange}
                        >
                            {role.map((role, index) => {
                                return (
                                    role.name !== 'Admin' && (
                                        <Select.Option key={role.id} value={role.id}>
                                            {role.name}
                                        </Select.Option>
                                    )
                                );
                            })}
                        </Select>
                    </Form.Item>
                    {isEmpty(checkShowroom) || !openSelect ? (
                        ''
                    ) : (
                        <Form.Item
                            label={<p className="text-base font-semibold">Cửa hàng</p>}
                            name="showroomId"
                            rules={[
                                {
                                    required: true,
                                    message: 'Quý khách vui lòng không để trống trường thông tin này.',
                                },
                            ]}
                        >
                            <Select className="h-10 text-base border-[#02b875]" placeholder="Chọn cửa hàng">
                                {checkShowroom.map((showroom) => (
                                    <Select.Option value={showroom._id} key={showroom._id}>
                                        {showroom.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    )}
                    <div className="absolute bottom-0 flex align-center">
                        <Form.Item>
                            <Button
                                htmlType="submit"
                                disabled={loading}
                                loading={loading}
                                className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] h-10 hover:!text-white hover:out
                        font-medium rounded-lg text-sm text-center md:mr-0"
                            >
                                Thêm thành viên
                            </Button>
                        </Form.Item>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="ml-2 h-10 text-[#ccc] bg-white hover:text-white hover:bg-[#02b875] border border-slate-300 border-solid 
                            focus:ring-4 font-medium rounded-lg text-sm px-5 py-2"
                        >
                            Hủy
                        </button>
                    </div>
                </Form>
            </Drawer>
        </>
    );
};
export default CreateAccount;