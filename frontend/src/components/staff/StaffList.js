import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getStaff, deleteStaff } from '../../services/api';
import '../../css/PatientList.css';

const StaffList = () => {
    const [staffs, setStaffs] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const fetchStaff = () => {
        getStaff().then((response) => {
            if (response.data) {
                setStaffs(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the staff!', error);
        });
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this staff member?");
        if (confirmDelete) {
            if (id) {
                deleteStaff(id)
                    .then(response => {
                        setMessage('Staff member deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        fetchStaff();
                        navigate('/staffs');
;                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting staff member');
                    });
            } else {
                console.error('ID is undefined');
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Staff Members</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button">
                        <Link to="/staff/new">Add Staff</Link>
                    </button>
                </center>
                {staffs.length > 0 ? (
                    <div className="patient-cards">
                        {staffs.map((staff) => (
                            <div key={staff._id} className="patient-card">
                                <Link to={`/staff/${staff._id}`}>
                                    <p>{staff.name}</p>
                                    <p>Role: {staff.role}</p>
                                </Link>
                                <button onClick={() => handleDelete(staff._id)} type="button">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No staff members found</p>
                )}
            </div>
        </center>
    );
};

export default StaffList;
