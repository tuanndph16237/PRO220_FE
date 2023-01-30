import { Navigate } from 'react-router-dom';
import { JwtDecode } from '../../utils/auth';

const PrivateRouter = ({ children }) => {
    if (JwtDecode()) return <Navigate to="/" />;
    return children;
};

export default PrivateRouter;
