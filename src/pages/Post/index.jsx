import React, { useState, useEffect } from 'react';
import { Button, Col, Row } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { getPosts } from '../../api/post';
import { HOUR_DATE_TIME } from '../../constants/format';
import './post.css';
import SpinCustomize from '../../components/Customs/Spin';
const style = {
    padding: '8px 0',
};
const Posts = () => {
    useDocumentTitle('Tin Tức');
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await handleGetPosts({ page });
        })();
    }, []);

    function getUniqueListBy (arr, key) {
        return [...new Map(arr.map((item) => [item[key], item])).values()];
    }
    const handleGetPosts = (filter) => {
        getPosts({ limit: 12, ...filter })
            .then(({ data: res }) => {
                if (page && res.length === 0) {
                    setDisabled(true);
                    return;
                }
                const mergePost = [...posts, ...res];
                const uniqueById = getUniqueListBy(mergePost, '_id');
                setPosts(uniqueById);
            })
            .catch((err) => {
                return;
            })
            .finally(() => {
                setLoading(false);
                setLoadMore(false);
            });
    };
    const handleLoadmore = async () => {
        setLoadMore(true);
        const pageIncrease = page + 1;
        setPage(pageIncrease);
        await handleGetPosts({ page: pageIncrease });
    };

    return (
        <div className="container relative mx-auto py-16">
            {loading ? (
                <div className="absolute top-1/2 left-1/2">
                    <SpinCustomize />
                </div>
            ) : (
                <Row
                    gutter={{
                        xs: 12,
                        sm: 18,
                        md: 24,
                        lg: 32,
                    }}
                    justify="space-evenly"
                    wrap={true}
                >
                    {posts.map((post) => {
                        return (
                            <Col key={post._id} className="gutter-row" span={6}>
                                <div style={style}>
                                    <Link to={`/tin-tuc/${post.title}`}>
                                        <img src={post.image} alt={post.title} />
                                    </Link>
                                    <Link to={`/tin-tuc/${post.title}`} className="entry-title">
                                        <h2 className="post-title">{post.title}</h2>
                                    </Link>
                                    <div className="entry-content">
                                        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                                    </div>
                                    <p className="post-date">{dayjs(post.createdAt).format(HOUR_DATE_TIME)}</p>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            )}
            {posts.length > 0 && (
                <Button
                    htmlType="submit"
                    onClick={handleLoadmore}
                    disabled={disabled}
                    loading={loadMore}
                    className="btn-primary text-white bg-[#02b875] my-4 block mx-auto hover:!bg-[#09915f] h-10 hover:!text-white hover:out
                        font-medium rounded-lg text-sm text-center"
                >
                    Xem thêm
                </Button>
            )}
        </div>
    );
};

export default Posts;
