import axios from 'axios';
import { ROLE } from '../constants/auth';
import { JwtDecode } from '../utils/auth';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 10000,
});

instance.interceptors.request.use(
    async (config) => {
        const userDecode = JwtDecode();
        if (!userDecode || !userDecode.role || userDecode.role == ROLE.ADMIN) return config;
        config.params = { ...config.params, showroomId: userDecode.showroomId };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

instance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    },
);
export default instance;
