import React from 'react';
import { Button, Form, Input, Tree, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { getPermission, getRolePermission } from '../../../../api/permission';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { CreateRoleAsync } from '../../../../slices/role';

const EditRole = ({ id }) => {
    const [expandedKeys, setExpandedKeys] = useState();
    const [checkedKeys, setCheckedKeys] = useState();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const initialValues = {
        "name":id
    }
    const find = (permission, ff) => {
        let gg = ff
        let parent = {};
        let valueKey = '';
        let child = [];
        let map = [];
        let ExpandedKey = []
        parent = permission.map((element, index) => {
            valueKey = `${index}-${element._id}`;
            child = element.listPermissions.map((item, index) => {
                gg.forEach((itemcc) => {
                    if (itemcc._id === element._id) {
                        if (itemcc.listPermissions.includes(item.code)) {
                            map.push(`${valueKey}-${index}-${item._id}`);
                        }
                    }
                });
                return {
                    title: item.name,
                    key: `${valueKey}-${index}-${item._id}`,
                };
            });
            ExpandedKey.push(valueKey)
            return {
                title: element.nameCate,
                key: valueKey,
                children: child,
            };
        });
        return [parent, map,ExpandedKey];
    };
    useEffect(() => {
        (async () => {
            const reponsive = await getRolePermission(id);
            if (reponsive) {
                let ff = Checked(reponsive.data);
                const { data } = await getPermission();
                if (data) {
                    const result = find(data, ff)
                    setTreeData(result[0]);
                    setLoading(false);
                    setCheckedKeys(result[1]);
                    setExpandedKeys(result[2])
                }
            }
        })();
    }, []);
    const Checked = (data) => {
        let listPermissions = [];
        let g = [];
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i].listPermissions.length; j++) {
                listPermissions.push(data[i].listPermissions[j].code);
            }
            g.push({
                _id: data[i]._id,
                listPermissions: listPermissions,
            });
            listPermissions = [];
        }
        return g;
    };
    const onExpand = (expandedKeysValue) => {
        setExpandedKeys(expandedKeysValue);
        setAutoExpandParent(false);
    };
    const onCheck = (checkedKeysValue) => {
        setCheckedKeys(checkedKeysValue);
    };
    const onSelect = (selectedKeysValue) => {
        setSelectedKeys(selectedKeysValue);
    };
    const onFinish = async (values) => {
        const permissions = Split(checkedKeys);
        const value = {
            ...values,
            permissions,
        };
        dispatch(CreateRoleAsync(value));
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
    return (
        <div>
            <Form
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
                    <Input />
                </Form.Item>
                {/* <p style={{padding:"5px"}}>Lựa Chọn Quyền Trong Hệ Thống :</p> */}
                <Spin spinning={loading}>
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
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default EditRole;
