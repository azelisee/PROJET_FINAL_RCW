import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDepartments, deleteDepartment } from '../../services/api';
import '../../css/PatientList.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const verifyAccess = useVerifyAccess(['Administrator','Technician','Caregiver','Other', 'Doctor']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        } else {
            fetchDepartments();
        }
    }, [navigate, verifyAccess]);

    const fetchDepartments = () => {
        getDepartments().then((response) => {
            if (response.data) {
                setDepartments(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the departments!', error);
        });
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (confirmDelete) {
            if (id) {
                deleteDepartment(id)
                    .then(response => {
                        setMessage('Department deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        fetchDepartments();
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting department');
                    });
            } else {
                console.error('ID is undefined');
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Departments</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button">
                        <Link to="/departments/new">Add Department</Link>
                    </button>
                </center>
                {departments.length > 0 ? (
                    <div className="patient-cards">
                        {departments.map((department) => (
                            <div key={department._id} className="patient-card">
                                <Link to={`/departments/${department._id}`}>
                                    <p>{department.name}</p>
                                    <p>Description: {department.description}</p>
                                </Link>
                                <button onClick={() => handleDelete(department._id)} type="button">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No departments found</p>
                )}
            </div>
        </center>
    );
};

export default DepartmentList;
