import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../css/AuthContext.css';

const AuthContext = () => {
    const [role, setRole] = useState('Technician');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            let endpoint;
            if (role === 'Doctor') {
                endpoint = 'doctor';
            } else if (role === 'Nurse') {
                endpoint = 'nurse';
            } else {
                endpoint = 'staff';
            }

            const response = await axios.post(`http://localhost:7000/auth/login/${endpoint}`, {
                role: endpoint === 'staff' ? role : undefined,
                title: endpoint !== 'staff' ? role : undefined,
                email,
                password
            });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role || response.data.title);
                navigate('/');
            }
            console.log('role : ',role);
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
                    <label htmlFor="role">Role or Title:</label>
                    <select id="role" value={role} onChange={handleRoleChange}>
                        <option value="Technician">Technician</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Caregiver">Caregiver</option>
                        <option value="Other">Other</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
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
                <center><button type="submit" className="btn">Login</button></center>
            </form>
        </div>
    );
};

export default AuthContext;
