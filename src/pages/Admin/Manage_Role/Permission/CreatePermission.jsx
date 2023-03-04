import { Button, Form, Input, Tree } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { dataPermission } from '../../../../constants/permission';
import { hanldInput } from '../../../../slices/capotaliieFirstLetter';
import { CreatePermissions } from '../../../../slices/role';
const CreatePermission = ({ onClose }) => {
    const [expandedKeys, setExpandedKeys] = useState([]);
    const [checkedKeys, setCheckedKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [autoExpandParent, setAutoExpandParent] = useState(true);
    const [treeData, setTreeData] = useState([]);
    const [status, setStatus] = useState(false);
    const [form] = Form.useForm();
    const dispatch = useDispatch();
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
        const valueCheckKey = Split(checkedKeys);
        const senData = {
            name: values.namePermission,
            listPermissions: valueCheckKey,
        };
        setStatus(true);
        dispatch(CreatePermissions(senData));
        setTimeout(() => {
            onClose({
                open: false,
                action: '',
            });
        }, 1500);
    };
    useEffect(() => {
        const dataTree = dataPermission.map((item, index) => {
            return {
                title: item.name,
                key: `0-${index}-${item.code}`,
            };
        });
        setTreeData(dataTree);
    }, []);
    const Split = (arr) => {
        let box = [];
        const Reg = new RegExp(/\d\-\d\-\d*$/);
        arr.forEach((element) => {
            if (Reg.test(element)) {
                const resual = element.split('-');
                box.push(Number(resual[2]));
            }
        });
        return dataPermission.filter((item) => box.includes(item.code));
    };
    const onChage = (event) => {
        const resual = hanldInput(event);
        form.setFieldsValue({
            namePermission: resual,
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
                    <Input onChange={(e) => onChage(e)} placeholder="Name Role" />
                </Form.Item>
                <Form.Item label="Lựa Chọn Chức Năng :" name="name" className="aaa">
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
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit" disabled={status}>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreatePermission;
