import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDepartmentById, updateDepartment } from '../../services/api';
import '../../css/PatientForm.css';

const DepartmentEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [department, setDepartment] = useState({
        depNumber: '',
        name: '',
        description: '',
        hospital: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        getDepartmentById(id).then((response) => {
            setDepartment(response.data);
        }).catch(error => {
            setError('There was an error fetching the department details!');
            console.error('There was an error fetching the department details!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateDepartment(id, department).then(() => {
            navigate(`/departments/${id}`);
        }).catch(error => {
            setError('There was an error updating the department!');
            console.error('There was an error updating the department!', error);
        });
    };

    return (
        <center>
            <form onSubmit={handleSubmit} className="form-container">
                <h2>Edit Department</h2>
                {error && <p>{error}</p>}
                <div className="form-group">
                    <input type="number" name="depNumber" value={department.depNumber} onChange={handleChange} placeholder="Department Number" required />
                    <input type="text" name="name" value={department.name} onChange={handleChange} placeholder="Department Name" required />
                </div>
                <div className="form-group">
                    <textarea name="description" value={department.description} onChange={handleChange} placeholder="Description"></textarea>
                </div>
                <div className="form-group">
                    <input type="text" name="hospital" value={department.hospital} onChange={handleChange} placeholder="Hospital ID" required />
                </div>
                <br/>
                <center><button type="submit" style={{width:'175px'}} className="btn-green">Submit</button></center>
            </form>
        </center>
    );
};

export default DepartmentEdit;
