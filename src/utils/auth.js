import jwtDecode from 'jwt-decode';
export const JwtDecode = ()=>{
    if (localStorage.getItem('accessToken')) {
        return jwtDecode(localStorage.getItem('accessToken'));
    }
}