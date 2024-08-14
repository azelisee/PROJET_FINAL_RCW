import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStaff, deleteStaff } from '../../services/api';
import '../../css/PatientList.css';
import'../../css/PatientForm.css';

const StaffList = () => {
    const [staffs, setStaff] = useState([]);

    useEffect(() => {
        getStaff().then((response) => {
            if (Array.isArray(response.data)) {
                setStaff(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the staff!', error);
        });
    }, []);

    const handleDelete = (id) => {
        deleteStaff(id)
            .then(() => {
                setStaff(staffs.filter(staff => staff._id !== id));
                console.log('Deleted successfully');
            })
            .catch(error => console.error('Error deleting:', error));
    };

    return (
        <center>
            <div className="patient-list-container">
                <center>
                    <h2>Staff List</h2>
                    <button type="button">
                        <Link to="/staff/new">Add Staff</Link>
                    </button>
                </center>
                {staffs.length > 0 ? (
                    <ul>
                        {staffs.map((staff) => (
                            <li key={staff._id}>
                                <Link to={`/staff/${staff._id}`}>{staff.name}</Link>
                                <button onClick={() => handleDelete(staff._id)} type="button">Delete</button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No staff members found</p>
                )}
            </div>
        </center>
    );
};

export default StaffList;
