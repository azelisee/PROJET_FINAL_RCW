import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDepartment } from '../../services/api';
import '../../css/PatientForm.css';

const DepartmentForm = () => {
    const [department, setDepartment] = useState({
        depNumber: '',
        name: '',
        description: '',
        hospital: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createDepartment(department)
            .then(response => {
                console.log('Department created:', response.data);
                navigate('/departments');
            })
            .catch(error => console.error('Error creating department:', error));
    };

    return (
        <center>
            <div className="form-container">
            <h2>Add Department</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="depNumber"
                    placeholder="Department Number"
                    value={department.depNumber}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Department Name"
                    value={department.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={department.description}
                    onChange={handleChange}
                ></textarea>
                <input
                    type="text"
                    name="hospital"
                    placeholder="Hospital ID"
                    value={department.hospital}
                    onChange={handleChange}
                    required
                />
                <button type="submit" style={{width:'175px'}}>Add Department</button>
            </form>
        </div>
        </center>
    );
};

export default DepartmentForm;
