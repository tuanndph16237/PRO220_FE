import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 5000,
});

instance.interceptors.request.use(
    async (config) => {
        let decodeToken = ''
        if (localStorage.getItem('accessToken')) {
            decodeToken =jwt_decode(localStorage.getItem('accessToken'));
        }
        // const decodeToken =jwt_decode(localStorage.getItem('accessToken'));
        // console.log(import.meta.env.VITE_BASE_URL);
        if (decodeToken.exp < new Date().getTime()/1000) {
            const refreshTokens = await axios.post(`http://localhost:8080/api/refrehToken`, { withCredentials: true })
        }
        // if (localStorage.getItem('accessToken')) {
        //     const user = useSelector((state) => state.user.currentUser);
        //     const decodeToken = jwt_decode(user?.accessToken);
        //     console.log(decodeToken)
        //     console.log(decodeToken.exp<(new Date().getTime()/1000));
        //     // const date = new Date()
        //     // decodeToken.exp<(new Date().getTime()/1000
        //     // if (decodeToken.exp < new Date().getTime()/1000) {
        //     //     const refreshTokens = await refreshToken();
        //     //     // config.headers['token'] = refreshToken.accessToken;
        //     // }
        // }
        return config;
    },
     (error)=> {
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
