import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';
import { loginPatient, loginDoctor, loginNurse, loginStaff } from '../services/api';

const Login = () => {
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
            let response;
            if (role === 'Doctor') {
                response = await loginDoctor(email, password);
            } else if (role === 'Nurse') {
                response = await loginNurse(email, password);
            } else if (role === 'Patient') {
                response = await loginPatient(email, password);
            } else {
                response = await loginStaff(role, email, password);
            }

            if (response.data) {
                localStorage.setItem('token', response.data);
                localStorage.setItem('role', role);
                navigate('/home');
                console.log('Token:', response.data, ' ; role or title:', role);
            } else {
                console.error('Invalid response data:', response);
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
                    <label htmlFor="role">Role or Title:</label>
                    <select id="role" value={role} onChange={handleRoleChange}>
                        <option value="Technician">Technician</option>
                        <option value="Administrator">Administrator</option>
                        <option value="Caregiver">Caregiver</option>
                        <option value="Other">Other</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Patient">Patient</option>
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

export default Login;
