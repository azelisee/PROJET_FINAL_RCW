import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoctorById, updateDoctor } from '../../services/api';

const DoctorEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({ name: '', specialty: '' });

    useEffect(() => {
        getDoctorById(id).then(data => setDoctor(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDoctor({ ...doctor, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDoctor(id, doctor).then(() => {
            navigate(`/doctors/${id}`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Doctor</h2>
            <input type="text" name="name" value={doctor.name} onChange={handleChange} required />
            <input type="text" name="specialty" value={doctor.specialty} onChange={handleChange} required />
            <button type="submit">Save</button>
        </form>
    );
};

export default DoctorEdit;
