import { useNavigate } from 'react-router-dom';
import { Token } from '../../constants/auth';

const PrivateRouter = ({ children }) => {
    const navigate = useNavigate();
    if (localStorage.getItem(Token.accessToken)) {
        navigate('/');
    }
    return children;
};

export default PrivateRouter;
