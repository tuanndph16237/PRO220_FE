import instance from './instance';

export const login = async (data) => {
    return instance.post('/login', data);
};
export const register = (data) => {
    return instance.post('/register', data);

};

};

