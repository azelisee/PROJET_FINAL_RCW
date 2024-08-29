import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDepartments, deleteDepartment } from '../../services/api';
import '../../css/PatientList.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const verifyAccess = useVerifyAccess(['Administrator','Technician','Caregiver','Other', 'Doctor','Nurse','Patient']);
    const role = localStorage.getItem('role');

    useEffect(() => {
        getDepartments().then((response) => {
            if (response.data) {
                setDepartments(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the departments!', error);
        });
    }, []);

    const handleAddDepartmentClick = (e) => {
        e.preventDefault();
        if (role === 'Doctor' || role === 'Administrator') {
            navigate('/departments/new');
        }else{
            navigate('/unauthorized');
        }
    };

    const handleDepartmentDetailClick = (e, id) => {
        e.preventDefault();
        if (role === 'Doctor' || role === 'Administrator' || role === 'Nurse' || role === 'Technician' || role === 'Caregiver' || role === 'Other' || role === 'Patient') {
            navigate(`/departments/${id}`);
        }else{
            navigate('/unauthorized');
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (confirmDelete) {
            if (id && (role === 'Doctor' || role === 'Administrator')) {
                deleteDepartment(id)
                    .then(response => {
                        setMessage('Department deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        getDepartments();
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting department');
                    });
            } else {
                console.error('ID is undefined : ',id, ' or incorrect role : ',role);
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Departments</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button" onClick={handleAddDepartmentClick}>
                        Add Department
                    </button>
                </center>
                {departments.length > 0 ? (
                    <div className="patient-cards">
                        {departments.map((department) => (
                            <div key={department._id} className="patient-card">
                                <Link to="#" onClick={(e) => handleDepartmentDetailClick(e, department._id)}>
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
