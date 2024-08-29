import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getPatients, deletePatient } from '../../services/api';
import '../../css/PatientList.css';
import {useVerifyAccess} from '../../utils/DecodeToken';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const verifyAccess = useVerifyAccess(['Administrator','Technician','Caregiver','Other', 'Doctor','Nurse','Patient']);
    const role = localStorage.getItem('role');

    useEffect(() => {
        getPatients().then((response) => {
            if (response.data) {
                setPatients(response.data);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the patients!', error);
        });
    }, []);

    const handleAddPatientClick = (e) => {
        e.preventDefault();
        if (role === 'Doctor'|| role === 'Nurse') {
            navigate('/patients/new');
        }else{
            navigate('/unauthorized');
        }
    };

    const handlePatientDetailClick = (e, id) => {
        e.preventDefault();
        if (role === 'Doctor'|| role === 'Nurse' || role === 'Patient') {
            navigate(`/patients/${id}`);
        }else{
            navigate('/unauthorized');
        }
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
        if (confirmDelete) {
            if (id && role === 'Doctor') {
                deletePatient(id)
                    .then(response => {
                        setMessage('Patient deleted successfully');
                        setTimeout(() => {
                            setMessage('');
                        }, 3000);
                        getPatients();
                        navigate('/patients');
                    })
                    .catch(error => {
                        console.error('Error deleting:', error);
                        setMessage('Error deleting patient');
                    });
            } else {
                console.error('ID is undefined : ',id, ' or incorrect role : ',role);
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
