import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children, roles }) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login" />;
    }
    try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role || decodedToken.title;
        if (roles && roles.includes(userRole)) {
            return children;
        } else {
            return <Navigate to="/unauthorized" />;
        }
    } catch (error) {
        console.error("Token decoding failed:", error);
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoute;
