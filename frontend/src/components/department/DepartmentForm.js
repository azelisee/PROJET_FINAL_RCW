import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDepartment } from '../../services/api';
const DepartmentForm = () => {
    const [department, setDepartment] = useState({ name: '', description: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createDepartment(department).then(() => {
            navigate('/departments');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Department</h2>
            <input type="text" name="name" value={department.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="description" value={department.description} onChange={handleChange} placeholder="Description" required />
            <button type="submit">Save</button>
        </form>
    );
};

export default DepartmentForm;
