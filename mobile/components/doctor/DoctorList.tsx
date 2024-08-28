import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getDoctors, deleteDoctor } from '../../services/api';
import '../../css/PatientList.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess(['Administrator', 'Technician','Caregiver','Other','Doctor', 'Nurse']);

    useEffect(() => {
        if (!verifyAccess()) {
            navigate('/unauthorized');
        } else {
            fetchDoctors();
        }
    }, [verifyAccess, navigate]);

    const fetchDoctors = () => {
        getDoctors().then((response) => {
            if (response.data) {
                setDoctors(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the doctors!', error);
        });
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
        if (confirmDelete) {
            if (id) {
                deleteDoctor(id)
                    .then(response => {
                        setMessage('Doctor deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        fetchDoctors();
                        navigate('/doctors');
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting doctor');
                    });
            } else {
                console.error('ID is undefined');
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Doctors</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button type="button" className="add-patient-button">
                        <Link to="/doctors/new">Add Doctor</Link>
                    </button>
                </center>
                {doctors.length > 0 ? (
                    <div className="patient-cards">
                        {doctors.map((doctor) => (
                            <div key={doctor._id} className="patient-card">
                                <Link to={`/doctors/${doctor._id}`}>
                                    <p>{doctor.name}</p>
                                    <p>Specialty: {doctor.speciality}</p>
                                </Link>
                                <button onClick={() => handleDelete(doctor._id)} type="button">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No doctors found</p>
                )}
            </div>
        </center>
    );
};

export default DoctorList;
