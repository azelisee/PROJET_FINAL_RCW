import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPatients, deletePatient } from '../../services/api';
import '../../css/PatientList.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [message, setMessage] = useState('');

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

    useEffect(() => {
        fetchPatients();
    }, []);

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
                    <button type="button" className="add-patient-button">
                        <Link to="/patients/new">Add Patient</Link>
                    </button>
                </center>
                {patients.length > 0 ? (
                    <div className="patient-cards">
                        {patients.map((patient) => (
                            <div key={patient._id} className="patient-card">
                                <Link to={`/patients/${patient._id}`}>
                                    <p>{patient.name}</p>
                                    <p>Age : {patient.age} years old</p>
                                    <p>Sex : {patient.gender}</p>
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
