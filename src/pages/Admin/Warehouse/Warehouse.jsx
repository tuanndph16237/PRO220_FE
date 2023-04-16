import {
    Form,
    Input,
    InputNumber,
    Popconfirm,
    Table,
    Typography,
    Space,
    Button,
    Tooltip,
    notification,
    Select,
} from 'antd';
import { JwtDecode } from '../../../utils/auth';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState, useMemo, useReducer } from 'react';
import { exchangePart, getWarehouseByShowroomId, updateQuantityOnePart } from '../../../api/warehouse';
import ListShowroom from './ListShowrom';
import { getShowrooms } from '../../../api/showroom';
import { NOTIFICATION_TYPE } from '../../../constants/status';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import _ from 'lodash';
import PermissionCheck from '../../../components/permission/PermissionCheck';
import { PERMISSION_LABLEL, PERMISSION_TYPE } from '../../../constants/permission';
import Exchange from './Exchange';
import ModalCustomize from '../../../components/Customs/ModalCustomize';
import Filter from '../../../components/Filter/Filter';

const noti = (type, message, description) => {
    notification[type]({
        message,
        description,
    });
};

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `không để trống ${title}!`,
                        },
                        {
                            pattern: /^[\d]{0,9}$/,
                            message: 'số lượng phải lớn hơn 0',
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Warehouse = () => {
    useDocumentTitle('Quản lý kho');
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [keyExchange, setKeyChange] = useState({});
    const [open, setOpenModal] = useState(false);
    const [totals, setTotals] = useState(0);
    const { showroomId } = JwtDecode();
    const [listShowroom, setListShowroom] = useState([]);
    const [options, setOptions] = useState();
    const datas = useRef([]);
    const initialState = {
        idCurrentShowroom: showroomId,
        idShowroomExchange: '',
        max: 0,
        quantityCurrentChange: 0,
        quantityCurrent: 0,
        idPart: '',
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'UPDATE_CURRENT_SHOWROOM':
                return { ...state, idCurrentShowroom: action.payload };
            case 'UPDATE_SHOWROOM_EXCHANGE':
                return { ...state, ...action.payload };
            case 'UPDATE_QUANTITY_CHANGE':
                return { ...state, ...action.payload };
            case 'UPDATE_ID_PART':
                return { ...state, ...action.payload };
            case 'RESET':
                return { ...initialState, idCurrentShowroom: state.idCurrentShowroom };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    let searchInput = useRef(null);

    const isEditing = (record) => record.key === editingKey;

    const fetchApiWarehouse = async () => {
        try {
            const dataWarehouse = await getWarehouseByShowroomId(state.idCurrentShowroom);
            const data = dataWarehouse.data.handleData.map((item) => {
                return {
                    key: item.materialId._id,
                    name: item.materialId.name,
                    quantity: item.quantity,
                };
            });
            setData(data);
            datas.current = data;
            setOptions([
                {
                    value: 'soluong',
                    label: 'sản phẩm đã hết',
                },
            ]);
            setTotals(dataWarehouse.data.totals);
        } catch (res) {
            noti(NOTIFICATION_TYPE.ERROR, `${res.response.data.error}`);
        }
    };

    const fetchApiShowroom = async () => {
        try {
            const dataShowrooms = await getShowrooms();
            const handleDataShowroom = dataShowrooms.data.map((showroom) => ({
                value: showroom._id,
                label: showroom.name,
            }));
            setListShowroom(handleDataShowroom);
        } catch (res) {
            noti(NOTIFICATION_TYPE.ERROR, `${res.response.data.error}`);
        }
    };

    const updateApiPartQuantity = async (obj) => {
        try {
            const dataUpdatePart = await exchangePart(obj);
            await fetchApiWarehouse(state.idCurrentShowroom);
            setKeyChange({});
            dispatch({
                type: 'RESET',
            });
        } catch (res) {
            noti(NOTIFICATION_TYPE.ERROR, `${res.response.data.error}`);
        }
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            clearFilters();
                            handleSearch(selectedKeys, confirm, dataIndex);
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),

        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,

        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),

        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns = [
        {
            key: 'name',
            title: 'Tên linh kiện',
            dataIndex: 'name',
            width: '60%',
            editable: false,
            ellipsis: {
                showTitle: false,
            },
            ...getColumnSearchProps('name'),
            render: (name) => (
                <Tooltip placement="topLeft" title={name}>
                    {name}
                </Tooltip>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            width: '20%',
            editable: true,
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link
                            onClick={() => save(record)}
                            style={{
                                marginRight: 8,
                            }}
                        >
                            Save
                        </Typography.Link>
                        <Popconfirm title="Xác nhận hủy?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <PermissionCheck
                            permissionHas={{ label: PERMISSION_LABLEL.WAREHOUSE_MANAGE, code: PERMISSION_TYPE.UPDATE }}
                        >
                            <div className="flex justify-center items-center gap-x-4">
                                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                                    Edit
                                </Typography.Link>
                                <div
                                    onClick={() => {
                                        setOpenModal(true);
                                        setKeyChange({ id: record.key });
                                        dispatch({
                                            type: 'UPDATE_ID_PART',
                                            payload: { idPart: record.key, quantityCurrent: record.quantity },
                                        });
                                    }}
                                >
                                    <img
                                        src="/images/exchangeswap.png"
                                        alt="logo-exchange"
                                        className="bg-black cursor-pointer rounded-sm p-1 active:bg-slate-300"
                                    />
                                </div>
                            </div>
                        </PermissionCheck>
                        <PermissionCheck
                            permissionHas={{ label: PERMISSION_LABLEL.WAREHOUSE_MANAGE, code: PERMISSION_TYPE.SHOW }}
                        >
                            <Button type="primary">Yêu cầu vật</Button>
                        </PermissionCheck>
                    </>
                );
            },
        },
    ];

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            quantity: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
    };

    const save = async (record) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => record.key === item.key);
            if (index > -1) {
                const item = newData[index];
                const saveDataToDB = {
                    idShowroom: state.idCurrentShowroom,
                    material: {
                        materialId: item.key,
                        ...row,
                    },
                };

                await updateQuantityOnePart(saveDataToDB);

                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            noti(NOTIFICATION_TYPE.ERROR, 'Cập nhật số lượng thất bại!');
        }
    };

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'number',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
                min: 0,
            }),
        };
    });

    const handleExchangePartQuantity = () => {
        setOpenModal(false);
        if (state.idShowroomExchange) {
            updateApiPartQuantity(state);
        }
    };

    useMemo(() => {
        fetchApiShowroom();
    }, []);

    useEffect(() => {
        if (state.idCurrentShowroom !== '' && state.idCurrentShowroom != null) {
            fetchApiWarehouse(state.idCurrentShowroom);
        }
    }, [state.idCurrentShowroom]);

    const handleChange = (value) => {
        if (value == 'sort') {
            for (let i = 0; i < data.length; i++) {
                for (let j = i + 1; j < data.length; j++) {
                    if (data[i].quantity > data[j].quantity) {
                        const temp = data[i];
                        data[i] = data[j];
                        data[j] = temp;
                    }
                }
            }
            setData(data);
        } else {
            const a = data.filter((item) => item.quantity === 0);
            setData(a);
        }
    };
    const handleFilter = (values = {}) => {
        setData(datas.current);
        setOptions([
            {
                value: 'soluong',
                label: 'sản phẩm đã hết',
            },
        ])
    };
    return (
        <>
            <div className="my-3 flex gap-5">
                <div>{!showroomId ? <ListShowroom options={listShowroom} selectShowroom={dispatch} /> : ''}</div>
                {data.length > 0 && (
                    <>
                        <button className="pr-6" onClick={() => handleFilter()}>
                            <Tooltip title="Làm Vật tư">
                                <SyncOutlined style={{ fontSize: '18px', color: '#000' }} />
                            </Tooltip>
                        </button>
                        <Select
                            style={{
                                width: 140,
                            }}
                            onChange={handleChange}
                            options={options}
                            placeholder="Lựa chọn"
                        />
                        <div className="flex justify-end pr-4">
                            <p className="text-[18px]">
                                Số lượng: <span className="font-bold">{data?.length}</span>
                            </p>
                        </div>
                    </>
                )}
            </div>

            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </Form>
            <ModalCustomize
                showModal={open}
                footer={true}
                setShowModal={() => setOpenModal(false)}
                onSubmit={handleExchangePartQuantity}
            >
                <Exchange
                    idShowroom={state.idCurrentShowroom}
                    materialId={keyExchange}
                    getValueShowroom={dispatch}
                    getInputValue={dispatch}
                />
            </ModalCustomize>
        </>
    );
};

export default Warehouse;
