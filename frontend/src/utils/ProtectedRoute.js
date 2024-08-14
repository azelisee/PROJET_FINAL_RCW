import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles }) => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    const userTitle = localStorage.getItem('title');
    if (!token) {
        return <Navigate to="/login" />;
    }
    if (roles && !(roles.includes(userRole) || roles.includes(userTitle))) {
        return <Navigate to="/unauthorized" />;
    }
    return children;
};
export default ProtectedRoute;


