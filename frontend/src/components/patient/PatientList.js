import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPatients, deletePatient } from '../../services/api';
import '../../css/PatientList.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess(['Administrator','Technician','Caregiver','Other','Doctor', 'Nurse']);

    useEffect(() => {
        if (verifyAccess()) {
            fetchPatients();
        }
    }, [verifyAccess]);

    const fetchPatients = () => {
        getPatients().then((response) => {
            if (response.data) {
                setPatients(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the patients!', error);
        });
    };

    const handleAddPatientClick = (e) => {
        e.preventDefault();
        if (verifyAccess()) {
            navigate('/patients/new');
        }
    };

    const handlePatientDetailClick = (e, id) => {
        e.preventDefault();
        if (verifyAccess()) {
            navigate(`/patients/${id}`);
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
        if (confirmDelete) {
            if (id) {
                deletePatient(id)
                    .then(response => {
                        setMessage('Patient deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000); // Message disappears after 3 seconds
                        fetchPatients(); // Re-fetch patients after deletion
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting patient');
                    });
            } else {
                console.error('ID is undefined');
            }
        }
    };

    return (
        <center>
            <div className="patient-list-container">
                <h1>Patients</h1>
                {message && <p className="message">{message}</p>}
                <center>
                    <button
                        type="button"
                        className="add-patient-button"
                        onClick={handleAddPatientClick}
                    >
                        Add Patient
                    </button>
                </center>
                {patients.length > 0 ? (
                    <div className="patient-cards">
                        {patients.map((patient) => (
                            <div key={patient._id} className="patient-card">
                                <Link
                                    to="#"
                                    onClick={(e) => handlePatientDetailClick(e, patient._id)}
                                >
                                    <p>{patient.name}</p>
                                    <p>Age: {patient.age} years old</p>
                                    <p>Sex: {patient.gender}</p>
                                </Link>
                                <button onClick={() => handleDelete(patient._id)} type="button">
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No patients found</p>
                )}
            </div>
        </center>
    );
};

export default PatientList;
