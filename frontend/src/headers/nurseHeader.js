import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const nurseHeader = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav>
            <ul>
                <li><span>Home</span></li>
                <li><span>All Nurses</span></li>
                <li><span>Record Nurse</span></li>
                {user ? (
                    <>
                        <li>{user.name}</li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><button><Link to="/login">Login</Link></button></li>
                        <li><button><Link to="/register">Record a new nurse</Link></button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default nurseHeader;
