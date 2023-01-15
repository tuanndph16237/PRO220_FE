import { Form, Input, InputNumber, Popconfirm, Table, Typography, Space, Button, Tooltip } from 'antd';
import { JwtDecode } from '../../../utils/auth';
import { SearchOutlined} from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { getWarehouseByShowroomId } from '../../../api/warehouse';
import ListShowroom from './ListShowrom';
import { getShowrooms } from '../../../api/showroom';

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
                            message: `Please Input ${title}!`,
                        },
                        {
                            pattern: /^[\d]{0,9}$/,
                            message: "Value should be grater than 0",
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
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [totals,setTotals] = useState(0)
    const {showroomId} = JwtDecode()
    const [idShowroom,setIdShowroom] = useState(showroomId || null)
    const [listShowroom,setListShowroom] = useState([])
    let searchInput = useRef(null);
    console.log(idShowroom);
    
   
    const isEditing = (record) => record.key === editingKey;

    const fetchApiWarehouse = async (idShowroom) => {
        try {
            const dataWarehouse = await getWarehouseByShowroomId(idShowroom)
            const data = dataWarehouse.data.handleData.map((item)=>{
                return {
                    key: item.materialId._id,
                    name: item.materialId.name,
                    quantity: item.quantity,
                }
            })
            setData(data)
            setTotals(dataWarehouse.data.totals)
        } catch (error) {
            
        }
    }

    const fetchApiShowroom = async()=>{
         try {
            const dataShowrooms = await getShowrooms()
            const handleDataShowroom = dataShowrooms.data.map((showroom)=>({value:showroom._id,label:showroom.name}))
            setListShowroom(handleDataShowroom)
        } catch (error) {
            
        }
    }

    const handleSearch = (
      selectedKeys,
      confirm,
      dataIndex,
    ) => {
      confirm()
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
              onClick={()=>{
                clearFilters()
                handleSearch(selectedKeys, confirm, dataIndex)
            }}
       
            >
              close
            </Button>
          </Space>
        </div>
      ),

      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),

      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value).toLowerCase()),

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
            key:'name',
            title: 'Tên linh kiện',
            dataIndex: 'name',
            width: '50%',
            editable: false,
            ellipsis: {
                showTitle: false,
              },
            ...getColumnSearchProps('name'),
            render: (name) => (
              <Tooltip placement="topLeft" title={name}>
                {name}
              </Tooltip>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',  
            width: '15%',
            editable: true,
        },
        {
            title: 'operation',
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
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
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
                    showroomId,
                    materials:[
                        {
                            materialId:item.key,
                            ...row
                        }
                    ]
                }
   
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
            console.log('Validate Failed:', errInfo);
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
                min:0
            }),
        };
    });

     if(idShowroom){
        useEffect(()=>{
            fetchApiWarehouse(idShowroom)
        },[idShowroom])
    }

    if(!idShowroom){
        useEffect(()=>{
            fetchApiShowroom()
        },[])
    }


    return (
        <>
            <div className='my-3 grid grid-cols-2'>
                <div>
                    <ListShowroom options={listShowroom} setIdShowroom={setIdShowroom}/>
                </div>
                <div className='flex justify-end pr-4'>
                    <p className='text-[18px]'>Tổng số linh kiện: <span className='font-bold'>{totals}</span></p>
                </div>
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
        </>
    );
};

export default Warehouse;