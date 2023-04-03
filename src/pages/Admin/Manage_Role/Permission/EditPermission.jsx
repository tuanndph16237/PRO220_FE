import { Alert, Button, Form, Input, Modal, Spin, Tree } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { getOnegetPermission, updatePermission } from '../../../../api/permission';
import { arrayPermission, dataPermission } from '../../../../constants/permission';
import { NOTIFICATION_TYPE } from '../../../../constants/status';
import { hanldInput } from '../../../../utils/capotaliieFirstLetter';
import { Notification } from '../../../../utils/notifications';

const EditPermission = ({ id, onClose }) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState(['0-0-112', '0-1-113', '0-2-114', '0-3-111']);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState([]);
    const [status, setStatus] = useState(true);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [form] = Form.useForm();
    const opens = useRef(0);
    const values = useRef();
    const initialValues = {
        namePermission: id.name,
    };
    const onExpand = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        if (opens.current !== Split(checkedKeysValue).length) {
            setOpen(false);
        } else {
            setOpen(true);
        }
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        setSelectedKeys(selectedKeysValue);
    };
    const onFinish = async (values) => {
        setOpenModal(true);
    };
    useEffect(() => {
        (async () => {
            const dataTree = dataPermission.map((item, index) => {
                return {
                    title: item.name,
                    key: `0-${item.code}`,
                };
            });
            const { data } = await getOnegetPermission(id.key);
            let object = [];
            data.listPermissions.forEach((item, index) => {
                if (arrayPermission.includes(item.code)) {
                    object.push(`0-${item.code}`);
                }
                return object;
            });
            setTreeData(dataTree);
            setCheckedKeys(object);
            setStatus(false);
            setOpen(true);
            opens.current = object.length;
        })();
    }, []);
    const Split = (arr) => {
        let box = [];
        arr.forEach((element) => {
            const resual = element.split('-');
            box.push(Number(resual[1]));
        });
        let object = [];
        dataPermission.forEach((item, index) => {
            if (box.includes(item.code)) {
                object.push({
                    name: item.name,
                    code: item.code,
                });
            }
        });
        return object;
    };
    const onChage = (event) => {
        const resual = hanldInput(event.target.value);
        form.setFieldsValue({
            namePermission: resual,
        });
    };
    const updatedataPermission = async () => {
        setOpenModal(false);
        const valueCheckKey = Split(checkedKeys);
        const sendData = {
            idCate: id.key,
            listPermissions: valueCheckKey,
        };
        const { data } = await updatePermission(sendData);
        if (data) {
            Notification(NOTIFICATION_TYPE.SUCCESS, 'Cập nhập thành công!');
            setOpen(true);
            setTimeout(() => {
                onClose({
                    open: false,
                    action: '',
                });
            }, 1500);
        }
    };
    const hideModal = () => {
        setOpenModal(false);
    };
    return (
        <div>
            {' '}
            <div>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Tên quyền"
                        name="namePermission"
                        className="aaa"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input onChange={(event) => onChage(event)} disabled />
                    </Form.Item>
                    <Form.Item label="Lựa Chọn Chức Năng :" name="name" className="aaa">
                        <Spin spinning={status}>
                            <Tree
                                checkable
                                onExpand={onExpand}
                                expandedKeys={expandedKeys}
                                autoExpandParent={autoExpandParent}
                                onCheck={onCheck}
                                checkedKeys={checkedKeys}
                                onSelect={onSelect}
                                selectedKeys={selectedKeys}
                                treeData={treeData}
                            />
                        </Spin>
                    </Form.Item>
                    <Modal
                        title="Thông Báo"
                        open={openModal}
                        onOk={updatedataPermission}
                        onCancel={hideModal}
                        okText="Xác nhận"
                        cancelText="Hủy"
                    >
                        <Alert
                            message="Nếu bạn chỉnh sửa quyền việc này sẽ ảnh đến các vai trò (Role) đang tồn tại trong hệ thống. Cân nhắc kỹ trước khi chỉnh sửa"
                            type="warning"
                            showIcon
                        />
                    </Modal>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" disabled={open}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default EditPermission;
