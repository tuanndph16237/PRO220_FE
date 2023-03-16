import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, Form, Input, Select } from 'antd';
import { getAllRoleAsync } from '../../../slices/role';
import { getUser, updateAccount } from '../../../api/account';
import { Notification } from '../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import { R_EMAIL, R_NUMBER_PHONE } from '../../../constants/regex';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import SpinCustomize from '../../../components/Customs/Spin';
import { isEmpty } from 'lodash';

const UpdateAccount = ({ idUpdate, onClose, onRefetch, checkShowroom }) => {
    useDocumentTitle('Cập nhật thành viên');
    const dispatch = useDispatch();
    const showrooms = useSelector((state) => state.showroom.showrooms.values);
    const roles = useSelector((state) => state.role.valueRole);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [checked, setChecked] = useState([]);

    const [data, setData] = useState({});

    useEffect(() => {
        getUser(idUpdate)
            .then(({ data: res }) => {
                setData({
                    ...res,
                    roleId: res.roleId._id,
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [idUpdate]);
    useEffect(() => {
        if (!isEmpty(data)) {
            console.log('data', data);
            let filter = showrooms.find((item) => item._id === data.showroomId);
            setChecked([...checkShowroom, filter]);
        }
    }, [data]);
    useEffect(() => {
        if (roles.length == 0) {
            (() => {
                dispatch(getAllRoleAsync());
            })();
        }
        console.log('roles', roles);
    }, [roles]);
    const handleClose = () => {
        onClose(false);
    };
    const onFinish = (values) => {
        const update = { ...data, ...values };
        setUpdating(true);
        updateAccount(update)
            .then(({ data: res }) => {
                Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhật thành công');
                onRefetch(res);
            })
            .catch((err) => {})
            .finally(() => {
                setUpdating(false);
            });
    };
    return (
        <div>
            {loading ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <Drawer title="Sửa thông tin" placement="right" width="40%" onClose={handleClose} open={idUpdate}>
                    <Form
                        id="form-update-account"
                        className="form-add-banner bg-white px-6 max-w-screen-lg mx-auto"
                        name="booking-form"
                        layout={'vertical'}
                        initialValues={data}
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
                                defaultValue={{
                                    value: 'Quản Lý',
                                    label: 'Quản Lý',
                                }}
                                className="h-10 text-base border-[#02b875]"
                                placeholder="Chọn cửa hàng"
                            >
                                {roles.map((role) => {
                                    return (
                                        role.name !== 'Admin' && (
                                            <Option value={role.id} key={role.id}>
                                                {role.name}
                                            </Option>
                                        )
                                    );
                                })}
                            </Select>
                        </Form.Item>
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
                                {checked.map((showroom) => (
                                    <Option value={showroom._id} key={showroom._id}>
                                        {showroom.name}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <div className="absolute bottom-0 flex align-center">
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    disabled={loading}
                                    loading={loading}
                                    className="btn-primary text-white bg-[#02b875] w-full hover:!bg-[#09915f] h-10 hover:!text-white hover:out
                        font-medium rounded-lg text-sm text-center md:mr-0"
                                >
                                    Cập nhật
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
            )}
        </div>
    );
};

export default UpdateAccount;
