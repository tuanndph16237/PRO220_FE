import React, { useRef } from 'react';
import { Button, Form, Input, Tree, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { getPermission, getRolePermission, updateRolePermission } from '../../../../api/permission';
import _ from 'lodash';
import { Notification } from '../../../../utils/notifications';
import { NOTIFICATION_TYPE } from '../../../../constants/status';
import { hanldInput } from '../../../../slices/capotaliieFirstLetter';

const EditRole = ({ id, onClose }) => {
    const [expandedKeys, setExpandedKeys] = useState();
    const [checkedKeys, setCheckedKeys] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(true);
    const [form] = Form.useForm();
    const opens = useRef(0);
    const initialValues = {
        name: id.name,
    };
    const filterData = (permission, filter) => {
        let parent = {};
        let valueKey = '';
        let child = [];
        let CheckedKey = [];
        let ExpandedKey = [];
        parent = permission.map((element, index) => {
            valueKey = `${index}-${element._id}`;
            child = element.listPermissions.map((item, index) => {
                filter.forEach((valueFilter) => {
                    if (valueFilter._id === element._id) {
                        if (valueFilter.listPermissions.includes(item.code)) {
                            CheckedKey.push(`${valueKey}-${index}-${item._id}`);
                        }
                    }
                });
                return {
                    title: item.name,
                    key: `${valueKey}-${index}-${item._id}`,
                };
            });
            ExpandedKey.push(valueKey);
            return {
                title: element.nameCate,
                key: valueKey,
                children: child,
            };
        });
        return [parent, CheckedKey, ExpandedKey];
    };
    const Checked = (data) => {
        let listPermissions = [];
        let valueKeys = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].listPermissions.length; j++) {
                listPermissions.push(data[i].listPermissions[j].code);
            }
            valueKeys.push({
                _id: data[i]._id,
                listPermissions: listPermissions,
            });
            listPermissions = [];
        }
        return valueKeys;
    };
    const Split = (arr) => {
        let container = [];
        const Reg = new RegExp(/\d\-(\d|\D)*\-\d\-(\d|\D)*$/);
        arr.forEach((element) => {
            if (Reg.test(element)) {
                const resual = element.split('-');
                container.push(resual[3]);
            }
        });
        return container;
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
    const onSelect = (selectedKeysValue) => {
        setSelectedKeys(selectedKeysValue);
    };
    const onFinish = async () => {
        const permissions = Split(checkedKeys);
        const value = {
            permissions,
            roleId: id.key,
        };
        const { data } = await updateRolePermission(value);
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
    useEffect(() => {
        (async () => {
            const reponsive = await getRolePermission(id.name);
            if (reponsive) {
                let filter = Checked(reponsive.data);
                const { data } = await getPermission();
                if (data) {
                    const result = filterData(data, filter);
                    setTreeData(result[0]);
                    setLoading(false);
                    setCheckedKeys(result[1]);
                    setExpandedKeys(result[2]);
                    opens.current = result[1].length;
                }
            }
        })();
    }, []);
    const onChage = (event) => {
        const resual = hanldInput(event);
        form.setFieldsValue({
            name: resual,
        });
    };
    return (
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
                    label="Tên Vai Trò"
                    name="name"
                    className="aaa"
                    rules={[
                        {
                            required: true,
                            message: 'không được bỏ trống tên Quyền!',
                        },
                    ]}
                >
                    <Input onChange={(event) => onChage(event)} />
                </Form.Item>
                <Spin spinning={loading}>
                    <Form.Item label="Lựa Chọn Quyền:" name="name" className="aaa">
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
                    </Form.Item>
                </Spin>
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
    );
};

export default EditRole;
