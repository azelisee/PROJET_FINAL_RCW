import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

export const useVerifyAccess = (allowedRoles) => {
    allowedRoles = ['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse','Patient'];
    const navigate = useNavigate();

    return () => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error("No token found, redirecting to login.");
            navigate('/login');
            return false;
        } else {
            try {
                const decodedToken = jwtDecode(token);
                const role = decodedToken.role || decodedToken.title;
                if (allowedRoles && allowedRoles.includes(role)) {
                    console.log("allowedRoles:", allowedRoles);
                    return true;
                } else {
                    console.error("Access denied for role:", role);
                    console.log("allowedRoles:", allowedRoles);
                    navigate('/unauthorized');
                    return false;
                }
            } catch (error) {
                console.error("Token decoding failed:", error);
                console.log("allowedRoles:", allowedRoles);
                navigate('/login');
                return false;
            }
        }
    };
};

export default useVerifyAccess;
