import instance from './instance';

export const register = (data) => {
    return instance.post('/register', data);
};
