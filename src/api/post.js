import _ from 'lodash';
import instance from './instance';

export const getPosts = async (filter) => {
    return instance.post('/posts', filter);
};

export const createPost = async (data) => {
    return instance.post('/post', data);
};

export const removePost = async (id) => {
    return instance.delete(`/post/${id}`);
};

export const updatePost = async (data) => {
    return instance.patch(`/post/${data._id}`, _.omit(data, ['_id']));
};

export const getPostById = async (id) => {
    return instance.get(`/post/${id}`);
};

export const getPostByTitle = async (title) => {
    return instance.post(`/post-by-title`, { title });
};
