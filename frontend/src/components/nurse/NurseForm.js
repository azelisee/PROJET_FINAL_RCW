import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNurse } from '../../services/api';
import '../../css/PatientForm.css';

const NurseForm = () => {
    const navigate = useNavigate();
    const [nurse, setNurse] = useState({
        name: '',
        title: '',
        email: '',
        password: '',
        gender: '',
        phone: '',
        department: '',
        hospital: '',
        dateOfBirth: '',
        qualifications: '',
        seniority: '',
        schedule: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNurse({ ...nurse, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createNurse(nurse).then(() => {
            navigate('/nurses');
        }).catch(error => console.error('Error creating nurse:', error));
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
            <h2>Add Nurse</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <input type="text" name="gender" placeholder="Gender" onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            <input type="text" name="department" placeholder="Department ID" onChange={handleChange} required />
            <input type="text" name="hospital" placeholder="Hospital ID" onChange={handleChange} required />
            <input type="date" name="dateOfBirth" placeholder="Date of Birth" onChange={handleChange} required />
            <input type="text" name="qualifications" placeholder="Qualifications" onChange={handleChange} required />
            <input type="number" name="seniority" placeholder="Seniority (years)" onChange={handleChange} required />
            <button type="submit" style={{width:'175px'}}>Add Nurse</button>
        </form>
        </center>
    );
};

export default NurseForm;
