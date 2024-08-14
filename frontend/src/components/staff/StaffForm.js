import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStaff } from '../../services/api';
import '../../css/PatientForm.css';

const StaffForm = () => {
    const [staff, setStaff] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        department: '',
        hospital: '',
        dateOfBirth: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setStaff({
            ...staff,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createStaff(staff).then(() => {
            navigate('/staff');
        }).catch(error => {
            console.error('There was an error creating the staff member!', error);
        });
    };

    return (
        <center>
            <div className="form-container">
            <h2>Add New Staff</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={staff.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={staff.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={staff.password} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Phone" value={staff.phone} onChange={handleChange} required />
                <select name="role" value={staff.role} onChange={handleChange} required>
                    <option value="Technician">Technician</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Caregiver">Caregiver</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" name="department" placeholder="Department ID" value={staff.department} onChange={handleChange} required />
                <input type="text" name="hospital" placeholder="Hospital ID" value={staff.hospital} onChange={handleChange} required />
                <input type="date" name="dateOfBirth" value={staff.dateOfBirth} onChange={handleChange} required />

                <button type="submit">Create Staff</button>
            </form>
        </div>
        </center>
    );
};

export default StaffForm;
