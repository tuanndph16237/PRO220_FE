import { DeleteOutlined, EditOutlined, EyeOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row, Space, Table, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getPosts } from '../../../api/post';
import SpinCustomize from '../../../components/Customs/Spin';
import Filter from '../../../components/Filter/Filter';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import CreatePost from './CreatePost';
import UpdatePost from './UpdatePost';
const PostManager = () => {
    useDocumentTitle('Quản lý tin tức');
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [idUpdate, setIdUpdate] = useState();
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: 'Tiêu đề tin tức',
            dataIndex: 'title',
        },
        {
            title: 'Ảnh',
            dataIndex: 'image',
            render: (url) => {
                return <img width={300} src={url} alt="" />;
            },
        },
        {
            title: '',
            render: (data) => {
                return (
                    <Row>
                        <EyeOutlined className="text-xl pr-4" />
                        <EditOutlined className="text-xl pr-4" onClick={() => setIdUpdate(data._id)} />
                        <Popconfirm
                            title={`Bạn chắc chắn muốn xóa ${data.name} không?`}
                            onConfirm={() => {
                                handleRemoveAccount([data._id]);
                            }}
                            okText="Đồng ý"
                            cancelText="Hủy"
                        >
                            <DeleteOutlined className="text-xl" />
                        </Popconfirm>
                    </Row>
                );
            },
        },
    ];
    useEffect(() => {
        (async () => {
            await getAllPost();
        })();
    }, []);
    console.log('data', data);

    const handleRemoveAccount = (id) => {};

    const getAllPost = (filter) => {
        setLoading(true);
        getPosts(filter)
            .then(({ data: res }) => {
                const newData = res.map((item) => ({ key: item._id, ...item }));
                setData(newData);
            })
            .catch((err) => {
                console.log('get posts err', err);
            })
            .finally(() => setLoading(false));
    };

    const handleRefetch = async () => {
        await getAllPost();
        setOpen(false);
    };
    const handleFilter = async (filter) => {
        await getAllPost(filter);
    };
    const handleRefetchUpdateAccount = async (res) => {
        const newData = data.map((item) => {
            if (item._id === res._id) return res;
            return item;
        });
        setData(newData);
        setIdUpdate(null);
    };
    return (
        <div>
            <div className="flex justify-between align-center pb-4">
                <div>
                    <button className="pr-6" onClick={() => handleFilter()}>
                        <Tooltip title="Làm mới đơn hàng">
                            <SyncOutlined style={{ fontSize: '18px', color: '#000' }} />
                        </Tooltip>
                    </button>
                    <Filter
                        items={[
                            {
                                label: <Space align="center">Tiêu đề tin tức</Space>,
                                key: 'title',
                                name: 'Tiêu đề tin tức',
                            },
                        ]}
                        onFilter={handleFilter}
                    />
                </div>
                <Button onClick={() => setOpen(true)} className="btn-primary text-white" type="primary">
                    Thêm tin tức
                </Button>
            </div>
            {loading ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <Table columns={columns} dataSource={data} />
            )}

            {open && <CreatePost open={open} onClose={setOpen} onRefetch={handleRefetch} />}
            {idUpdate && (
                <UpdatePost idUpdate={idUpdate} onClose={setIdUpdate} onRefetch={handleRefetchUpdateAccount} />
            )}
        </div>
    );
};

export default PostManager;
