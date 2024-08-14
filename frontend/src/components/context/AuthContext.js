import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/AuthContext.css';

const AuthContext = () => {
    const [role, setRole] = useState('Doctor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const endpoint = role.toLowerCase();
            const response = await axios.post(`http://localhost:7000/auth/login/${endpoint}`, {
                role,
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="role">Role:</label>
                    <select id="role" value={role} onChange={handleRoleChange}>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Staff">Staff</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
};

export default AuthContext;





