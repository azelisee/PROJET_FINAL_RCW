import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPatients, deletePatient } from '../../services/api';
import '../css/PatientForm.css';
import '../css/PatientList.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    useEffect(() => {
        getPatients().then((response) => {
            if (response.data.patients) {
                setPatients(response.data.patients);
            } else {
                console.error('Expected an array but got:', response.data);
            }
        }).catch(error => {
            console.error('There was an error fetching the patients!', error);
        });
    }, []);

    const handleDelete = (id1, id2) => {
        console.log('IDs to delete:', id1, id2);
        if (id1 && id2) {
            deletePatient(id1, id2)
                .then(response => console.log('Deleted successfully'))
                .catch(error => console.error('Error deleting:', error));
        } else {
            console.error('One or both IDs are undefined');
        }
    }

    return (
        <center>
            <div className="patient-list-container">
            <h2>Display all our Patients</h2>
            <center>
                <button type="button">
                    <Link to="/patients/new">Add Patient</Link>
                </button>
            </center>
            {patients.length > 0 ? (
                <ul>
                    {patients.map((patient) => (
                        <li key={patient.id1}>
                            <Link to={`/patients/${patient.id1}`}>{patient.name}</Link>
                            <button onClick={() => handleDelete(patient.id1, patient.id2)} type="button">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No patients found</p>
            )}
        </div>
        </center>
    );
};

export default PatientList;
