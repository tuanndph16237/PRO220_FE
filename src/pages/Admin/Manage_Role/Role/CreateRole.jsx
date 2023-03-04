import React from 'react';
import { Button, Form, Input, Tree, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { getPermission } from '../../../../api/permission';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { CreateRoleAsync } from '../../../../slices/role';
import { hanldInput } from '../../../../slices/capotaliieFirstLetter';
const CreateRole = ({ onClose }) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const find = (permission) => {
        let parent = {};
        let valueKey = '';
        let child = [];
        let ExpandedKey = [];
        parent = permission.map((element, index) => {
            valueKey = `${index}-${element._id}`;
            child = element.listPermissions.map((item, index) => {
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
        return [parent, ExpandedKey];
    };
    useEffect(() => {
        (async () => {
            const { data } = await getPermission();
            if (data) {
                const result = find(data);
                setTreeData(result[0]);
                setLoading(false);
                setExpandedKeys(result[1]);
            }
        })();
    }, []);
    const onExpand = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue, info) => {
        setSelectedKeys(selectedKeysValue);
    };
    const onFinish = async (values) => {
        const permissions = Split(checkedKeys);
        const value = {
            ...values,
            permissions,
        };
        dispatch(CreateRoleAsync(value));
        setOpen(true)
        setTimeout(() => {
            onClose({
                open: false,
                action: '',
            });
        }, 2000);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const Split = (arr) => {
        let box = [];
        const Reg = new RegExp(/\d\-(\d|\D)*\-\d\-(\d|\D)*$/);
        arr.forEach((element) => {
            if (Reg.test(element)) {
                const resual = element.split('-');
                box.push(resual[3]);
            }
        });
        return box;
    };
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
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                    <Input onChange={(event) => onChage(event)}/>
                </Form.Item>
                <Spin spinning={loading}>
                    <Form.Item
                        label="Lựa Chọn Quyền:"
                        name="name"
                        className="aaa"
                    >
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

export default CreateRole;
