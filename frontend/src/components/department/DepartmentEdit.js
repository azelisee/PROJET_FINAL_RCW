import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateDepartment, getDepartmentById } from '../../services/api';

const DepartmentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        getDepartmentById(id).then(data => setDepartment(data));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDepartment(id, department).then(() => {
            navigate(`/departments/${id}`);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Department</h2>
            <input type="text" name="name" value={department.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="description" value={department.description} onChange={handleChange} placeholder="Description" required />
            <button type="submit">Save</button>
        </form>
    );
};

export default DepartmentEdit;
