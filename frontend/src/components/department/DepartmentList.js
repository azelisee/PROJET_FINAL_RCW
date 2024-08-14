import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDepartments, deleteDepartment } from '../../services/api';
import '../../css/PatientForm.css';
import '../../css/PatientList.css';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getDepartments().then((response) => {
            if (response.data.departments) {
                setDepartments(response.data.departments);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the departments!', error);
        });
    }, []);

    const handleDelete = (id) => {
        deleteDepartment(id)
            .then(response => console.log('Deleted successfully'))
            .catch(error => console.error('Error deleting:', error));
    };

    return (
        <center>
            <div className="patient-list-container">
                <center>
                <h2>Department List</h2>
                <button type="button">
                    <Link to="/departments/new">Add Department</Link>
                </button>
                </center>
                {departments.length > 0 ? (
                    <ul>
                        {departments.map((department) => (
                            <li key={department._id}>
                                <Link to={`/departments/${department._id}`}>{department.name}</Link>
                                <button onClick={() => handleDelete(department._id)} type="button">Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No departments found</p>
                )}
            </div>
        </center>
    );
};

export default DepartmentList;
