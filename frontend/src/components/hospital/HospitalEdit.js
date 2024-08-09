import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateHospital, getHospitalById } from '../../services/api';

const DepartmentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hospital, setHospital] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        getHospitalById(id).then(data => setHospital(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHospital({ ...hospital, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHospital(id, hospital).then(() => {
            navigate(`/hospitals/${id}`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Hospital</h2>
            <input type="text" name="name" value={hospital.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="description" value={hospital.description} onChange={handleChange} placeholder="Description" required />
            <button type="submit">Save</button>
        </form>
    );
};

export default DepartmentEdit;
