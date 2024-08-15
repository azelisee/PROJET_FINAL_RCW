import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

const verifyAccess = (allowedRoles) => {
    const navigate = useNavigate();

    return () => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return false;
        } else {
            try {
                const decodedToken = jwtDecode(token);
                const role = decodedToken.role || decodedToken.title;
                console.log('Show decoded token : ', decodedToken);

                if (allowedRoles.includes(role)) {
                    return true;
                } else {
                    navigate('/unauthorized');
                    return false;
                }
            } catch (error) {
                console.error('Token decoding failed:', error);
                navigate('/login');
                return false;
            }
        }
    };
};

export default verifyAccess;
