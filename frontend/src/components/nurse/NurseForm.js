import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNurse } from '../../services/api';
const NurseForm = () => {
    const [nurse, setNurse] = useState({ name: '', department: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNurse({ ...nurse, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createNurse(nurse).then(() => {
            navigate('/nurses');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Nurse</h2>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={nurse.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Department</label>
                <input type="text" name="department" value={nurse.department} onChange={handleChange} required />
            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default NurseForm;
