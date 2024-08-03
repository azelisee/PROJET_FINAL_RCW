import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDoctor } from '../../services/api';

const DoctorForm = () => {
    const [doctor, setDoctor] = useState({ name: '', specialty: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createDoctor(doctor).then(() => {
            navigate('/doctors');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Doctor</h2>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Specialty</label>
                <input type="text" name="specialty" value={doctor.specialty} onChange={handleChange} required />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default DoctorForm;
