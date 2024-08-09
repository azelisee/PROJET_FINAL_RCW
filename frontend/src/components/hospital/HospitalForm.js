import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHospital } from '../../services/api';
const HospitalForm = () => {
    const [hospital, setHospital] = useState({ name: '', description: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createHospital(hospital).then(() => {
            navigate('/hospitals');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Hospital</h2>
            <input type="text" name="name" value={hospital.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="description" value={hospital.description} onChange={handleChange} placeholder="Description" required />
            <button type="submit">Save</button>
        </form>
    );
};

export default HospitalForm;
