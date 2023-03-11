import axios from 'axios';
import { ROLE } from '../constants/auth';
import { NOTIFICATION_TYPE } from '../constants/status';
import { JwtDecode } from '../utils/auth';
import { Notification } from '../utils/notifications';

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
        const {response} = error
        Notification(NOTIFICATION_TYPE.ERROR,'Try cập không hợp lệ',response.data.message)
        return Promise.reject(error);
    },
);
export default instance;
