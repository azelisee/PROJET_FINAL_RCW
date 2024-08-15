import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDepartment } from '../../services/api';
import '../../css/PatientForm.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const DepartmentForm = () => {
    const [department, setDepartment] = useState({
        depNumber: '',
        name: '',
        description: '',
        hospital: ''
    });

    const [message, setMessage] = useState({ type: '', content: '' });
    const navigate = useNavigate();

    const verifyAccess = useVerifyAccess(['Administrator', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        }
    }, [navigate, verifyAccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createDepartment(department)
            .then(response => {
                setMessage({ type: 'success', content: 'Department created successfully!' });
                navigate('/departments');
            })
            .catch(error => {
                setMessage({ type: 'error', content: 'Error creating department.' });
                console.error('Error creating department:', error);
            });
    };

    return (
        <center>
            <div className="form-container">
                <h2>Add Department</h2>
                {message.content && (
                    <div className={`message ${message.type}`}>
                        {message.content}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="number"
                            name="depNumber"
                            placeholder="Department Number"
                            value={department.depNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Department Name"
                            value={department.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={department.description}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="hospital"
                            placeholder="Hospital ID"
                            value={department.hospital}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-green">Add Department</button>
                </form>
            </div>
        </center>
    );
};

export default DepartmentForm;
